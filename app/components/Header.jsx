import Link from "next/link";

export default function Header() {
  return (
    <header className="p-6 border-b">
      <nav className="flex gap-6">
        <Link href="/">Головна</Link>
        <Link href="/about">Про нас</Link>
        <Link href="/contact">Контакти</Link>
      </nav>
    </header>
  );
}
