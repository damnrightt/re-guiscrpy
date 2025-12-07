import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Monitor,
  Gauge,
  Volume2,
  Eye,
  Coffee,
  Maximize,
  Square,
  ArrowUp,
  MonitorOff,
  RotateCcw,
  Save,
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export default function Settings() {
  const { t } = useTranslation();
  const { config, setConfig, resetConfig } = useAppStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text">{t('settings.title')}</h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Video Settings */}
          <motion.div variants={itemVariants} className="card card-hover">
            <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary-400" />
              {t('settings.video')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Max Size */}
              <div className="space-y-2">
                <label className="text-sm text-dark-300">{t('settings.maxSize')}</label>
                <select
                  value={config.max_size}
                  onChange={(e) => setConfig({ max_size: Number(e.target.value) })}
                  className="input-field"
                >
                  <option value="0">Original</option>
                  <option value="720">720p</option>
                  <option value="1080">1080p</option>
                  <option value="1440">1440p</option>
                  <option value="1920">1920p</option>
                  <option value="2160">4K</option>
                </select>
              </div>

              {/* Max FPS */}
              <div className="space-y-2">
                <label className="text-sm text-dark-300">{t('settings.maxFps')}</label>
                <select
                  value={config.max_fps}
                  onChange={(e) => setConfig({ max_fps: Number(e.target.value) })}
                  className="input-field"
                >
                  <option value="15">15 FPS</option>
                  <option value="30">30 FPS</option>
                  <option value="60">60 FPS</option>
                  <option value="90">90 FPS</option>
                  <option value="120">120 FPS</option>
                </select>
              </div>

              {/* Bitrate */}
              <div className="space-y-2">
                <label className="text-sm text-dark-300">{t('settings.bitrate')}</label>
                <select
                  value={config.bitrate}
                  onChange={(e) => setConfig({ bitrate: e.target.value })}
                  className="input-field"
                >
                  <option value="2M">2 Mbps</option>
                  <option value="4M">4 Mbps</option>
                  <option value="8M">8 Mbps</option>
                  <option value="12M">12 Mbps</option>
                  <option value="16M">16 Mbps</option>
                  <option value="24M">24 Mbps</option>
                </select>
              </div>

              {/* Codec */}
              <div className="space-y-2">
                <label className="text-sm text-dark-300">{t('settings.codec')}</label>
                <select
                  value={config.video_codec}
                  onChange={(e) => setConfig({ video_codec: e.target.value })}
                  className="input-field"
                >
                  <option value="h264">H.264 (AVC)</option>
                  <option value="h265">H.265 (HEVC)</option>
                  <option value="av1">AV1</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Audio Settings */}
          <motion.div variants={itemVariants} className="card card-hover">
            <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary-400" />
              {t('settings.audio')}
            </h2>

            <SettingToggle
              icon={Volume2}
              label={t('settings.audioEnabled')}
              checked={config.audio_enabled}
              onChange={(checked) => setConfig({ audio_enabled: checked })}
            />
          </motion.div>

          {/* Display Options */}
          <motion.div variants={itemVariants} className="card card-hover">
            <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-primary-400" />
              {t('settings.display')}
            </h2>

            <div className="space-y-3">
              <SettingToggle
                icon={Eye}
                label={t('settings.showTouches')}
                checked={config.show_touches}
                onChange={(checked) => setConfig({ show_touches: checked })}
              />
              <SettingToggle
                icon={Coffee}
                label={t('settings.stayAwake')}
                checked={config.stay_awake}
                onChange={(checked) => setConfig({ stay_awake: checked })}
              />
              <SettingToggle
                icon={Maximize}
                label={t('settings.fullscreen')}
                checked={config.fullscreen}
                onChange={(checked) => setConfig({ fullscreen: checked })}
              />
              <SettingToggle
                icon={Square}
                label={t('settings.borderless')}
                checked={config.borderless}
                onChange={(checked) => setConfig({ borderless: checked })}
              />
              <SettingToggle
                icon={ArrowUp}
                label={t('settings.alwaysOnTop')}
                checked={config.always_on_top}
                onChange={(checked) => setConfig({ always_on_top: checked })}
              />
              <SettingToggle
                icon={MonitorOff}
                label={t('settings.turnScreenOff')}
                checked={config.turn_screen_off}
                onChange={(checked) => setConfig({ turn_screen_off: checked })}
              />
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div variants={itemVariants} className="flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetConfig}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t('general.reset')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t('general.save')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

interface SettingToggleProps {
  icon: React.ElementType;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function SettingToggle({ icon: Icon, label, checked, onChange }: SettingToggleProps) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.05)' }}
      className="flex items-center justify-between p-3 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-dark-400" />
        <span className="text-dark-200">{label}</span>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-primary-500' : 'bg-dark-600'
        }`}
      >
        <motion.div
          animate={{ x: checked ? 24 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
        />
      </button>
    </motion.div>
  );
}

