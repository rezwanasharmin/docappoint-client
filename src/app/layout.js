import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: { default: "DocAppoint — Find & Book Doctors", template: "%s | DocAppoint" },
  description: "Browse verified doctors, view profiles, and book appointments instantly.",
  openGraph: { title: "DocAppoint", description: "Doctor appointment booking made simple." },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

