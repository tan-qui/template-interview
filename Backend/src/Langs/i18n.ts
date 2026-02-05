
import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, ''),
  defaultLocale: 'en',
  queryParameter: 'lang',
  autoReload: true,
  updateFiles: false,
});

export default i18n;
