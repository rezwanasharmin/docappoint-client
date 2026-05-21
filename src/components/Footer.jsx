"use client";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 text-3xl font-bold">
              <span className="text-blue-400 text-4xl">⚕</span>
              <span>DocAppoint</span>
            </Link>
            <p className="text-blue-100/80 max-w-xs">
              Connecting Patients with Trusted Doctors Across Dhaka. Your health, our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-blue-300">Quick Links</h3>
            <ul className="space-y-3 text-blue-100">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/all-appointments" className="hover:text-white transition">All Doctors</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">My Dashboard</Link></li>
              <li><Link href="/doctors" className="hover:text-white transition">Find Specialists</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-blue-300">Our Services</h3>
            <ul className="space-y-3 text-blue-100">
              <li>Online Appointment</li>
              <li>Doctor Consultation</li>
              <li>Patient Reviews</li>
              <li>24/7 Support</li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold mb-5 text-blue-400">Contact Us</h3>
            
            <div className="space-y-4 text-blue-100">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-blue-400" />
                <span>support@docappoint.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-blue-400" />
                <span>+880 1711-234567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-400" />
                <span>Mirpur, Dhaka, Bangladesh</span>
              </div>
            </div>

            
            <div className="mt-8">
              <h4 className="text-blue-300 mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all hover:scale-110">📘</a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all hover:scale-110">𝕏</a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-pink-500 rounded-full flex items-center justify-center transition-all hover:scale-110">📷</a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-500 rounded-full flex items-center justify-center transition-all hover:scale-110">▶️</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="border-t border-blue-800 bg-black/30 py-6 text-center text-sm text-blue-200">
        © {new Date().getFullYear()} DocAppoint. All Rights Reserved. 
        <span className="mx-2">•</span>
        Made with ❤️ in Bangladesh
      </div>
    </footer>
  );
}