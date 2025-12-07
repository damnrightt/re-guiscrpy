import { motion } from 'framer-motion';
import { Smartphone, Wifi, WifiOff, Check } from 'lucide-react';
import { Device } from '../stores/appStore';

interface DeviceCardProps {
  device: Device;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export default function DeviceCard({
  device,
  isSelected,
  onClick,
  index,
}: DeviceCardProps) {
  const isWireless = device.id.includes(':');

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-xl border transition-all duration-200 text-left group ${
        isSelected
          ? 'bg-primary-500/10 border-primary-500/50 shadow-lg shadow-primary-500/10'
          : 'bg-dark-800/30 border-dark-700/50 hover:bg-dark-800/50 hover:border-primary-500/30'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Device icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
            isSelected
              ? 'bg-primary-500/20 text-primary-400'
              : 'bg-dark-700/50 text-dark-400 group-hover:bg-dark-700 group-hover:text-dark-300'
          }`}
        >
          <Smartphone className="w-6 h-6" />
        </div>

        {/* Device info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-dark-100 truncate">{device.name}</h3>
            {isWireless ? (
              <Wifi className="w-4 h-4 text-primary-400 flex-shrink-0" />
            ) : (
              <WifiOff className="w-4 h-4 text-dark-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-dark-400 font-mono truncate">{device.id}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="status-online" />
            <span className="text-xs text-emerald-400">Online</span>
          </div>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

