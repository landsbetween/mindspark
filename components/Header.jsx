import Link from 'next/link'
import Image from 'next/image'

export default function Header({ locale = 'ua' }) {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <div className="container-fluid d-flex align-items-center">
        <Image
          src="/logo.png"
          alt="MindSpark Logo"
          width={55}
          height={50}
          className="me-2 rounded"
        />

        <Link
          href={`/${locale}`}
          className="navbar-brand fw-bold text-dark fs-2"
        >
          MindSpark
        </Link>

        <div className="d-flex ms-auto">
          <Link
            href={`/${locale}/about`}
            className="nav-link text-dark px-3 fs-5"
          >
            Про нас
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="nav-link text-dark px-3 fs-5"
          >
            Контакти
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="nav-link text-dark px-3 fs-5"
          >
            Блог
          </Link>
        </div>
      </div>
    </header>
  )
}
