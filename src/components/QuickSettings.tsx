import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Monitor,
  Gauge,
  Volume2,
  VolumeX,
  Eye,
  Coffee,
  Maximize,
  Square,
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const resolutionOptions = [
  { value: 0, label: 'Original' },
  { value: 720, label: '720p' },
  { value: 1080, label: '1080p' },
  { value: 1440, label: '1440p' },
  { value: 1920, label: '1920p' },
];

const fpsOptions = [
  { value: 30, label: '30 FPS' },
  { value: 60, label: '60 FPS' },
  { value: 90, label: '90 FPS' },
  { value: 120, label: '120 FPS' },
];

const codecOptions = [
  { value: 'h264', label: 'H.264' },
  { value: 'h265', label: 'H.265' },
  { value: 'av1', label: 'AV1' },
];

export default function QuickSettings() {
  const { t } = useTranslation();
  const { config, setConfig } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card card-hover space-y-4"
    >
      <h3 className="font-semibold text-dark-100">Quick Settings</h3>

      {/* Resolution */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-dark-300">
          <Monitor className="w-4 h-4 text-primary-400" />
          {t('settings.maxSize')}
        </label>
        <div className="flex gap-2 flex-wrap">
          {resolutionOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setConfig({ max_size: option.value })}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                config.max_size === option.value
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                  : 'bg-dark-800/50 text-dark-300 border border-dark-600/50 hover:border-primary-500/30'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* FPS */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-dark-300">
          <Gauge className="w-4 h-4 text-primary-400" />
          {t('settings.maxFps')}
        </label>
        <div className="flex gap-2 flex-wrap">
          {fpsOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setConfig({ max_fps: option.value })}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                config.max_fps === option.value
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                  : 'bg-dark-800/50 text-dark-300 border border-dark-600/50 hover:border-primary-500/30'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Codec */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-dark-300">
          {t('settings.codec')}
        </label>
        <div className="flex gap-2">
          {codecOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setConfig({ video_codec: option.value })}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                config.video_codec === option.value
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                  : 'bg-dark-800/50 text-dark-300 border border-dark-600/50 hover:border-primary-500/30'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle options */}
      <div className="grid grid-cols-2 gap-2">
        <ToggleButton
          active={config.audio_enabled}
          onClick={() => setConfig({ audio_enabled: !config.audio_enabled })}
          icon={config.audio_enabled ? Volume2 : VolumeX}
          label={t('settings.audioEnabled')}
        />
        <ToggleButton
          active={config.show_touches}
          onClick={() => setConfig({ show_touches: !config.show_touches })}
          icon={Eye}
          label={t('settings.showTouches')}
        />
        <ToggleButton
          active={config.stay_awake}
          onClick={() => setConfig({ stay_awake: !config.stay_awake })}
          icon={Coffee}
          label={t('settings.stayAwake')}
        />
        <ToggleButton
          active={config.fullscreen}
          onClick={() => setConfig({ fullscreen: !config.fullscreen })}
          icon={Maximize}
          label={t('settings.fullscreen')}
        />
        <ToggleButton
          active={config.borderless}
          onClick={() => setConfig({ borderless: !config.borderless })}
          icon={Square}
          label={t('settings.borderless')}
        />
        <ToggleButton
          active={config.always_on_top}
          onClick={() => setConfig({ always_on_top: !config.always_on_top })}
          icon={Monitor}
          label={t('settings.alwaysOnTop')}
        />
      </div>
    </motion.div>
  );
}

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}

function ToggleButton({ active, onClick, icon: Icon, label }: ToggleButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
          : 'bg-dark-800/50 text-dark-400 border border-dark-600/50 hover:text-dark-300 hover:border-primary-500/30'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="truncate">{label}</span>
    </motion.button>
  );
}

