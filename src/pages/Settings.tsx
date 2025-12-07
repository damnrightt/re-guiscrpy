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
  Sliders,
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export default function Settings() {
  const { t } = useTranslation();
  const { config, setConfig, resetConfig, addNotification } = useAppStore();

  const handleSave = () => {
    // In a real app, this might persist to disk if not using auto-persist or for explicit confirmation
    addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'Configuration has been updated'
    });
  };

  const handleReset = () => {
    resetConfig();
    addNotification({
      type: 'info',
      title: 'Settings Reset',
      message: 'Configuration restored to defaults'
    });
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
        ease: [0.4, 0, 0.2, 1]
      }
    },
  };

  return (
    <div className="h-full overflow-y-auto p-6 scrollbar-hide">
      <div className="max-w-4xl mx-auto pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-blue-600/20 flex items-center justify-center border border-primary-500/30 shadow-glow-cyan">
            <Sliders className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">{t('settings.title')}</h1>
            <p className="text-dark-400 mt-1">Configure your mirroring experience</p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Video Settings */}
          <motion.div variants={itemVariants} className="card card-hover group">
            <h2 className="text-lg font-semibold text-dark-100 mb-6 flex items-center gap-3 pb-4 border-b border-dark-700/50">
              <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400 group-hover:scale-110 transition-transform duration-300">
                <Monitor className="w-5 h-5" />
              </div>
              {t('settings.video')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Max Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300 ml-1">{t('settings.maxSize')}</label>
                <div className="relative">
                  <select
                    value={config.max_size}
                    onChange={(e) => setConfig({ max_size: Number(e.target.value) })}
                    className="input-field w-full appearance-none cursor-pointer hover:border-primary-500/50"
                  >
                    <option value="0">Original</option>
                    <option value="720">720p</option>
                    <option value="1080">1080p</option>
                    <option value="1440">1440p</option>
                    <option value="1920">1920p</option>
                    <option value="2160">4K</option>
                  </select>
                </div>
              </div>

              {/* Max FPS */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300 ml-1">{t('settings.maxFps')}</label>
                <select
                  value={config.max_fps}
                  onChange={(e) => setConfig({ max_fps: Number(e.target.value) })}
                  className="input-field w-full appearance-none cursor-pointer hover:border-primary-500/50"
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
                <label className="text-sm font-medium text-dark-300 ml-1">{t('settings.bitrate')}</label>
                <select
                  value={config.bitrate}
                  onChange={(e) => setConfig({ bitrate: e.target.value })}
                  className="input-field w-full appearance-none cursor-pointer hover:border-primary-500/50"
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
                <label className="text-sm font-medium text-dark-300 ml-1">{t('settings.codec')}</label>
                <select
                  value={config.video_codec}
                  onChange={(e) => setConfig({ video_codec: e.target.value })}
                  className="input-field w-full appearance-none cursor-pointer hover:border-primary-500/50"
                >
                  <option value="h264">H.264 (AVC)</option>
                  <option value="h265">H.265 (HEVC)</option>
                  <option value="av1">AV1</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Audio & Display split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Audio Settings */}
            <motion.div variants={itemVariants} className="card card-hover group h-full">
              <h2 className="text-lg font-semibold text-dark-100 mb-6 flex items-center gap-3 pb-4 border-b border-dark-700/50">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                  <Volume2 className="w-5 h-5" />
                </div>
                {t('settings.audio')}
              </h2>

              <SettingToggle
                icon={Volume2}
                label={t('settings.audioEnabled')}
                checked={config.audio_enabled}
                onChange={(checked) => setConfig({ audio_enabled: checked })}
                color="pink"
              />
            </motion.div>

            {/* Display Options */}
            <motion.div variants={itemVariants} className="card card-hover group h-full">
              <h2 className="text-lg font-semibold text-dark-100 mb-6 flex items-center gap-3 pb-4 border-b border-dark-700/50">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <Gauge className="w-5 h-5" />
                </div>
                {t('settings.display')}
              </h2>

              <div className="space-y-3">
                <SettingToggle
                  icon={Eye}
                  label={t('settings.showTouches')}
                  checked={config.show_touches}
                  onChange={(checked) => setConfig({ show_touches: checked })}
                  color="emerald"
                />
                <SettingToggle
                  icon={Coffee}
                  label={t('settings.stayAwake')}
                  checked={config.stay_awake}
                  onChange={(checked) => setConfig({ stay_awake: checked })}
                  color="emerald"
                />
                <SettingToggle
                  icon={Maximize}
                  label={t('settings.fullscreen')}
                  checked={config.fullscreen}
                  onChange={(checked) => setConfig({ fullscreen: checked })}
                  color="emerald"
                />
                <SettingToggle
                  icon={Square}
                  label={t('settings.borderless')}
                  checked={config.borderless}
                  onChange={(checked) => setConfig({ borderless: checked })}
                  color="emerald"
                />
                <SettingToggle
                  icon={ArrowUp}
                  label={t('settings.alwaysOnTop')}
                  checked={config.always_on_top}
                  onChange={(checked) => setConfig({ always_on_top: checked })}
                  color="emerald"
                />
                <SettingToggle
                  icon={MonitorOff}
                  label={t('settings.turnScreenOff')}
                  checked={config.turn_screen_off}
                  onChange={(checked) => setConfig({ turn_screen_off: checked })}
                  color="emerald"
                />
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div variants={itemVariants} className="flex justify-end gap-3 sticky bottom-6 bg-dark-900/80 backdrop-blur-xl p-4 rounded-2xl border border-dark-700/50 shadow-2xl">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t('general.reset')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
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
  color?: 'primary' | 'pink' | 'emerald';
}

function SettingToggle({ icon: Icon, label, checked, onChange, color = 'primary' }: SettingToggleProps) {
  const getColors = () => {
    switch (color) {
      case 'pink': return checked ? 'bg-pink-500' : 'bg-dark-600';
      case 'emerald': return checked ? 'bg-emerald-500' : 'bg-dark-600';
      default: return checked ? 'bg-primary-500' : 'bg-dark-600';
    }
  };

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}
      className="flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 transition-colors ${checked ? 'text-white' : 'text-dark-400'}`} />
        <span className={`transition-colors ${checked ? 'text-white font-medium' : 'text-dark-300'}`}>{label}</span>
      </div>
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${getColors()}`}
      >
        <motion.div
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
        />
      </div>
    </motion.div>
  );
}
