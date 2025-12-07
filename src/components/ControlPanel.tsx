import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Play,
  Square,
  Camera,
  Video,
  Loader2,
  StopCircle,
} from 'lucide-react';
import { useScrcpy } from '../hooks/useScrcpy';
import { useAppStore } from '../stores/appStore';

export default function ControlPanel() {
  const { t } = useTranslation();
  const { selectedDevice } = useAppStore();
  const { isRunning, isRecording, startScrcpy, stopScrcpy, takeScreenshot } =
    useScrcpy();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleStart = async () => {
    setIsLoading(true);
    setLoadingAction('start');
    await startScrcpy();
    setIsLoading(false);
    setLoadingAction(null);
  };

  const handleStop = async () => {
    setIsLoading(true);
    setLoadingAction('stop');
    await stopScrcpy();
    setIsLoading(false);
    setLoadingAction(null);
  };

  const handleScreenshot = async () => {
    setIsLoading(true);
    setLoadingAction('screenshot');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await takeScreenshot(`screenshot_${timestamp}.png`);
    setIsLoading(false);
    setLoadingAction(null);
  };

  const isDisabled = !selectedDevice || isLoading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card card-hover"
    >
      <h3 className="font-semibold text-dark-100 mb-4">Controls</h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Start/Stop button */}
        {!isRunning ? (
          <motion.button
            whileHover={{ scale: isDisabled ? 1 : 1.02 }}
            whileTap={{ scale: isDisabled ? 1 : 0.98 }}
            onClick={handleStart}
            disabled={isDisabled}
            className="col-span-2 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingAction === 'start' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            <span>{t('dashboard.start')}</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStop}
            disabled={isLoading}
            className="col-span-2 btn-danger flex items-center justify-center gap-2"
          >
            {loadingAction === 'stop' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Square className="w-5 h-5" />
            )}
            <span>{t('dashboard.stop')}</span>
          </motion.button>
        )}

        {/* Screenshot button */}
        <motion.button
          whileHover={{ scale: isDisabled ? 1 : 1.02 }}
          whileTap={{ scale: isDisabled ? 1 : 0.98 }}
          onClick={handleScreenshot}
          disabled={isDisabled}
          className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingAction === 'screenshot' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Camera className="w-4 h-4" />
          )}
          <span className="text-sm">{t('dashboard.screenshot')}</span>
        </motion.button>

        {/* Record button */}
        <motion.button
          whileHover={{ scale: isDisabled ? 1 : 1.02 }}
          whileTap={{ scale: isDisabled ? 1 : 0.98 }}
          disabled={isDisabled}
          className={`flex items-center justify-center gap-2 ${
            isRecording
              ? 'btn-danger'
              : 'btn-secondary disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {isRecording ? (
            <>
              <StopCircle className="w-4 h-4 animate-pulse" />
              <span className="text-sm">{t('dashboard.stopRecord')}</span>
            </>
          ) : (
            <>
              <Video className="w-4 h-4" />
              <span className="text-sm">{t('dashboard.record')}</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Status indicator */}
      {isRunning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center justify-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-emerald-400">
            scrcpy is running
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

