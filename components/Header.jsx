import Link from 'next/link'

export default function Header({ locale = 'ua' }) {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-700">
        MindSpark
      </div>

      <nav className="flex gap-6">
        <Link href={`/${locale}`}>Головна</Link>
        <Link href={`/${locale}/about`}>Про нас</Link>
        <Link href={`/${locale}/contact`}>Контакти</Link>
      </nav>
    </header>
  )
}
