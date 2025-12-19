import { messages } from './messages'

export function t(locale, key) {
  const normalizedLocale = locale === 'en' ? 'en' : 'ua';
  return messages[normalizedLocale]?.[key] ?? key;
}