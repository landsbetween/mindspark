import { Poppins, Archivo_Black, Inter } from "next/font/google";

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

const robotoMono = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-ua",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <body className={`${poppins.variable} ${archivoBlack.variable} ${robotoMono.variable}`}>

        {children}
      </body>
    </html>
  );
}
