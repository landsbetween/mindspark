import { Poppins, Archivo_Black, Russo_One } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin", 'cyrillic'],
  weight: ["400"],
  display: "swap",
  variable: "--font-poppins",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-archivo",
});

const russoOne = Russo_One({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  display: "swap",
  variable: "--font-russo",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <body className={`${poppins.variable} ${archivoBlack.variable} ${russoOne.variable}`}>
        {children}
      </body>
    </html>
  );
}
