import { useCallback, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useAppStore, Device } from '../stores/appStore';

export function useDevices() {
  const { devices, setDevices, selectedDevice, setSelectedDevice } = useAppStore();

  const refreshDevices = useCallback(async () => {
    try {
      const result = await invoke<Device[]>('get_devices');
      setDevices(result);

      // Auto-select first device if none selected
      if (!selectedDevice && result.length > 0) {
        setSelectedDevice(result[0]);
      }

      // Check if selected device is still connected
      if (selectedDevice && !result.find((d) => d.id === selectedDevice.id)) {
        setSelectedDevice(result.length > 0 ? result[0] : null);
      }
    } catch (error) {
      console.error('Failed to get devices:', error);
      setDevices([]);
    }
  }, [selectedDevice, setDevices, setSelectedDevice]);

  const connectWireless = useCallback(async (ip: string, port: string) => {
    try {
      const result = await invoke<string>('connect_wireless', { ip, port });
      await refreshDevices();
      return { success: true, message: result };
    } catch (error) {
      return { success: false, message: String(error) };
    }
  }, [refreshDevices]);

  const disconnectDevice = useCallback(async (deviceId: string) => {
    try {
      await invoke<string>('disconnect_device', { deviceId });
      await refreshDevices();
      return { success: true };
    } catch (error) {
      return { success: false, message: String(error) };
    }
  }, [refreshDevices]);

  // Auto-refresh devices on mount and every 5 seconds
  useEffect(() => {
    refreshDevices();
    const interval = setInterval(refreshDevices, 5000);
    return () => clearInterval(interval);
  }, [refreshDevices]);

  return {
    devices,
    selectedDevice,
    setSelectedDevice,
    refreshDevices,
    connectWireless,
    disconnectDevice,
  };
}

