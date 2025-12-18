import { messages } from './messages'

export function t(locale, key) {
  return messages[locale]?.[key] ?? key
}
