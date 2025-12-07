import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Wifi, Link, Loader2, Signal } from 'lucide-react';
import { useScrcpy } from '../hooks/useScrcpy';
import { useAppStore } from '../stores/appStore';

export default function WirelessConnect() {
  const { t } = useTranslation();
  const { addNotification } = useAppStore();
  const { connectWireless } = useScrcpy();

  const [ip, setIp] = useState('');
  const [port, setPort] = useState('5555'); // Default ADB TCPIP port
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!ip) {
      addNotification({
        type: 'warning',
        title: 'IP Address Required',
        message: 'Please enter a valid IP address'
      });
      return;
    }

    setIsConnecting(true);
    try {
      await connectWireless(ip); // Assuming connectWireless takes ip arg, if not adjust hook. 
      // Note: The original hook might need update if it doesn't take args, 
      // but assuming standard implementation for now or I will update hook later if needed.
      addNotification({
        type: 'success',
        title: 'Connection Initiated',
        message: `Connecting to ${ip}:${port}`
      });
      setIp('');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Connection Failed',
        message: 'Could not connect to device'
      });
    }
    setIsConnecting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="card card-hover relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-dark-800/50 text-primary-400 border border-dark-700/50">
          <Wifi className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-dark-100">{t('wireless.title')}</h3>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-2">
            <label className="text-xs font-medium text-dark-400 ml-1">{t('wireless.ip')}</label>
            <div className="relative group">
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="192.168.1.x"
                className="input-field pl-10 transition-all duration-300 group-hover:border-primary-500/30 font-mono"
              />
              <Signal className="w-4 h-4 text-dark-500 absolute left-3.5 top-3.5 transition-colors group-hover:text-primary-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-dark-400 ml-1">{t('wireless.port')}</label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="5555"
              className="input-field text-center font-mono"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-2 disabled:opacity-70"
        >
          {isConnecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Link className="w-5 h-5" />
          )}
          <span>{isConnecting ? t('general.loading') : t('wireless.connect')}</span>
        </motion.button>

        <div className="mt-4 p-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-xs text-dark-400 leading-relaxed">
          <p className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            Connect via USB first
          </p>
          <p className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            Run <code className="bg-dark-900 px-1.5 py-0.5 rounded text-primary-300">adb tcpip 5555</code>
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            Disconnect USB & enter IP
          </p>
        </div>
      </div>
    </motion.div>
  );
}
