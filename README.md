# ReGUI Scrpy

<div align="center">

![ReGUI Scrpy Logo](https://img.shields.io/badge/ReGUI-Scrpy-06b6d4?style=for-the-badge&logo=android&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![Downloads](https://img.shields.io/github/downloads/damnrightt/re-guiscrpy/total?style=for-the-badge&color=green)
[![License](https://img.shields.io/badge/license-Apache--2.0-orange?style=for-the-badge)](LICENSE)

**Modern, Beautiful, and Powerful GUI for scrcpy**
*Mirror your Android device with style*

[English](#english) | [Türkçe](#türkçe)

</div>

---

## English

### 📥 Download & Install

**Recommended: Portable Version (No Installation Required)**
Download the **`ReGUI-Scrpy-Portable-v1.0.0.zip`** from the releases page to get everything you need (included scrcpy) in a single package.

**[👉 Download Latest Version](https://github.com/damnrightt/re-guiscrpy/releases/latest)**

1. Download the Portable Zip.
2. Extract it to a folder.
3. Run `ReGUI-Scrpy.exe`.

> **Note**: If you download the setup `.exe` or `.msi` instead, you must have [ADB](https://developer.android.com/tools/adb) and [scrcpy](https://github.com/Genymobile/scrcpy) installed on your system separately.

### ✨ Features

- 🎨 **Modern Glassmorphism UI** - Beautiful dark theme with smooth animations and neon effects
- 📱 **Smart Device Management** - Auto-detect USB and wireless devices
- ⚡ **Quick Controls** - Start/stop mirroring, screen recording, and screenshots with one click
- 🎮 **Pro Profiles** - Pre-configured profiles for Gaming (120FPS), Streaming, and High Quality Recording
- 🔔 **Interactive Notifications** - Real-time feedback for all actions
- 🌐 **Multi-language** - Full support for English and Turkish
- 🛠️ **Advanced Configuration** - Fine-tune bitrate, resolution, codecs (H.264, H.265, AV1), and more

### 📖 How to Use

#### 1. Connect via USB
1. Enable **USB Debugging** on your Android device settings.
2. Connect your device via USB cable.
3. The device should appear automatically in the "Devices" list.
4. Select the device and click **Start Mirroring**.

#### 2. Wireless Connection
1. Connect your device via USB first.
2. Go to the "Wireless Connect" section in Dashboard.
3. Make sure your PC and phone are on the same Wi-Fi network.
4. Click **Connect** (This runs `adb tcpip 5555`).
5. Disconnect the USB cable.
6. Enter your phone's local IP address (e.g., `192.168.1.X`) and click Connect.

#### 3. Recording & Screenshots
- Use the **Control Panel** to take instant screenshots or start screen recording.
- Recordings are saved to your user folder by default.

---

## Türkçe

### 📥 İndir ve Kur

**Önerilen: Taşınabilir Sürüm (Kurulum Gerektirmez)**
Releases sayfasından **`ReGUI-Scrpy-Portable-v1.0.0.zip`** dosyasını indirin. İçerisinde ihtiyacınız olan her şey (scrcpy dahil) mevcuttur.

**[👉 Son Sürümü İndir](https://github.com/damnrightt/re-guiscrpy/releases/latest)**

1. Portable Zip dosyasını indirin.
2. Bir klasöre çıkartın.
3. `ReGUI-Scrpy.exe` uygulamasını çalıştırın.

> **Not**: Eğer kurulum dosyasını (.exe veya .msi) indirirseniz, sisteminizde ayrıca [ADB](https://developer.android.com/tools/adb) ve [scrcpy](https://github.com/Genymobile/scrcpy) kurulu olmalıdır.

### ✨ Özellikler

- 🎨 **Modern Glassmorphism Arayüz** - Akıcı animasyonlar ve neon efektleriyle şık karanlık tema
- 📱 **Akıllı Cihaz Yönetimi** - USB ve kablosuz cihazları otomatik algılama
- ⚡ **Hızlı Kontroller** - Tek tıkla yansıtma, ekran kaydı ve ekran görüntüsü alma
- 🎮 **Profesyonel Profiller** - Oyun (120FPS), Yayın ve Yüksek Kalite Kayıt için hazır ayarlar
- 🔔 **İnteraktif Bildirimler** - Tüm işlemler için gerçek zamanlı geri bildirim
- 🌐 **Çoklu Dil** - Türkçe ve İngilizce tam destek
- 🛠️ **Gelişmiş Yapılandırma** - Bit hızı, çözünürlük, kodekler (H.264, H.265, AV1) ve daha fazlası

### 📖 Nasıl Kullanılır?

#### 1. USB ile Bağlantı
1. Android telefonunuzda **USB Hata Ayıklama** (USB Debugging) modunu açın.
2. Telefonu USB ile bilgisayara bağlayın.
3. Cihazınız "Cihazlar" listesinde otomatik olarak görünecektir.
4. Cihazı seçin ve **Başlat** butonuna tıklayın.

#### 2. Kablosuz Bağlantı
1. Önce cihazı USB ile bağlayın.
2. Dashboard'daki "Kablosuz Bağlantı" bölümüne gidin.
3. PC ve telefonun aynı Wi-Fi ağında olduğundan emin olun.
4. **Bağlan** butonuna tıklayın (Bu işlem `adb tcpip 5555` komutunu çalıştırır).
5. USB kablosunu çıkarın.
6. Telefonun IP adresini girin (örn: `192.168.1.X`) ve bağlanın.

#### 3. Kayıt ve Ekran Görüntüsü
- **Kontrol Paneli** üzerinden anlık ekran görüntüsü alabilir veya video kaydı başlatabilirsiniz.
- Kayıtlar varsayılan olarak kullanıcı klasörünüze kaydedilir.

---

### 👨‍💻 Geliştiriciler İçin (Build from Source)

```bash
# Depoyu klonlayın
git clone https://github.com/damnrightt/re-guiscrpy.git
cd re-guiscrpy

# Bağımlılıkları yükleyin
npm install

# Geliştirme modunda çalıştırın
npm run tauri dev

# Exe oluşturun
npm run tauri build
```

<div align="center">

Made with ❤️ by [damnrightt](https://github.com/damnrightt)

</div>
