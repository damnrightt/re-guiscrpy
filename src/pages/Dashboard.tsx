import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Smartphone, Loader2, Zap } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-6"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
              }}
            >
              <Zap className="w-7 h-7 text-primary-400" />
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(6, 182, 212, 0.4)',
                    '0 0 0 10px rgba(6, 182, 212, 0)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold gradient-text-glow">
                {t('dashboard.title')}
              </h1>
              <p className="text-dark-400 mt-1">{t('dashboard.subtitle')}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-3 rounded-xl transition-all duration-300 group"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(71, 85, 105, 0.4)',
            }}
          >
            <RefreshCw
              className={`w-5 h-5 text-primary-400 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
                }`}
            />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              variants={itemVariants}
              className="card card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"
                    style={{ boxShadow: '0 0 10px rgba(6, 182, 212, 0.6)' }}
                  />
                  <h2 className="font-semibold text-dark-100">
                    {t('dashboard.devices')}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: devices.length > 0
                      ? 'rgba(16, 185, 129, 0.15)'
                      : 'rgba(71, 85, 105, 0.3)',
                    color: devices.length > 0 ? '#10b981' : '#94a3b8',
                    border: devices.length > 0
                      ? '1px solid rgba(16, 185, 129, 0.3)'
                      : '1px solid rgba(71, 85, 105, 0.3)',
                  }}
                >
                  {devices.length} {devices.length === 1 ? 'device' : 'devices'}
                </span>
              </div>

              {devices.length > 0 ? (
                <motion.div
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {devices.map((device, index) => (
                    <DeviceCard
                      key={device.id}
                      device={device}
                      isSelected={selectedDevice?.id === device.id}
                      onClick={() => setSelectedDevice(device)}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 relative"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%)',
                      border: '1px solid rgba(71, 85, 105, 0.3)',
                    }}
                  >
                    <Smartphone className="w-10 h-10 text-dark-500" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-dark-300">
                    {t('dashboard.noDevices')}
                  </h3>
                  <p className="text-sm text-dark-500 mt-1 max-w-xs">
                    {t('dashboard.noDevicesDesc')}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRefresh}
                    className="mt-6 btn-secondary flex items-center gap-2"
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

            <motion.div variants={itemVariants}>
              <WirelessConnect />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <ControlPanel />
            </motion.div>
            <motion.div variants={itemVariants}>
              <QuickSettings />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
