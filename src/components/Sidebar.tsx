import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Settings,
  Users,
  Smartphone,
  Globe,
  ChevronLeft,
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { id: 'settings', icon: Settings, labelKey: 'nav.settings' },
  { id: 'profiles', icon: Users, labelKey: 'nav.profiles' },
] as const;

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const { currentPage, setCurrentPage, sidebarCollapsed, toggleSidebar } = useAppStore();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        width: sidebarCollapsed ? 80 : 280,
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="h-full glass-sidebar flex flex-col relative z-10"
    >
      <div className="p-4 border-b border-dark-700/30">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
              boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4)',
            }}
          >
            <Smartphone className="w-6 h-6 text-white relative z-10" />
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
            />
          </motion.div>

          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold gradient-text">ReGUI Scrpy</h1>
                <p className="text-xs text-dark-500">v1.0.0</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage(item.id)}
              className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${sidebarCollapsed ? 'justify-center' : ''
                }`}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)'
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(6, 182, 212, 0.3)'
                  : '1px solid transparent',
                boxShadow: isActive
                  ? '0 4px 20px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  : 'none',
              }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  rotate: isActive ? [0, -5, 5, 0] : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-300 ${isActive
                    ? 'text-primary-400'
                    : 'text-dark-400 group-hover:text-dark-200'
                    }`}
                />
              </motion.div>

              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`font-medium transition-colors duration-300 ${isActive ? 'text-primary-300' : 'text-dark-300 group-hover:text-dark-100'
                      }`}
                  >
                    {t(item.labelKey)}
                  </motion.span>
                )}
              </AnimatePresence>

              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary-400"
                  style={{
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {!isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.03) 100%)',
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 rounded-r-lg flex items-center justify-center transition-colors duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderLeft: 'none',
        }}
      >
        <motion.div
          animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-4 h-4 text-dark-400" />
        </motion.div>
      </motion.button>

      <div className="p-3 border-t border-dark-700/30 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleLanguage}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${sidebarCollapsed ? 'justify-center' : 'justify-start'
            }`}
          style={{
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(71, 85, 105, 0.3)',
          }}
        >
          <Globe className="w-5 h-5 text-primary-400" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-sm font-medium text-dark-200"
              >
                {i18n.language === 'tr' ? '🇹🇷 Türkçe' : '🇺🇸 English'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
}
