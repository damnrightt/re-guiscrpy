import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Device {
  id: string;
  name: string;
  status: string;
}

export interface ScrcpyConfig {
  device_id: string;
  max_size: number;
  max_fps: number;
  bitrate: string;
  video_codec: string;
  audio_enabled: boolean;
  show_touches: boolean;
  stay_awake: boolean;
  fullscreen: boolean;
  borderless: boolean;
  always_on_top: boolean;
  turn_screen_off: boolean;
  record_path: string | null;
}

export interface Profile {
  id: string;
  name: string;
  icon: string;
  config: ScrcpyConfig;
}

interface AppState {
  // Navigation
  currentPage: 'dashboard' | 'settings' | 'profiles';
  setCurrentPage: (page: 'dashboard' | 'settings' | 'profiles') => void;

  // Devices
  devices: Device[];
  setDevices: (devices: Device[]) => void;
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;

  // scrcpy state
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;

  // Configuration
  config: ScrcpyConfig;
  setConfig: (config: Partial<ScrcpyConfig>) => void;
  resetConfig: () => void;

  // Profiles
  profiles: Profile[];
  addProfile: (profile: Profile) => void;
  removeProfile: (id: string) => void;
  updateProfile: (id: string, profile: Partial<Profile>) => void;

  // Theme
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const defaultConfig: ScrcpyConfig = {
  device_id: '',
  max_size: 1920,
  max_fps: 60,
  bitrate: '8M',
  video_codec: 'h264',
  audio_enabled: true,
  show_touches: false,
  stay_awake: true,
  fullscreen: false,
  borderless: false,
  always_on_top: false,
  turn_screen_off: false,
  record_path: null,
};

const defaultProfiles: Profile[] = [
  {
    id: 'gaming',
    name: 'Gaming',
    icon: 'gamepad-2',
    config: {
      ...defaultConfig,
      max_fps: 120,
      bitrate: '16M',
      video_codec: 'h265',
      audio_enabled: true,
      stay_awake: true,
    },
  },
  {
    id: 'streaming',
    name: 'Streaming',
    icon: 'monitor-play',
    config: {
      ...defaultConfig,
      max_size: 1080,
      max_fps: 30,
      bitrate: '4M',
      audio_enabled: true,
    },
  },
  {
    id: 'recording',
    name: 'Recording',
    icon: 'video',
    config: {
      ...defaultConfig,
      max_size: 1920,
      max_fps: 60,
      bitrate: '12M',
      video_codec: 'h265',
      audio_enabled: true,
    },
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Navigation
      currentPage: 'dashboard',
      setCurrentPage: (page) => set({ currentPage: page }),

      // Devices
      devices: [],
      setDevices: (devices) => set({ devices }),
      selectedDevice: null,
      setSelectedDevice: (device) =>
        set((state) => ({
          selectedDevice: device,
          config: { ...state.config, device_id: device?.id || '' },
        })),

      // scrcpy state
      isRunning: false,
      setIsRunning: (running) => set({ isRunning: running }),
      isRecording: false,
      setIsRecording: (recording) => set({ isRecording: recording }),

      // Configuration
      config: defaultConfig,
      setConfig: (newConfig) =>
        set((state) => ({ config: { ...state.config, ...newConfig } })),
      resetConfig: () => set({ config: defaultConfig }),

      // Profiles
      profiles: defaultProfiles,
      addProfile: (profile) =>
        set((state) => ({ profiles: [...state.profiles, profile] })),
      removeProfile: (id) =>
        set((state) => ({
          profiles: state.profiles.filter((p) => p.id !== id),
        })),
      updateProfile: (id, updates) =>
        set((state) => ({
          profiles: state.profiles.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      // Theme
      theme: 'dark',
      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },
    }),
    {
      name: 'regui-scrpy-storage',
      partialize: (state) => ({
        config: state.config,
        profiles: state.profiles,
        theme: state.theme,
      }),
    }
  )
);

