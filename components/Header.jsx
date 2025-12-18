import Link from 'next/link'
import Image from 'next/image'

export default function Header({ locale = 'ua' }) {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <div className="container-fluid d-flex align-items-center">
        <Image
          src="/logo.jpg"
          alt="MindSpark Logo"
          width={40}
          height={40}
          className="me-2 rounded"
        />

        <Link href={`/${locale}`} className="navbar-brand text-primary fw-bold">
          MindSpark
        </Link>

        <div className="d-flex ms-auto">
          <Link href={`/${locale}/about`} className="nav-link text-primary px-2">
            Про нас
          </Link>
          <Link href={`/${locale}/contact`} className="nav-link text-primary px-2">
            Контакти
          </Link>
        </div>
      </div>
    </header>
  )
}
