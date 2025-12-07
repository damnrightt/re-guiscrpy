import { motion } from 'framer-motion';
import { Smartphone, Wifi, Usb, Check, Signal } from 'lucide-react';
import { Device } from '../stores/appStore';

interface DeviceCardProps {
  device: Device;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export default function DeviceCard({ device, isSelected, onClick, index }: DeviceCardProps) {
  const isOnline = device.status === 'online';
  const isConnecting = device.status === 'connecting';
  const isWireless = device.type === 'wireless' || device.id.includes(':');

  const statusColors = {
    online: {
      bg: 'rgba(16, 185, 129, 0.15)',
      border: 'rgba(16, 185, 129, 0.4)',
      text: '#10b981',
      glow: 'rgba(16, 185, 129, 0.5)',
    },
    connecting: {
      bg: 'rgba(245, 158, 11, 0.15)',
      border: 'rgba(245, 158, 11, 0.4)',
      text: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.5)',
    },
    offline: {
      bg: 'rgba(71, 85, 105, 0.15)',
      border: 'rgba(71, 85, 105, 0.4)',
      text: '#64748b',
      glow: 'transparent',
    },
  };

  const colors = statusColors[device.status] || statusColors.offline;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ scale: 1.01, x: 4 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group relative overflow-hidden"
      style={{
        background: isSelected
          ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)'
          : 'rgba(15, 23, 42, 0.4)',
        border: isSelected
          ? '1px solid rgba(6, 182, 212, 0.4)'
          : '1px solid rgba(71, 85, 105, 0.3)',
        boxShadow: isSelected
          ? '0 4px 20px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          : 'none',
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, transparent 100%)',
        }}
      />

      <div className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: isSelected
            ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)'
            : 'rgba(30, 41, 59, 0.5)',
          border: isSelected
            ? '1px solid rgba(6, 182, 212, 0.3)'
            : '1px solid rgba(71, 85, 105, 0.2)',
        }}
      >
        <Smartphone className={`w-6 h-6 transition-colors duration-300 ${isSelected ? 'text-primary-400' : 'text-dark-400 group-hover:text-dark-300'
          }`} />

        <div className="absolute -top-1 -right-1">
          {isWireless ? (
            <div className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
              }}
            >
              <Wifi className="w-3 h-3 text-primary-400" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              <Usb className="w-3 h-3 text-purple-400" />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 text-left relative z-10">
        <div className="flex items-center gap-2">
          <h3 className={`font-semibold truncate transition-colors duration-300 ${isSelected ? 'text-dark-100' : 'text-dark-200 group-hover:text-dark-100'
            }`}>
            {device.name || 'Unknown Device'}
          </h3>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Check className="w-4 h-4 text-primary-400" />
            </motion.div>
          )}
        </div>
        <p className="text-sm text-dark-500 truncate mt-0.5">{device.id}</p>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="flex items-center gap-2">
          {isConnecting && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Signal className="w-4 h-4" style={{ color: colors.text }} />
            </motion.div>
          )}
          <div
            className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
            style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isConnecting ? 'animate-pulse' : ''}`}
              style={{
                background: colors.text,
                boxShadow: `0 0 8px ${colors.glow}`,
              }}
            />
            {device.status === 'online' && 'Online'}
            {device.status === 'connecting' && 'Connecting'}
            {device.status === 'offline' && 'Offline'}
          </div>
        </div>
      </div>

      {isSelected && (
        <motion.div
          layoutId="deviceSelector"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
          style={{
            background: 'linear-gradient(180deg, #06b6d4 0%, #3b82f6 100%)',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.6)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
}
