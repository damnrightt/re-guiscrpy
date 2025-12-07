import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Settings,
  Users,
  Smartphone,
  Globe,
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { id: 'settings', icon: Settings, labelKey: 'nav.settings' },
  { id: 'profiles', icon: Users, labelKey: 'nav.profiles' },
] as const;

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const { currentPage, setCurrentPage } = useAppStore();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-72 h-full bg-dark-900/50 backdrop-blur-xl border-r border-dark-700/50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-dark-700/50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">ReGUI Scrpy</h1>
            <p className="text-xs text-dark-400">v1.0.0</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30'
                  : 'text-dark-300 hover:bg-dark-800/50 hover:text-dark-100 border border-transparent'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                }`}
              />
              <span className="font-medium">{t(item.labelKey)}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 rounded-full bg-primary-400 shadow-lg shadow-primary-400/50"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Language toggle */}
      <div className="p-4 border-t border-dark-700/50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleLanguage}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-dark-800/50 hover:bg-dark-800 border border-dark-600/50 hover:border-primary-500/30 transition-all duration-200"
        >
          <Globe className="w-4 h-4 text-primary-400" />
          <span className="text-sm font-medium text-dark-200">
            {i18n.language === 'tr' ? 'Türkçe' : 'English'}
          </span>
        </motion.button>
      </div>
    </motion.aside>
  );
}

