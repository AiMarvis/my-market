import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import BottomNavigationBar from './components/BottomNavigationBar';
import FloatingActionButton from './components/FloatingActionButton';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'My Market App',
  description: 'Next.js Market Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-theme="valentine">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="pt-16 pb-16 min-h-screen">
          {children}
        </main>
        <FloatingActionButton />
        <BottomNavigationBar />
      </body>
    </html>
  );
}
