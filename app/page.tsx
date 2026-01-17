"use client";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  // DATA MENU PERMANEN (Hardcoded)
  const [menus, setMenus] = useState<any[]>([
    {
      id: 1,
      nama: "Classic Butter Croissant",
      harga: 28000,
      gambar: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Pastry klasik Perancis dengan lapisan renyah dan aroma mentega premium yang kaya."
    },
    {
      id: 2,
      nama: "Dark Chocolate Muffin",
      harga: 24000,
      gambar: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Muffin cokelat pekat yang lembut dengan lelehan cokelat Belgia di dalamnya."
    },
    {
      id: 3,
      nama: "Strawberry Cheese Tart",
      harga: 35000,
      gambar: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Tart renyah dengan krim keju lembut dan topping buah stroberi segar Bali."
    },
    {
      id: 4,
      nama: "Almond Pain au Chocolat",
      harga: 32000,
      gambar: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Perpaduan cokelat batang berkualitas dan irisan almond panggang yang gurih."
    },
    {
      id: 5,
      nama: "Matcha Glazed Donut",
      harga: 18000,
      gambar: "https://images.unsplash.com/photo-1612240498936-65f5101365d2?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Donat artisan dengan lapisan matcha Jepang asli yang memberikan keseimbangan rasa manis-pahit."
    },
    {
      id: 6,
      nama: "Red Velvet Cake Slice",
      harga: 45000,
      gambar: "https://images.unsplash.com/photo-1586788680434-30d324671ff6?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Kue klasik berwarna merah beludru dengan lapisan cream cheese frosting yang ringan."
    },
    {
      id: 7,
      nama: "Cinnamon Roll Glaze",
      harga: 26000,
      gambar: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Roti gulung kayu manis aromatik dengan siraman gula cair yang lumer di mulut."
    },
    {
      id: 8,
      nama: "Blueberry Cheesecake",
      harga: 48000,
      gambar: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Cheesecake panggang ala New York dengan saus blueberry kental yang segar."
    },
    {
      id: 9,
      nama: "Double Choco Brownies",
      harga: 22000,
      gambar: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Brownies panggang dengan tekstur fudgy dan potongan cokelat ekstra di setiap gigitan."
    },
    {
      id: 10,
      nama: "Fruit Danish Pastry",
      harga: 30000,
      gambar: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
      deskripsi: "Pastry berlapis dengan custard vanilla dan potongan buah-buahan tropis segar."
    }
  ]);

  const [cart, setCart] = useState<any[]>([]);
  const [nomorAntrean, setNomorAntrean] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Tetap cek LocalStorage untuk sinkronisasi nomor antrean
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

  const containerReveal = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } as any
    }
  };

  const itemReveal = {
    hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1] as any 
      }
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
              Selamat datang di <span className="text-zinc-900 font-bold border-b-2 border-orange-500/20">Jaya Cake</span>. Kami mendedikasikan diri untuk memberikan pengalaman manis yang tak terlupakan di setiap gigitan.
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
                <span className="text-xl font-black text-orange-600">Rp{Number(kue.harga).toLocaleString('id-ID')}</span>
              </div>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed line-clamp-2">{kue.deskripsi}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-zinc-950 text-white pt-32 pb-12 px-6 mt-40 relative overflow-hidden text-left">
        {/* Konten footer sama seperti sebelumnya */}
        <div className="max-w-7xl mx-auto relative z-10 text-center">
           <p className="text-zinc-800 font-bold uppercase text-[9px] tracking-[0.6em]">
              © 2026 JAYACAKE BALI — PURE ARTISAN
           </p>
        </div>
      </footer>

      {/* MODAL SUCCESS & FLOATING CART */}
      {/* ... bagian modal dan cart tetap sama ... */}
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