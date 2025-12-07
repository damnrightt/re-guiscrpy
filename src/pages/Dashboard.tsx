import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Smartphone, Loader2 } from 'lucide-react';
import { useState } from 'react';
import DeviceCard from '../components/DeviceCard';
import WirelessConnect from '../components/WirelessConnect';
import ControlPanel from '../components/ControlPanel';
import QuickSettings from '../components/QuickSettings';
import { useDevices } from '../hooks/useDevices';

export default function Dashboard() {
  const { t } = useTranslation();
  const { devices, selectedDevice, setSelectedDevice, refreshDevices } = useDevices();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshDevices();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              {t('dashboard.title')}
            </h1>
            <p className="text-dark-400 mt-1">{t('dashboard.subtitle')}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-3 rounded-xl bg-dark-800/50 border border-dark-600/50 hover:border-primary-500/30 transition-all"
          >
            <RefreshCw
              className={`w-5 h-5 text-primary-400 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Devices */}
          <div className="lg:col-span-2 space-y-6">
            {/* Device list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-dark-100">
                  {t('dashboard.devices')}
                </h2>
                <span className="text-sm text-dark-400">
                  {devices.length} {devices.length === 1 ? 'device' : 'devices'}
                </span>
              </div>

              {devices.length > 0 ? (
                <div className="space-y-3">
                  {devices.map((device, index) => (
                    <DeviceCard
                      key={device.id}
                      device={device}
                      isSelected={selectedDevice?.id === device.id}
                      onClick={() => setSelectedDevice(device)}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-dark-800/50 flex items-center justify-center mb-4">
                    <Smartphone className="w-8 h-8 text-dark-500" />
                  </div>
                  <h3 className="text-lg font-medium text-dark-300">
                    {t('dashboard.noDevices')}
                  </h3>
                  <p className="text-sm text-dark-500 mt-1 max-w-xs">
                    {t('dashboard.noDevicesDesc')}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRefresh}
                    className="mt-4 btn-secondary flex items-center gap-2"
                  >
                    {isRefreshing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    {t('dashboard.refresh')}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Wireless connection */}
            <WirelessConnect />
          </div>

          {/* Right column - Controls & Settings */}
          <div className="space-y-6">
            <ControlPanel />
            <QuickSettings />
          </div>
        </div>
      </div>
    </div>
  );
}

