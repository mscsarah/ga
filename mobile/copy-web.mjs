// ينسخ ملفات الويب (المصدر الوحيد في جذر المستودع) إلى مجلد www قبل المزامنة
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const www = join(here, 'www');
mkdirSync(www, { recursive: true });

for (const f of ['index.html', 'sw.js']) {
  const src = join(root, f);
  if (existsSync(src)) { copyFileSync(src, join(www, f)); console.log('✓ نُسخ', f); }
  else console.warn('⚠ غير موجود:', f);
}
console.log('تمت مزامنة ملفات الويب إلى www/');
