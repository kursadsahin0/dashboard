# Dashboard Projesi

Bu proje, gerçek zamanlı veri takibi ve kullanıcı yönetimi sağlayan modern bir dashboard uygulamasıdır.

## Özellikler

- 📊 Gerçek zamanlı veri görselleştirme
- 👥 Kullanıcı yönetimi (CRUD işlemleri)
- 📅 Tarih ve saat bazlı veri filtreleme
- 🎨 Modern ve responsive tasarım
- 🔄 Otomatik veri güncelleme (5 saniyede bir)
- 🌓 Koyu tema

## Teknolojiler

- Next.js
- React
- Redux Toolkit
- Firebase Realtime Database
- React Icons
- CSS Modules

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [proje-url]
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Firebase yapılandırmasını oluşturun:
   - Firebase Console'dan yeni bir proje oluşturun
   - Realtime Database'i etkinleştirin
   - Firebase yapılandırma bilgilerinizi `.env.local` dosyasına ekleyin:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
```

4. Uygulamayı başlatın:
```bash
npm run dev
```

## Kullanım

### Dashboard

- Ana sayfada gerçek zamanlı veri grafiğini görüntüleyebilirsiniz
- Tarih ve saat filtreleri ile verileri filtreleyebilirsiniz
- "Kullanıcı Yönetimi" butonu ile CRUD sayfasına geçiş yapabilirsiniz

### Kullanıcı Yönetimi

- Yeni kullanıcı ekleyebilirsiniz
- Mevcut kullanıcıları düzenleyebilirsiniz
- Kullanıcıları silebilirsiniz
- Kullanıcı listesini görüntüleyebilirsiniz

## Responsive Tasarım

- Desktop, tablet ve mobil cihazlarda uyumlu görünüm
- Mobil görünümde optimize edilmiş butonlar ve layout
- Esnek grid sistemi

## Performans Özellikleri

- Optimize edilmiş render işlemleri
- Verimli state yönetimi
- Sayfa yüklemelerinde smooth geçişler
- Minimal ve optimize edilmiş CSS

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/YeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/YeniOzellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakınız.
