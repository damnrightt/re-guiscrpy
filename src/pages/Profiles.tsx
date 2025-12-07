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
  Sparkles,
  Command,
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
  const { profiles, setConfig, addProfile, removeProfile, config, addNotification } = useAppStore();
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [appliedProfile, setAppliedProfile] = useState<string | null>(null);

  const handleApplyProfile = (profile: Profile) => {
    setConfig(profile.config);
    setAppliedProfile(profile.id);
    addNotification({
      type: 'success',
      title: 'Profile Applied',
      message: `${profile.name} settings loaded`,
    });
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
    addNotification({
      type: 'success',
      title: 'Profile Created',
      message: `${newProfileName} has been saved`,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }
    },
  };

  return (
    <div className="h-full overflow-y-auto p-6 scrollbar-hide">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30 shadow-glow-purple">
              <Command className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">{t('profiles.title')}</h1>
              <p className="text-dark-400 mt-1">{t('profiles.subtitle')}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewProfile(true)}
            className="btn-primary flex items-center gap-2 group"
          >
            <div className="bg-white/20 p-1 rounded-md group-hover:rotate-90 transition-transform duration-300">
              <Plus className="w-3.5 h-3.5" />
            </div>
            {t('profiles.save')}
          </motion.button>
        </motion.div>

        {/* Profiles grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {profiles.map((profile) => {
            const Icon = iconMap[profile.icon] || Settings2;
            const isApplied = appliedProfile === profile.id;
            const isCustom = profile.id.startsWith('custom-');

            return (
              <motion.div
                key={profile.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="card card-hover relative overflow-hidden group flex flex-col h-full"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Applied indicator */}
                <AnimatePresence>
                  {isApplied && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40 z-20"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Delete button for custom profiles */}
                {isCustom && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"
                    onClick={() => removeProfile(profile.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}

                {/* Profile icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/10 to-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10 border border-primary-500/20">
                  <Icon className="w-7 h-7 text-primary-400 group-hover:text-primary-300 transition-colors" />
                </div>

                {/* Profile info */}
                <div className="relative z-10 flex-1">
                  <h3 className="text-lg font-bold text-dark-100 mb-1 group-hover:text-primary-300 transition-colors">
                    {profile.name}
                  </h3>
                  <div className="h-0.5 w-10 bg-dark-700/50 mb-3 group-hover:w-full group-hover:bg-primary-500/30 transition-all duration-500" />

                  {/* Config preview */}
                  <div className="space-y-1.5 text-sm text-dark-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MonitorPlay className="w-3.5 h-3.5" />
                      <span>
                        {profile.config.max_size === 0 ? 'Original' : `${profile.config.max_size}p`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{profile.config.max_fps} FPS • {profile.config.bitrate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${profile.config.audio_enabled ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <span>{profile.config.audio_enabled ? 'Audio On' : 'Audio Off'}</span>
                    </div>
                  </div>
                </div>

                {/* Apply button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApplyProfile(profile)}
                  disabled={isApplied}
                  className={`relative z-10 w-full py-3 rounded-xl font-medium transition-all duration-300 ${isApplied
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : 'bg-dark-800/80 text-dark-200 border border-dark-600/50 hover:bg-primary-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-primary-500/30'
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
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowNewProfile(false)}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="card w-full max-w-md mx-4 relative z-10 border-primary-500/20 shadow-2xl shadow-primary-500/10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-purple-500" />
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-dark-100 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary-400" />
                    {t('profiles.save')}
                  </h3>
                  <button
                    onClick={() => setShowNewProfile(false)}
                    className="p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Profile Name</label>
                    <input
                      type="text"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      placeholder="e.g., High Quality Recording"
                      className="input-field"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveNewProfile()}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
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
                      className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('general.save')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
