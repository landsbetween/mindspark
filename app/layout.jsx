import { Poppins, Archivo_Black, Roboto_Mono } from "next/font/google";

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

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
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
