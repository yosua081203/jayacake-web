"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border-2 border-zinc-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] rounded-[35px] px-10 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-amber-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg rotate-3 group-hover:rotate-12 transition-transform">
            J
          </div>
          <span className="font-black text-2xl text-zinc-900 tracking-tighter uppercase">
            Jaya<span className="text-amber-600">Cake</span>
          </span>
        </Link>

        {/* Menu Navigasi */}
        <div className="flex items-center space-x-2 bg-zinc-100/50 p-2 rounded-2xl border border-zinc-200">
          <Link 
            href="/" 
            className={`px-8 py-3 rounded-xl font-black text-xs transition-all uppercase tracking-widest ${pathname === '/' ? 'bg-zinc-900 text-white shadow-xl' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Toko
          </Link>
          <Link 
            href="/admin" 
            className={`px-8 py-3 rounded-xl font-black text-xs transition-all uppercase tracking-widest ${pathname === '/admin' ? 'bg-amber-600 text-white shadow-xl' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}