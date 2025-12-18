import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Лівий логотип */}
      <div className="text-2xl font-bold text-blue-700">
        MindSpark
      </div>

      {/* Праве меню */}
      <nav className="flex gap-6">
        <Link href="/">Головна</Link>
        <Link href="/about">Про нас</Link>
        <Link href="/contact">Контакти</Link>
      </nav>
    </header>
  );
}
