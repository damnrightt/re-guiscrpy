import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Gamepad2,
  MonitorPlay,
  Video,
  Plus,
  Trash2,
  Check,
  Settings2,
  X,
} from 'lucide-react';
import { useAppStore, Profile } from '../stores/appStore';

const iconMap: Record<string, React.ElementType> = {
  'gamepad-2': Gamepad2,
  'monitor-play': MonitorPlay,
  'video': Video,
  'settings-2': Settings2,
};

export default function Profiles() {
  const { t } = useTranslation();
  const { profiles, setConfig, addProfile, removeProfile, config } = useAppStore();
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [appliedProfile, setAppliedProfile] = useState<string | null>(null);

  const handleApplyProfile = (profile: Profile) => {
    setConfig(profile.config);
    setAppliedProfile(profile.id);
    setTimeout(() => setAppliedProfile(null), 2000);
  };

  const handleSaveNewProfile = () => {
    if (!newProfileName.trim()) return;

    const newProfile: Profile = {
      id: `custom-${Date.now()}`,
      name: newProfileName,
      icon: 'settings-2',
      config: { ...config },
    };

    addProfile(newProfile);
    setNewProfileName('');
    setShowNewProfile(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">{t('profiles.title')}</h1>
            <p className="text-dark-400 mt-1">{t('profiles.subtitle')}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewProfile(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('profiles.save')}
          </motion.button>
        </motion.div>

        {/* Profiles grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {profiles.map((profile) => {
            const Icon = iconMap[profile.icon] || Settings2;
            const isApplied = appliedProfile === profile.id;
            const isCustom = profile.id.startsWith('custom-');

            return (
              <motion.div
                key={profile.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="card card-hover relative overflow-hidden group"
              >
                {/* Applied indicator */}
                <AnimatePresence>
                  {isApplied && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Delete button for custom profiles */}
                {isCustom && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeProfile(profile.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}

                {/* Profile icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary-400" />
                </div>

                {/* Profile info */}
                <h3 className="text-lg font-semibold text-dark-100 mb-2">
                  {profile.name}
                </h3>

                {/* Config preview */}
                <div className="space-y-1 text-sm text-dark-400 mb-4">
                  <p>
                    {profile.config.max_size === 0
                      ? 'Original'
                      : `${profile.config.max_size}p`}{' '}
                    • {profile.config.max_fps} FPS
                  </p>
                  <p>
                    {profile.config.video_codec.toUpperCase()} •{' '}
                    {profile.config.bitrate}
                  </p>
                  <p>
                    {profile.config.audio_enabled ? '🔊 Audio' : '🔇 No Audio'}
                  </p>
                </div>

                {/* Apply button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApplyProfile(profile)}
                  disabled={isApplied}
                  className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                    isApplied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                      : 'btn-secondary'
                  }`}
                >
                  {isApplied ? t('general.success') : t('profiles.apply')}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* New profile modal */}
        <AnimatePresence>
          {showNewProfile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowNewProfile(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="card w-full max-w-md mx-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-dark-100">
                    {t('profiles.save')}
                  </h3>
                  <button
                    onClick={() => setShowNewProfile(false)}
                    className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-dark-400" />
                  </button>
                </div>

                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Profile name..."
                  className="input-field mb-4"
                  autoFocus
                />

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowNewProfile(false)}
                    className="btn-secondary flex-1"
                  >
                    {t('general.cancel')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveNewProfile}
                    disabled={!newProfileName.trim()}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {t('general.save')}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

