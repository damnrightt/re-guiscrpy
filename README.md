# ReGUI Scrpy

<div align="center">

![ReGUI Scrpy](https://img.shields.io/badge/ReGUI-Scrpy-06b6d4?style=for-the-badge&logo=android&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-Apache--2.0-green?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux-lightgrey?style=for-the-badge)

**Modern GUI for scrcpy - Mirror your Android device with style**

*Android cihazınızı şık bir arayüzle yansıtın*

[English](#english) | [Türkçe](#türkçe)

</div>

---

## English

### About

ReGUI Scrpy is a modern, beautiful, and feature-rich graphical user interface for [scrcpy](https://github.com/Genymobile/scrcpy). Built with Tauri and React, it provides a seamless experience for mirroring and controlling your Android device.

### Features

- 🎨 **Modern UI** - Beautiful dark theme with smooth animations
- 📱 **Device Management** - Auto-detect connected devices via USB and wireless
- ⚡ **Quick Controls** - Start/stop mirroring with one click
- 🎮 **Preset Profiles** - Gaming, Streaming, Recording presets
- 📸 **Screenshot** - Capture screenshots instantly
- 🎥 **Recording** - Record your device screen
- 🌐 **Multi-language** - English and Turkish support
- ⚙️ **Full Configuration** - Resolution, FPS, bitrate, codec, and more

### Installation

#### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Rust](https://rustup.rs/) (for Tauri)
- [ADB](https://developer.android.com/tools/adb) (Android Debug Bridge)
- [scrcpy](https://github.com/Genymobile/scrcpy) installed and in PATH

#### Build from Source

```bash
# Clone the repository
git clone https://github.com/damnrightt/re-guiscrpy.git
cd re-guiscrpy

# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

### Usage

1. Connect your Android device via USB (enable USB debugging)
2. Launch ReGUI Scrpy
3. Select your device from the list
4. Click "Start Mirror" to begin

#### Wireless Connection

1. Connect your device via USB first
2. Run `adb tcpip 5555` in terminal
3. Disconnect USB
4. Enter your device's IP address in the app
5. Click "Connect"

### Configuration Options

| Option | Description |
|--------|-------------|
| Max Resolution | Limit the video resolution (720p, 1080p, 1440p, 4K) |
| Max FPS | Limit frame rate (30, 60, 90, 120) |
| Bitrate | Video bitrate (2M - 24M) |
| Video Codec | H.264, H.265, AV1 |
| Audio | Enable/disable audio forwarding |
| Show Touches | Display touch indicators on mirror |
| Stay Awake | Keep device awake while mirroring |
| Fullscreen | Start in fullscreen mode |

---

## Türkçe

### Hakkında

ReGUI Scrpy, [scrcpy](https://github.com/Genymobile/scrcpy) için modern, güzel ve özellik dolu bir grafiksel kullanıcı arayüzüdür. Tauri ve React ile oluşturulmuş olup, Android cihazınızı yansıtmak ve kontrol etmek için kusursuz bir deneyim sunar.

### Özellikler

- 🎨 **Modern Arayüz** - Akıcı animasyonlarla güzel koyu tema
- 📱 **Cihaz Yönetimi** - USB ve kablosuz bağlı cihazları otomatik algılama
- ⚡ **Hızlı Kontroller** - Tek tıkla yansıtmayı başlat/durdur
- 🎮 **Hazır Profiller** - Oyun, İzleme, Kayıt ön ayarları
- 📸 **Ekran Görüntüsü** - Anında ekran görüntüsü al
- 🎥 **Kayıt** - Cihaz ekranını kaydet
- 🌐 **Çoklu Dil** - Türkçe ve İngilizce desteği
- ⚙️ **Tam Yapılandırma** - Çözünürlük, FPS, bitrate, codec ve daha fazlası

### Kurulum

#### Gereksinimler

- [Node.js](https://nodejs.org/) (v18 veya üzeri)
- [Rust](https://rustup.rs/) (Tauri için)
- [ADB](https://developer.android.com/tools/adb) (Android Debug Bridge)
- PATH'e eklenmiş [scrcpy](https://github.com/Genymobile/scrcpy)

#### Kaynaktan Derleme

```bash
# Repoyu klonla
git clone https://github.com/damnrightt/re-guiscrpy.git
cd re-guiscrpy

# Bağımlılıkları yükle
npm install

# Geliştirme modunda çalıştır
npm run tauri dev

# Üretim için derle
npm run tauri build
```

### Kullanım

1. Android cihazınızı USB ile bağlayın (USB hata ayıklamayı etkinleştirin)
2. ReGUI Scrpy'yi başlatın
3. Listeden cihazınızı seçin
4. Başlatmak için "Yansıtmayı Başlat"a tıklayın

#### Kablosuz Bağlantı

1. Önce cihazınızı USB ile bağlayın
2. Terminalde `adb tcpip 5555` komutunu çalıştırın
3. USB'yi çıkarın
4. Uygulamada cihazınızın IP adresini girin
5. "Bağlan"a tıklayın

### Yapılandırma Seçenekleri

| Seçenek | Açıklama |
|---------|----------|
| Maks Çözünürlük | Video çözünürlüğünü sınırla (720p, 1080p, 1440p, 4K) |
| Maks FPS | Kare hızını sınırla (30, 60, 90, 120) |
| Bit Hızı | Video bit hızı (2M - 24M) |
| Video Kodeki | H.264, H.265, AV1 |
| Ses | Ses iletimini etkinleştir/devre dışı bırak |
| Dokunuşları Göster | Yansıtmada dokunma göstergelerini görüntüle |
| Uyanık Tut | Yansıtma sırasında cihazı uyanık tut |
| Tam Ekran | Tam ekran modunda başlat |

---

## Tech Stack

- **Framework**: [Tauri](https://tauri.app/) v2 (Rust backend)
- **Frontend**: [React](https://react.dev/) 18 + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State**: [Zustand](https://zustand-demo.pmnd.rs/)
- **i18n**: [react-i18next](https://react.i18next.com/)

## Screenshots

*Screenshots coming soon...*

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Credits

- [scrcpy](https://github.com/Genymobile/scrcpy) by Genymobile - The amazing tool that makes this possible
- [Tauri](https://tauri.app/) - For the lightweight desktop framework
- [React](https://react.dev/) - For the UI library

---

<div align="center">

Made with ❤️ by [damnrightt](https://github.com/damnrightt)

</div>
