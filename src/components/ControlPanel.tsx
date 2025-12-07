import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Play,
  Square,
  Camera,
  Video,
  Loader2,
  StopCircle,
  Zap,
} from 'lucide-react';
import { useScrcpy } from '../hooks/useScrcpy';
import { useAppStore } from '../stores/appStore';

export default function ControlPanel() {
  const { t } = useTranslation();
  const { selectedDevice, addNotification } = useAppStore();
  const { isRunning, isRecording, startScrcpy, stopScrcpy, takeScreenshot } =
    useScrcpy();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleStart = async () => {
    if (!selectedDevice) {
      addNotification({
        type: 'warning',
        title: 'No Device Selected',
        message: 'Please select a device first',
      });
      return;
    }
    setIsLoading(true);
    setLoadingAction('start');
    try {
      await startScrcpy();
      addNotification({
        type: 'success',
        title: 'Mirror Started',
        message: `Connected to ${selectedDevice.name || selectedDevice.id}`,
      });
    } catch {
      addNotification({
        type: 'error',
        title: 'Failed to Start',
        message: 'Could not start mirroring',
      });
    }
    setIsLoading(false);
    setLoadingAction(null);
  };

  const handleStop = async () => {
    setIsLoading(true);
    setLoadingAction('stop');
    await stopScrcpy();
    addNotification({
      type: 'info',
      title: 'Mirror Stopped',
    });
    setIsLoading(false);
    setLoadingAction(null);
  };

  const handleScreenshot = async () => {
    setIsLoading(true);
    setLoadingAction('screenshot');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    try {
      await takeScreenshot(`screenshot_${timestamp}.png`);
      addNotification({
        type: 'success',
        title: 'Screenshot Saved',
        message: `screenshot_${timestamp}.png`,
      });
    } catch {
      addNotification({
        type: 'error',
        title: 'Screenshot Failed',
      });
    }
    setIsLoading(false);
    setLoadingAction(null);
  };

  const isDisabled = !selectedDevice || isLoading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="card card-hover"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
          }}
        >
          <Zap className="w-4 h-4 text-primary-400" />
        </div>
        <h3 className="font-semibold text-dark-100">Controls</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="wait">
          {!isRunning ? (
            <motion.button
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: isDisabled ? 1 : 1.02 }}
              whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              onClick={handleStart}
              disabled={isDisabled}
              className="col-span-2 btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                }}
              />
              {loadingAction === 'start' ? (
                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
              ) : (
                <Play className="w-5 h-5 relative z-10" />
              )}
              <span className="relative z-10 font-semibold">{t('dashboard.start')}</span>
            </motion.button>
          ) : (
            <motion.button
              key="stop"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStop}
              disabled={isLoading}
              className="col-span-2 btn-danger flex items-center justify-center gap-2 py-4 relative overflow-hidden"
            >
              {loadingAction === 'stop' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              <span className="font-semibold">{t('dashboard.stop')}</span>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: isDisabled ? 1 : 1.02 }}
          whileTap={{ scale: isDisabled ? 1 : 0.98 }}
          onClick={handleScreenshot}
          disabled={isDisabled}
          className="btn-secondary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingAction === 'screenshot' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Camera className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{t('dashboard.screenshot')}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: isDisabled ? 1 : 1.02 }}
          whileTap={{ scale: isDisabled ? 1 : 0.98 }}
          disabled={isDisabled}
          className={`flex items-center justify-center gap-2 py-3 ${isRecording
              ? 'btn-danger'
              : 'btn-secondary disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
        >
          {isRecording ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <StopCircle className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-medium">{t('dashboard.stopRecord')}</span>
            </>
          ) : (
            <>
              <Video className="w-4 h-4" />
              <span className="text-sm font-medium">{t('dashboard.record')}</span>
            </>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div
              className="flex items-center justify-center gap-2 p-3 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <motion.span
                className="w-2 h-2 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  background: '#10b981',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
                }}
              />
              <span className="text-sm font-medium text-emerald-400">
                scrcpy is running
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
