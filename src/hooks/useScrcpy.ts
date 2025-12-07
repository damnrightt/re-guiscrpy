import { useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useAppStore } from '../stores/appStore';

export function useScrcpy() {
  const { config, isRunning, setIsRunning, isRecording, setIsRecording, selectedDevice } =
    useAppStore();

  const startScrcpy = useCallback(async () => {
    if (!selectedDevice) {
      return { success: false, message: 'No device selected' };
    }

    try {
      const result = await invoke<string>('start_scrcpy', {
        config: { ...config, device_id: selectedDevice.id },
      });
      setIsRunning(true);
      return { success: true, message: result };
    } catch (error) {
      return { success: false, message: String(error) };
    }
  }, [config, selectedDevice, setIsRunning]);

  const stopScrcpy = useCallback(async () => {
    try {
      const result = await invoke<string>('stop_scrcpy');
      setIsRunning(false);
      setIsRecording(false);
      return { success: true, message: result };
    } catch (error) {
      return { success: false, message: String(error) };
    }
  }, [setIsRunning, setIsRecording]);

  const startRecording = useCallback(
    async (savePath: string) => {
      if (!selectedDevice) {
        return { success: false, message: 'No device selected' };
      }

      try {
        const result = await invoke<string>('start_scrcpy', {
          config: { ...config, device_id: selectedDevice.id, record_path: savePath },
        });
        setIsRunning(true);
        setIsRecording(true);
        return { success: true, message: result };
      } catch (error) {
        return { success: false, message: String(error) };
      }
    },
    [config, selectedDevice, setIsRunning, setIsRecording]
  );

  const takeScreenshot = useCallback(
    async (savePath: string) => {
      if (!selectedDevice) {
        return { success: false, message: 'No device selected' };
      }

      try {
        const result = await invoke<string>('take_screenshot', {
          deviceId: selectedDevice.id,
          savePath,
        });
        return { success: true, message: result };
      } catch (error) {
        return { success: false, message: String(error) };
      }
    },
    [selectedDevice]
  );

  const connectWireless = useCallback(async (ip: string, port: string = '5555') => {
    try {
      const result = await invoke<string>('connect_wireless', { ip, port });
      return { success: true, message: result };
    } catch (error) {
      return { success: false, message: String(error) };
    }
  }, []);

  return {
    isRunning,
    isRecording,
    startScrcpy,
    stopScrcpy,
    startRecording,
    takeScreenshot,
    connectWireless,
  };
}

