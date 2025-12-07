import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.settings': 'Settings',
      'nav.profiles': 'Profiles',

      // Dashboard
      'dashboard.title': 'Device Mirror',
      'dashboard.subtitle': 'Connect and control your Android device',
      'dashboard.devices': 'Connected Devices',
      'dashboard.noDevices': 'No devices connected',
      'dashboard.noDevicesDesc': 'Connect your Android device via USB or wireless',
      'dashboard.refresh': 'Refresh',
      'dashboard.start': 'Start Mirror',
      'dashboard.stop': 'Stop Mirror',
      'dashboard.screenshot': 'Screenshot',
      'dashboard.record': 'Record',
      'dashboard.stopRecord': 'Stop Recording',

      // Wireless connection
      'wireless.title': 'Wireless Connection',
      'wireless.ip': 'IP Address',
      'wireless.port': 'Port',
      'wireless.connect': 'Connect',
      'wireless.disconnect': 'Disconnect',

      // Settings
      'settings.title': 'Settings',
      'settings.video': 'Video Settings',
      'settings.audio': 'Audio Settings',
      'settings.display': 'Display Options',
      'settings.control': 'Control Options',
      'settings.maxSize': 'Max Resolution',
      'settings.maxFps': 'Max FPS',
      'settings.bitrate': 'Bitrate',
      'settings.codec': 'Video Codec',
      'settings.audioEnabled': 'Enable Audio',
      'settings.showTouches': 'Show Touches',
      'settings.stayAwake': 'Stay Awake',
      'settings.fullscreen': 'Fullscreen',
      'settings.borderless': 'Borderless Window',
      'settings.alwaysOnTop': 'Always on Top',
      'settings.turnScreenOff': 'Turn Screen Off',

      // Profiles
      'profiles.title': 'Profiles',
      'profiles.subtitle': 'Quick configuration presets',
      'profiles.gaming': 'Gaming',
      'profiles.streaming': 'Streaming',
      'profiles.recording': 'Recording',
      'profiles.custom': 'Custom',
      'profiles.apply': 'Apply Profile',
      'profiles.save': 'Save as Profile',
      'profiles.delete': 'Delete',

      // General
      'general.language': 'Language',
      'general.theme': 'Theme',
      'general.dark': 'Dark',
      'general.light': 'Light',
      'general.save': 'Save',
      'general.cancel': 'Cancel',
      'general.reset': 'Reset',
      'general.success': 'Success',
      'general.error': 'Error',
      'general.loading': 'Loading...',
    },
  },
  tr: {
    translation: {
      // Navigation
      'nav.dashboard': 'Ana Sayfa',
      'nav.settings': 'Ayarlar',
      'nav.profiles': 'Profiller',

      // Dashboard
      'dashboard.title': 'Cihaz Yansıtma',
      'dashboard.subtitle': 'Android cihazınızı bağlayın ve kontrol edin',
      'dashboard.devices': 'Bağlı Cihazlar',
      'dashboard.noDevices': 'Bağlı cihaz yok',
      'dashboard.noDevicesDesc': 'Android cihazınızı USB veya kablosuz olarak bağlayın',
      'dashboard.refresh': 'Yenile',
      'dashboard.start': 'Yansıtmayı Başlat',
      'dashboard.stop': 'Yansıtmayı Durdur',
      'dashboard.screenshot': 'Ekran Görüntüsü',
      'dashboard.record': 'Kaydet',
      'dashboard.stopRecord': 'Kaydı Durdur',

      // Wireless connection
      'wireless.title': 'Kablosuz Bağlantı',
      'wireless.ip': 'IP Adresi',
      'wireless.port': 'Port',
      'wireless.connect': 'Bağlan',
      'wireless.disconnect': 'Bağlantıyı Kes',

      // Settings
      'settings.title': 'Ayarlar',
      'settings.video': 'Video Ayarları',
      'settings.audio': 'Ses Ayarları',
      'settings.display': 'Görüntü Seçenekleri',
      'settings.control': 'Kontrol Seçenekleri',
      'settings.maxSize': 'Maksimum Çözünürlük',
      'settings.maxFps': 'Maksimum FPS',
      'settings.bitrate': 'Bit Hızı',
      'settings.codec': 'Video Kodeki',
      'settings.audioEnabled': 'Sesi Etkinleştir',
      'settings.showTouches': 'Dokunuşları Göster',
      'settings.stayAwake': 'Uyanık Tut',
      'settings.fullscreen': 'Tam Ekran',
      'settings.borderless': 'Kenarlıksız Pencere',
      'settings.alwaysOnTop': 'Her Zaman Üstte',
      'settings.turnScreenOff': 'Ekranı Kapat',

      // Profiles
      'profiles.title': 'Profiller',
      'profiles.subtitle': 'Hızlı yapılandırma önayarları',
      'profiles.gaming': 'Oyun',
      'profiles.streaming': 'İzleme',
      'profiles.recording': 'Kayıt',
      'profiles.custom': 'Özel',
      'profiles.apply': 'Profili Uygula',
      'profiles.save': 'Profil Olarak Kaydet',
      'profiles.delete': 'Sil',

      // General
      'general.language': 'Dil',
      'general.theme': 'Tema',
      'general.dark': 'Karanlık',
      'general.light': 'Aydınlık',
      'general.save': 'Kaydet',
      'general.cancel': 'İptal',
      'general.reset': 'Sıfırla',
      'general.success': 'Başarılı',
      'general.error': 'Hata',
      'general.loading': 'Yükleniyor...',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'tr', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

