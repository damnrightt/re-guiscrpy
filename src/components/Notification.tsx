import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export interface NotificationProps {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
}

const iconMap = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
};

const colorMap = {
    success: {
        bg: 'rgba(16, 185, 129, 0.1)',
        border: 'rgba(16, 185, 129, 0.3)',
        icon: '#10b981',
        glow: 'rgba(16, 185, 129, 0.4)',
    },
    error: {
        bg: 'rgba(239, 68, 68, 0.1)',
        border: 'rgba(239, 68, 68, 0.3)',
        icon: '#ef4444',
        glow: 'rgba(239, 68, 68, 0.4)',
    },
    warning: {
        bg: 'rgba(245, 158, 11, 0.1)',
        border: 'rgba(245, 158, 11, 0.3)',
        icon: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.4)',
    },
    info: {
        bg: 'rgba(6, 182, 212, 0.1)',
        border: 'rgba(6, 182, 212, 0.3)',
        icon: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.4)',
    },
};

export default function Notification({ id, type, title, message }: NotificationProps) {
    const { removeNotification } = useAppStore();
    const Icon = iconMap[type];
    const colors = colorMap[type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
            }}
            className="relative min-w-[320px] max-w-[400px] rounded-xl overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${colors.border}`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${colors.glow}`,
            }}
        >
            <div className="flex items-start gap-3 p-4">
                <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: colors.bg }}
                >
                    <Icon className="w-5 h-5" style={{ color: colors.icon }} />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                    <h4 className="text-sm font-semibold text-dark-100">{title}</h4>
                    {message && (
                        <p className="text-xs text-dark-400 mt-0.5 line-clamp-2">{message}</p>
                    )}
                </div>

                <button
                    onClick={() => removeNotification(id)}
                    className="flex-shrink-0 p-1.5 rounded-lg hover:bg-dark-700/50 transition-colors"
                >
                    <X className="w-4 h-4 text-dark-400" />
                </button>
            </div>

            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
                onAnimationComplete={() => removeNotification(id)}
                className="absolute bottom-0 left-0 h-0.5"
                style={{
                    background: `linear-gradient(90deg, ${colors.icon}, transparent)`,
                }}
            />
        </motion.div>
    );
}
