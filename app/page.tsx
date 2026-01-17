"use client";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [menus, setMenus] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [nomorAntrean, setNomorAntrean] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedMenus = localStorage.getItem('local_menus');
    if (savedMenus) setMenus(JSON.parse(savedMenus));
    const savedNumber = localStorage.getItem('antrean_number');
    setNomorAntrean(parseInt(savedNumber || '0'));
  }, []);

  const addToCart = (kue: any) => {
    const existing = cart.find(item => item.id === kue.id);
    if (existing) {
      setCart(cart.map(item => item.id === kue.id ? {...item, qty: item.qty + 1} : item));
    } else {
      setCart([...cart, { ...kue, qty: 1 }]);
    }
  };

  const handleCheckout = () => {
    const baru = nomorAntrean + 1;
    setNomorAntrean(baru);
    localStorage.setItem('antrean_number', baru.toString());
    setShowSuccess(true);
  };

  // Animasi Reveal untuk Judul
  const containerReveal = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const itemReveal = {
    hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="min-h-screen bg-white text-zinc-950 selection:bg-orange-100 selection:text-orange-600">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="pt-52 pb-24 px-6 max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={containerReveal}>
          <motion.span variants={itemReveal} className="text-orange-600 font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block italic">
            Premium Artisan Bakery
          </motion.span>
          
          <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-12 text-zinc-900 uppercase flex justify-center items-center gap-x-6 flex-wrap">
            <motion.span variants={itemReveal}>JAYA</motion.span>
            <motion.span variants={itemReveal} className="text-orange-500 italic font-extralight">CAKE</motion.span>
          </motion.h1>
          
          <motion.div variants={itemReveal} className="max-w-2xl mx-auto mb-16 px-4">
            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-medium">
              Selamat datang di <span className="text-zinc-900 font-bold border-b-2 border-orange-500/20">Jaya Cake</span>. Di sini kami percaya bahwa setiap potong kue memiliki cerita. Sebagai Premium Artisan Bakery, kami menjauhkan diri dari produksi massal. Setiap produk kami lahir dari tangan-tangan terampil yang mengutamakan ketelitian dan bahan baku berkualitas tinggi. Dari tekstur yang lembut hingga rasa yang autentik, tujuan kami hanya satu: menghadirkan kebahagiaan di setiap gigitan yang Anda nikmati.
            </p>
          </motion.div>

          <motion.div variants={itemReveal} className="bg-zinc-50 inline-flex items-center gap-4 px-10 py-4 rounded-full border border-zinc-200/60 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-zinc-900 font-bold text-xs md:text-sm uppercase tracking-[0.2em]">
              Antrean Saat Ini: <span className="text-orange-600 font-black ml-1">#{nomorAntrean}</span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- KATALOG MENU --- */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 py-10">
        {menus.map((kue) => (
          <motion.div key={kue.id} whileHover={{ y: -15 }} className="group">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl bg-zinc-50 border border-zinc-100">
              <img src={kue.gambar} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[3px]">
                <button onClick={() => addToCart(kue)} className="bg-white text-zinc-900 px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-orange-500 hover:text-white transition-all transform translate-y-6 group-hover:translate-y-0">
                  Tambah Pesanan
                </button>
              </div>
            </div>
            <div className="px-6 text-left">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight leading-none">{kue.nama}</h3>
                <span className="text-xl font-black text-orange-600">Rp{Number(kue.harga).toLocaleString()}</span>
              </div>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed line-clamp-2">{kue.deskripsi}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* --- FOOTER MODERN DENGAN LOGO RESMI --- */}
      <footer className="bg-zinc-950 text-white pt-32 pb-12 px-6 mt-40 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24 items-start">
            
            {/* Sosmed & Brand */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">JAYA<span className="text-orange-500">CAKE</span></h2>
                <p className="text-zinc-500 font-medium leading-relaxed max-w-sm text-lg">
                  Artisan bakery terbaik di Bali. Kami memadukan bahan organik premium dengan seni pembuatan kue tradisional.
                </p>
              </div>

              {/* LOGO SOSIAL MEDIA RESMI */}
              <div className="flex gap-6 pt-2">
                {[
                  { 
                    name: 'Instagram', 
                    label: '@jayacake_bali',
                    color: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  },
                  { 
                    name: 'TikTok', 
                    label: 'jayacake.bali',
                    color: 'hover:bg-white hover:text-black hover:border-white',
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  },
                  { 
                    name: 'WhatsApp', 
                    label: '0812-3456-789',
                    color: 'hover:bg-[#25D366] hover:border-[#25D366]',
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
                  }
                ].map((s) => (
                  <div key={s.name} className="group relative">
                    <a href="#" className={`w-16 h-16 bg-zinc-900 rounded-[22px] flex items-center justify-center transition-all duration-500 border border-zinc-800/50 shadow-2xl text-zinc-400 group-hover:text-white ${s.color}`}>
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {s.svg}
                      </div>
                    </a>
                    <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black py-2.5 px-5 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-2xl pointer-events-none whitespace-nowrap tracking-widest uppercase translate-y-2 group-hover:translate-y-0 z-50">
                      {s.label}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom Informasi */}
            <div className="lg:col-span-3 space-y-8 pt-2">
              <h4 className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px]">Information</h4>
              <div className="space-y-6 text-zinc-400 font-bold text-sm">
                <div className="space-y-2">
                  <p className="text-zinc-100 uppercase tracking-widest text-[11px]">Alamat</p>
                  <p>Jl. Tukad Pakerisan gang XV/B2,<br/>Denpasar, Bali - 80361</p>
                </div>
                <div className="space-y-2">
                  <p className="text-zinc-100 uppercase tracking-widest text-[11px]">Jam Buka</p>
                  <p>08:00 — 21:00 WITA</p>
                </div>
              </div>
            </div>

            {/* TEKS BALI ARTISTIK */}
            <div className="lg:col-span-4 flex lg:justify-end items-center">
              <div className="relative group cursor-default">
                <h2 className="text-[9rem] md:text-[12rem] font-black leading-none tracking-tighter text-transparent select-none opacity-10 group-hover:opacity-20 transition-opacity duration-1000" 
                    style={{ WebkitTextStroke: '2px #f97316' }}>
                  BALI
                </h2>
                <h2 className="absolute top-0 left-0 text-[9rem] md:text-[12rem] font-black leading-none tracking-tighter bg-gradient-to-br from-orange-400 via-orange-600 to-orange-800 bg-clip-text text-transparent select-none translate-x-3 translate-y-3 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-[1.5s] ease-out">
                  BALI
                </h2>
              </div>
            </div>
          </div>
          
          <div className="border-t border-zinc-900/50 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-800 font-bold uppercase text-[9px] tracking-[0.6em]">
              © 2026 JAYACAKE BALI — PURE ARTISAN
            </p>
            <span className="text-zinc-800 font-black text-[9px] tracking-[0.4em] uppercase">Premium Quality Guaranteed</span>
          </div>
        </div>
      </footer>

      {/* MODAL & KERANJANG */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 bg-zinc-950 z-[200] flex items-center justify-center text-center p-6 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <span className="text-orange-500 font-black text-sm uppercase tracking-[0.6em] mb-6 block">Pesanan Terkonfirmasi</span>
              <div className="text-[12rem] md:text-[18rem] font-black leading-none mb-12 text-white tracking-tighter">#{nomorAntrean}</div>
              <button onClick={() => { setShowSuccess(false); setCart([]); }} className="bg-white text-zinc-950 px-20 py-6 rounded-2xl font-black text-sm hover:bg-orange-500 hover:text-white transition-all shadow-2xl uppercase tracking-[0.3em]">Kembali</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {cart.length > 0 && !showSuccess && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-10 right-10 w-[90%] md:w-96 bg-zinc-900 text-white rounded-[2.5rem] p-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] z-50 border border-zinc-800/50 backdrop-blur-lg bg-opacity-95">
          <h4 className="font-black text-2xl mb-8 flex justify-between uppercase tracking-tighter italic">Keranjang <span className="text-orange-500">({cart.length})</span></h4>
          <div className="max-h-48 overflow-y-auto mb-8 pr-2 space-y-5 custom-scrollbar">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-base font-bold">
                <span className="text-zinc-100">{item.nama} <span className="text-orange-500 font-black ml-2">x{item.qty}</span></span>
                <span className="text-zinc-400">Rp{(item.harga * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <button onClick={handleCheckout} className="w-full bg-orange-600 text-white py-6 rounded-[1.5rem] font-black text-sm hover:bg-orange-500 transition-all shadow-xl uppercase tracking-[0.2em]">Checkout Sekarang</button>
        </motion.div>
      )}
    </main>
  );
}