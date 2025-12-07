import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Wifi, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useDevices } from '../hooks/useDevices';

export default function WirelessConnect() {
  const { t } = useTranslation();
  const { connectWireless } = useDevices();
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('5555');
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleConnect = async () => {
    if (!ip.trim()) return;

    setIsConnecting(true);
    setStatus('idle');

    const result = await connectWireless(ip, port);

    setIsConnecting(false);
    setStatus(result.success ? 'success' : 'error');
    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        setStatus('idle');
        setIp('');
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card card-hover"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
          <Wifi className="w-5 h-5 text-primary-400" />
        </div>
        <h3 className="font-semibold text-dark-100">{t('wireless.title')}</h3>
      </div>

      <div className="space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder={t('wireless.ip')}
            className="input-field flex-1"
          />
          <input
            type="text"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            placeholder={t('wireless.port')}
            className="input-field w-24"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConnect}
          disabled={isConnecting || !ip.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t('general.loading')}</span>
            </>
          ) : (
            <span>{t('wireless.connect')}</span>
          )}
        </motion.button>

        {/* Status message */}
        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`flex items-center gap-2 p-3 rounded-lg ${
                status === 'success'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              <span className="text-sm">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

