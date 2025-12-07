# ReGUI Scrpy

<div align="center">

![ReGUI Scrpy Logo](https://img.shields.io/badge/ReGUI-Scrpy-06b6d4?style=for-the-badge&logo=android&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-Apache--2.0-green?style=for-the-badge)

**Modern, Beautiful, and Powerful GUI for scrcpy**
*Mirror your Android device with style*

[English](#english) | [Türkçe](#türkçe)

</div>

---

## English

### ✨ Features

- 🎨 **Modern Glassmorphism UI** - Beautiful dark theme with smooth animations and neon effects
- 📱 **Smart Device Management** - Auto-detect USB and wireless devices
- ⚡ **Quick Controls** - Start/stop mirroring, screen recording, and screenshots with one click
- 🎮 **Pro Profiles** - Pre-configured profiles for Gaming (120FPS), Streaming, and High Quality Recording
- 🔔 **Interactive Notifications** - Real-time feedback for all actions
- 🌐 **Multi-language** - Full support for English and Turkish
- 🛠️ **Advanced Configuration** - Fine-tune bitrate, resolution, codecs (H.264, H.265, AV1), and more

### 🚀 Tech Stack

- **Core**: [Tauri](https://tauri.app/) v2 (Rust backend)
- **Frontend**: [React](https://react.dev/) 18 + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State**: [Zustand](https://zustand-demo.pmnd.rs/)

### 📦 Installation

#### Prerequisites

1. [Node.js](https://nodejs.org/) (v18 or later)
2. [Rust](https://rustup.rs/) (for Tauri)
3. [ADB](https://developer.android.com/tools/adb) (Android Debug Bridge)
4. [scrcpy](https://github.com/Genymobile/scrcpy) (Must be in PATH)

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

---

## Türkçe

### ✨ Özellikler

- 🎨 **Modern Glassmorphism Arayüz** - Akıcı animasyonlar ve neon efektleriyle şık karanlık tema
- 📱 **Akıllı Cihaz Yönetimi** - USB ve kablosuz cihazları otomatik algılama
- ⚡ **Hızlı Kontroller** - Tek tıkla yansıtma, ekran kaydı ve ekran görüntüsü alma
- 🎮 **Profesyonel Profiller** - Oyun (120FPS), Yayın ve Yüksek Kalite Kayıt için hazır ayarlar
- 🔔 **İnteraktif Bildirimler** - Tüm işlemler için gerçek zamanlı geri bildirim
- 🌐 **Çoklu Dil** - Türkçe ve İngilizce tam destek
- 🛠️ **Gelişmiş Yapılandırma** - Bit hızı, çözünürlük, kodekler (H.264, H.265, AV1) ve daha fazlası

### 🚀 Teknolojiler

- **Çekirdek**: [Tauri](https://tauri.app/) v2 (Rust backend)
- **Önyüz**: [React](https://react.dev/) 18 + TypeScript
- **Stil**: [Tailwind CSS](https://tailwindcss.com/)
- **Animasyonlar**: [Framer Motion](https://www.framer.com/motion/)
- **Durum Yönetimi**: [Zustand](https://zustand-demo.pmnd.rs/)

### 📦 Kurulum

#### Gereksinimler

1. [Node.js](https://nodejs.org/) (v18 veya üzeri)
2. [Rust](https://rustup.rs/) (Tauri için)
3. [ADB](https://developer.android.com/tools/adb) (Android Debug Bridge)
4. [scrcpy](https://github.com/Genymobile/scrcpy) (PATH'e eklenmiş olmalı)

#### Kaynaktan Derleme

```bash
# Depoyu klonlayın
git clone https://github.com/damnrightt/re-guiscrpy.git
cd re-guiscrpy

# Bağımlılıkları yükleyin
npm install

# Geliştirme modunda çalıştırın
npm run tauri dev

# Üretim için derleyin
npm run tauri build
```

---

<div align="center">

Made with ❤️ by [damnrightt](https://github.com/damnrightt)

</div>
