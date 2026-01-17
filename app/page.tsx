"use client";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [nomorAntrean, setNomorAntrean] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // 10 DATA MENU PREMIUM PERMANEN
  const [menus] = useState<any[]>([
    {
      id: 1,
      nama: "Classic Butter Croissant",
      harga: 28000,
      gambar: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Pastry berlapis mentega premium dengan tekstur renyah di luar dan lembut di dalam."
    },
    {
      id: 2,
      nama: "Dark Chocolate Muffin",
      harga: 24000,
      gambar: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Muffin cokelat pekat yang moist dengan lelehan cokelat Belgia di setiap gigitan."
    },
    {
      id: 3,
      nama: "Strawberry Cheese Tart",
      harga: 35000,
      gambar: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Perpaduan sempurna krim keju lembut dan kesegaran buah stroberi pilihan."
    },
    {
      id: 4,
      nama: "Almond Pain au Chocolat",
      harga: 32000,
      gambar: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Pastry cokelat khas Perancis dengan taburan almond panggang yang gurih."
    },
    {
      id: 5,
      nama: "Matcha Glazed Donut",
      harga: 18000,
      gambar: "https://images.unsplash.com/photo-1612240498936-65f5101365d2?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Donat empuk dengan lapisan gula matcha Jepang asli yang aromatik."
    },
    {
      id: 6,
      nama: "Blueberry Cheesecake",
      harga: 48000,
      gambar: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Cheesecake lembut ala New York dengan saus blueberry kental yang segar."
    },
    {
      id: 7,
      nama: "Cinnamon Roll Glaze",
      harga: 26000,
      gambar: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Roti gulung kayu manis dengan aroma rempah yang menenangkan dan gula lumer."
    },
    {
      id: 8,
      nama: "Red Velvet Cake Slice",
      harga: 42000,
      gambar: "https://images.unsplash.com/photo-1586788680434-30d324671ff6?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Kue beludru merah legendaris dengan lapisan cream cheese yang ringan."
    },
    {
      id: 9,
      nama: "Fudgy Double Brownies",
      harga: 22000,
      gambar: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Brownies panggang padat dengan potongan cokelat ekstra yang melimpah."
    },
    {
      id: 10,
      nama: "Fruit Danish Pastry",
      harga: 30000,
      gambar: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Pastry renyah dengan isian vla vanilla dan buah-buahan tropis segar."
    }
  ]);

  useEffect(() => {
    setHasMounted(true);
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

  if (!hasMounted) return null;

  const containerReveal = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } as any
    }
  };

  const itemReveal = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
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
            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-medium text-center">
              Selamat datang di <span className="text-zinc-900 font-bold border-b-2 border-orange-500/20">Jaya Cake Bali</span>. Kemurnian rasa dalam setiap panggangan tradisional.
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

      {/* --- KATALOG MENU (10 MENU) --- */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 py-10">
        {menus.map((kue) => (
          <motion.div key={kue.id} whileHover={{ y: -15 }} className="group">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl bg-zinc-50 border border-zinc-100">
              <img src={kue.gambar} alt={kue.nama} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[3px]">
                <button onClick={() => addToCart(kue)} className="bg-white text-zinc-900 px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-orange-500 hover:text-white transition-all transform translate-y-6 group-hover:translate-y-0">
                  Tambah Pesanan
                </button>
              </div>
            </div>
            <div className="px-6 text-left">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight leading-none">{kue.nama}</h3>
                <span className="text-xl font-black text-orange-600">
                  Rp{Number(kue.harga).toLocaleString('id-ID')}
                </span>
              </div>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed line-clamp-2">{kue.deskripsi}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* --- FOOTER PREMIUM (DENGAN SOSMED AKTIF) --- */}
      <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 px-6 mt-40 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-start">
            
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                <h2 className="text-3xl font-black tracking-tighter uppercase italic">
                  JAYA<span className="text-[#ff5c00]">CAKE</span>
                </h2>
                <p className="text-zinc-500 font-medium leading-relaxed max-w-sm text-base">
                  Artisan bakery terbaik di Bali. Kami memadukan bahan organik premium dengan seni pembuatan kue tradisional.
                </p>
              </div>

              {/* SOSIAL MEDIA AKTIF */}
              <div className="flex gap-4 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center hover:bg-[#ff5c00] transition-all group">
                  <svg className="w-6 h-6 text-zinc-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center hover:bg-[#ff5c00] transition-all group">
                  <svg className="w-6 h-6 text-zinc-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.591.215 3.793.613a7.35 7.35 0 0 1-1.312 3.82c-.931.11-1.845.326-2.742.646l-.001 10.957c0 3.424-2.775 6.202-6.2 6.202a6.202 6.202 0 1 1 5.253-9.52l.001-4.733c2.09-.07 3.96-.867 5.34-2.18.23-.21.434-.44.622-.68.216-.275.408-.567.575-.873.167-.306.305-.623.414-.95.109-.327.186-.664.23-1.01.044-.346.062-.697.054-1.05l-.012-.496h-6.06l.001.002z"/></svg>
                </a>
                <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center hover:bg-[#ff5c00] transition-all group">
                  <svg className="w-6 h-6 text-zinc-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-10 pt-4 text-left">
              <h4 className="text-[#ff5c00] font-black uppercase tracking-[0.4em] text-[11px]">Information</h4>
              <div className="space-y-8 text-zinc-400 font-bold text-sm">
                <div className="space-y-3">
                  <p className="text-zinc-100 uppercase tracking-widest text-[10px]">Alamat</p>
                  <p className="leading-relaxed">Jl. Kenangan Manis No. 88,<br/>Denpasar, Bali - 80361</p>
                </div>
                <div className="space-y-3">
                  <p className="text-zinc-100 uppercase tracking-widest text-[10px]">Jam Buka</p>
                  <p>08:00 — 21:00 WITA</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end items-center relative">
               <h2 className="text-[9rem] md:text-[11rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-500/20 to-transparent tracking-tighter select-none">
                 BALI
               </h2>
            </div>
          </div>
          
          <div className="border-t border-zinc-900 pt-10 text-center">
            <p className="text-zinc-700 font-bold uppercase text-[10px] tracking-[0.5em]">
              © 2026 JAYACAKE BALI — PURE ARTISAN BAKERY
            </p>
          </div>
        </div>
      </footer>

      {/* MODAL SUCCESS & FLOATING CART */}
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
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-10 right-10 w-[90%] md:w-96 bg-zinc-900 text-white rounded-[2.5rem] p-10 shadow-2xl z-50 border border-zinc-800/50 backdrop-blur-lg">
          <h4 className="font-black text-2xl mb-8 flex justify-between uppercase tracking-tighter italic">Keranjang <span className="text-orange-500">({cart.length})</span></h4>
          <div className="max-h-48 overflow-y-auto mb-8 pr-2 space-y-5">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-base font-bold">
                <span className="text-zinc-100">{item.nama} <span className="text-orange-500 font-black ml-2">x{item.qty}</span></span>
                <span className="text-zinc-400">Rp{(item.harga * item.qty).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          <button onClick={handleCheckout} className="w-full bg-orange-600 text-white py-6 rounded-[1.5rem] font-black text-sm hover:bg-orange-500 transition-all shadow-xl uppercase tracking-[0.2em]">Checkout Sekarang</button>
        </motion.div>
      )}
    </main>
  );
}