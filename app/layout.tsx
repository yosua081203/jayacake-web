import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// GANTI BAGIAN INI UNTUK MENGUBAH NAMA DI TAB BROWSER
export const metadata: Metadata = {
  title: "Jaya Cake Bali",
  description: "Menyajikan kelezatan artisan bakery terbaik di Denpasar, Bali. Setiap kue dibuat dengan cinta dan bahan berkualitas tinggi.",
  icons: {
    icon: "/favicon.ico", // Pastikan Anda punya file icon di folder public jika ingin ganti logo kecilnya
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}