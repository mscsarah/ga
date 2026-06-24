# حكايات العراق — تطبيق Android (Capacitor)

تغليف منصة «حكايات العراق» (ملف `index.html` في جذر المستودع) داخل تطبيق Android
أصلي عبر **Capacitor**. التطبيق يحزم ملفات الويب داخله، فيعمل **دون اتصال بالكامل**
وبيانات المستخدم تُحفظ محلياً — وهذا مناسب لقبول Google Play (تطبيق بمزايا حقيقية،
وليس مجرّد فتح لموقع).

- **مُعرّف التطبيق:** `iq.hikayat.app`
- **الاسم:** حكايات العراق
- **الإصدار:** 1.0.0 (versionCode 1)
- **أدنى أندرويد:** 7.0 (API 24) — الهدف API 36

---

## 🚀 الطريقة الأسهل للحصول على APK (بدون تثبيت أي شيء)

1. ادخل إلى مستودعك على GitHub ← تبويب **Actions**.
2. اختر workflow باسم **Build Android App** ← اضغط **Run workflow**.
3. انتظر انتهاء البناء (~3–5 دقائق)، ثم نزّل الناتج من قسم **Artifacts**:
   - `hikayat-aliraq-APK` ← ملف `.apk` جاهز للتثبيت على الهاتف مباشرة (للتجربة/التوزيع المباشر).
   - `hikayat-aliraq-AAB` ← ملف `.aab` للرفع على Google Play.

> هذا يبني التطبيق على خوادم GitHub التي تملك Android SDK كاملاً.

---

## 💻 البناء محلياً (إن رغبت)

المتطلبات: Node.js 18+، JDK 17/21، و**Android SDK** (عبر Android Studio).

```bash
cd mobile
npm install
npm run sync           # ينسخ الويب إلى www ثم يزامن المشروع الأصلي
npm run build:apk      # ينتج APK تجريبي
# الناتج: mobile/android/app/build/outputs/apk/debug/app-debug.apk
```

لفتح المشروع في Android Studio: `npm run open` ثم Build > Build APK / Generate Signed Bundle.

---

## 🏪 النشر على Google Play (خطوات مختصرة)

1. **حساب مطوّر** على [play.google.com/console](https://play.google.com/console) (رسوم لمرة واحدة).
2. أنشئ تطبيقاً جديداً، واملأ: الاسم، الوصف، لقطات الشاشة، أيقونة 512×512، صورة 1024×500.
3. فعّل **Play App Signing** (مُوصى به): ترفع `.aab` وتوقّعه Google تلقائياً، فتحتاج فقط
   **مفتاح رفع (upload key)** تنشئه مرة واحدة:
   ```bash
   keytool -genkey -v -keystore upload.keystore -alias upload \
     -keyalg RSA -keysize 2048 -validity 9125
   ```
4. وقّع الـ AAB بمفتاح الرفع (أو استخدم Android Studio: *Generate Signed Bundle*).
5. ارفع `app-release.aab` في مسار **Production** (أو Internal testing أولاً).
6. أكمل بطاقات: سياسة الخصوصية، تصنيف المحتوى، الجمهور المستهدف، أمان البيانات.

### ملاحظات مهمة لقبول التطبيق
- التطبيق يعمل دون اتصال ويخزّن البيانات محلياً (LocalStorage) — لا يجمع بيانات شخصية،
  وضّح ذلك في قسم **Data safety**.
- حدّث `versionCode` (+1) و`versionName` في `android/app/build.gradle` قبل كل رفع جديد.
- لأيقونة احترافية بدقّة كاملة: استبدل أيقونة الـ vector الحالية بصورة 1024×1024 وولّد
  الموارد عبر:
  ```bash
  npm i -D @capacitor/assets
  npx capacitor-assets generate --android   # يحتاج assets/icon.png و assets/splash.png
  ```

---

## 🔧 تحديث محتوى التطبيق لاحقاً
عدّل `index.html` في جذر المستودع فقط، ثم أعد تشغيل الـ workflow (أو `npm run sync`).
الملف هو **المصدر الوحيد**؛ ومجلد `www/` يُحدَّث تلقائياً.
