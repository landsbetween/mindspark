import { Poppins, Archivo_Black, Roboto_Mono } from "next/font/google";
import {
  Inter,
  // Manrope,
  // IBM_Plex_Sans,
  // Source_Sans_3,
  // Noto_Sans,
  // Open_Sans,
  // Montserrat,
  // Rubik,
} from "next/font/google";


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

// const robotoMono = Roboto_Mono({
//   subsets: ["latin", "cyrillic"],
//   weight: ["400", "500", "700"],
//   display: "swap",
//   variable: "--font-ua",
// });

const robotoMono = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-ua",
});

// const manrope = Manrope({
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "500"],
//   display: "swap",
//   variable: "--font-manrope",
// });

// const ibmPlexSans = IBM_Plex_Sans({
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "500"],
//   display: "swap",
//   variable: "--font-ibm",
// });

// const sourceSans3 = Source_Sans_3({
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "500"],
//   display: "swap",
//   variable: "--font-source",
// });

// const notoSans = Noto_Sans({
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "500"],
//   display: "swap",
//   variable: "--font-noto",
// });

// const openSans = Open_Sans({
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "500"],
//   display: "swap",
//   variable: "--font-open",
// });

// const montserrat = Montserrat({
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "500"],
//   display: "swap",
//   variable: "--font-montserrat",
// });


// const rubik = Rubik({
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "500"],
//   display: "swap",
//   variable: "--font-rubik",
// });


export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <body className={`${poppins.variable} ${archivoBlack.variable} ${robotoMono.variable}`}>

        {children}
      </body>
    </html>
  );
}
