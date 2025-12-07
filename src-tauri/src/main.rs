// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::process::Command;
use std::sync::Mutex;
use tauri::State;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Device {
    pub id: String,
    pub name: String,
    pub status: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScrcpyConfig {
    pub device_id: String,
    pub max_size: u32,
    pub max_fps: u32,
    pub bitrate: String,
    pub video_codec: String,
    pub audio_enabled: bool,
    pub show_touches: bool,
    pub stay_awake: bool,
    pub fullscreen: bool,
    pub borderless: bool,
    pub always_on_top: bool,
    pub turn_screen_off: bool,
    pub record_path: Option<String>,
}

impl Default for ScrcpyConfig {
    fn default() -> Self {
        Self {
            device_id: String::new(),
            max_size: 1920,
            max_fps: 60,
            bitrate: "8M".to_string(),
            video_codec: "h264".to_string(),
            audio_enabled: true,
            show_touches: false,
            stay_awake: true,
            fullscreen: false,
            borderless: false,
            always_on_top: false,
            turn_screen_off: false,
            record_path: None,
        }
    }
}

struct AppState {
    scrcpy_process: Mutex<Option<std::process::Child>>,
}

#[tauri::command]
fn get_devices() -> Result<Vec<Device>, String> {
    let output = Command::new("adb")
        .args(["devices", "-l"])
        .output()
        .map_err(|e| format!("ADB çalıştırılamadı: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    let mut devices = Vec::new();

    for line in stdout.lines().skip(1) {
        if line.trim().is_empty() {
            continue;
        }

        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() >= 2 {
            let id = parts[0].to_string();
            let status = parts[1].to_string();
            
            // Extract device name from model info
            let name = parts.iter()
                .find(|p| p.starts_with("model:"))
                .map(|p| p.replace("model:", "").replace("_", " "))
                .unwrap_or_else(|| id.clone());

            if status == "device" {
                devices.push(Device { id, name, status });
            }
        }
    }

    Ok(devices)
}

#[tauri::command]
fn connect_wireless(ip: String, port: String) -> Result<String, String> {
    let address = format!("{}:{}", ip, port);
    
    let output = Command::new("adb")
        .args(["connect", &address])
        .output()
        .map_err(|e| format!("Bağlantı hatası: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);

    if stdout.contains("connected") {
        Ok(format!("Bağlandı: {}", address))
    } else {
        Err(format!("Bağlantı başarısız: {} {}", stdout, stderr))
    }
}

#[tauri::command]
fn disconnect_device(device_id: String) -> Result<String, String> {
    let output = Command::new("adb")
        .args(["disconnect", &device_id])
        .output()
        .map_err(|e| format!("Bağlantı kesme hatası: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    Ok(stdout.to_string())
}

#[tauri::command]
fn start_scrcpy(config: ScrcpyConfig, state: State<AppState>) -> Result<String, String> {
    // Stop any existing scrcpy process
    if let Ok(mut process) = state.scrcpy_process.lock() {
        if let Some(mut child) = process.take() {
            let _ = child.kill();
        }
    }

    let mut args: Vec<String> = Vec::new();

    // Device selection
    if !config.device_id.is_empty() {
        args.push("-s".to_string());
        args.push(config.device_id);
    }

    // Video settings
    args.push(format!("--max-size={}", config.max_size));
    args.push(format!("--max-fps={}", config.max_fps));
    args.push(format!("--video-bit-rate={}", config.bitrate));
    args.push(format!("--video-codec={}", config.video_codec));

    // Audio
    if !config.audio_enabled {
        args.push("--no-audio".to_string());
    }

    // Display options
    if config.show_touches {
        args.push("--show-touches".to_string());
    }
    if config.stay_awake {
        args.push("--stay-awake".to_string());
    }
    if config.fullscreen {
        args.push("--fullscreen".to_string());
    }
    if config.borderless {
        args.push("--window-borderless".to_string());
    }
    if config.always_on_top {
        args.push("--always-on-top".to_string());
    }
    if config.turn_screen_off {
        args.push("--turn-screen-off".to_string());
    }

    // Recording
    if let Some(path) = config.record_path {
        if !path.is_empty() {
            args.push(format!("--record={}", path));
        }
    }

    let child = Command::new("scrcpy")
        .args(&args)
        .spawn()
        .map_err(|e| format!("scrcpy başlatılamadı: {}", e))?;

    if let Ok(mut process) = state.scrcpy_process.lock() {
        *process = Some(child);
    }

    Ok("scrcpy başlatıldı".to_string())
}

#[tauri::command]
fn stop_scrcpy(state: State<AppState>) -> Result<String, String> {
    if let Ok(mut process) = state.scrcpy_process.lock() {
        if let Some(mut child) = process.take() {
            child.kill().map_err(|e| format!("Durdurma hatası: {}", e))?;
            return Ok("scrcpy durduruldu".to_string());
        }
    }
    Ok("Çalışan scrcpy bulunamadı".to_string())
}

#[tauri::command]
fn take_screenshot(device_id: String, save_path: String) -> Result<String, String> {
    // Take screenshot on device
    let remote_path = "/sdcard/screenshot.png";
    
    let mut args = vec!["shell", "screencap", "-p", remote_path];
    if !device_id.is_empty() {
        args.insert(0, &device_id);
        args.insert(0, "-s");
    }

    Command::new("adb")
        .args(&args)
        .output()
        .map_err(|e| format!("Ekran görüntüsü alınamadı: {}", e))?;

    // Pull screenshot to computer
    let mut pull_args = vec!["pull", remote_path, &save_path];
    if !device_id.is_empty() {
        pull_args.insert(0, &device_id);
        pull_args.insert(0, "-s");
    }

    Command::new("adb")
        .args(&pull_args)
        .output()
        .map_err(|e| format!("Dosya aktarılamadı: {}", e))?;

    // Clean up remote file
    let mut rm_args = vec!["shell", "rm", remote_path];
    if !device_id.is_empty() {
        rm_args.insert(0, &device_id);
        rm_args.insert(0, "-s");
    }
    let _ = Command::new("adb").args(&rm_args).output();

    Ok(save_path)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(AppState {
            scrcpy_process: Mutex::new(None),
        })
        .invoke_handler(tauri::generate_handler![
            get_devices,
            connect_wireless,
            disconnect_device,
            start_scrcpy,
            stop_scrcpy,
            take_screenshot,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

