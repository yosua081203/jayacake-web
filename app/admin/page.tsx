"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [menus, setMenus] = useState<any[]>([]);
  const [form, setForm] = useState({ id: 0, nama: '', harga: '', deskripsi: '', gambar: '', tag: 'New' });

  const ADMIN_PASSWORD = "adminjaya2026"; 

  useEffect(() => {
    const savedMenus = localStorage.getItem('local_menus');
    if (savedMenus) setMenus(JSON.parse(savedMenus));
  }, []);

  // Fungsi Convert Gambar ke Base64 (Agar bisa upload file)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, gambar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setIsLoggedIn(true);
    else alert("Password Salah!");
  };

  const saveToLocal = (updatedMenus: any[]) => {
    setMenus(updatedMenus);
    localStorage.setItem('local_menus', JSON.stringify(updatedMenus));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.gambar) return alert("Mohon upload foto kue terlebih dahulu!");
    const newMenu = { ...form, id: form.id || Date.now() };
    const updated = form.id ? menus.map(m => m.id === form.id ? newMenu : m) : [...menus, newMenu];
    saveToLocal(updated);
    setForm({ id: 0, nama: '', harga: '', deskripsi: '', gambar: '', tag: 'New' });
    alert("Menu Berhasil Disimpan!");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[40px] shadow-xl max-w-sm w-full border border-stone-200">
          <h1 className="text-3xl font-black text-stone-900 mb-2">Admin Login</h1>
          <p className="text-stone-600 mb-8 font-medium">Masukkan kata sandi untuk akses dashboard.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" placeholder="Password" 
              className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-amber-600 text-stone-900 font-bold"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black hover:bg-black transition shadow-lg">MASUK</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-20 px-6">
      <Navbar />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* FORM PANEL */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[40px] shadow-md border border-stone-200 sticky top-32">
            <h2 className="text-2xl font-black text-stone-900 mb-6 underline decoration-amber-500">Kelola Menu</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-stone-500 uppercase ml-1">Nama Produk</label>
                <input type="text" placeholder="Contoh: Nastar Keju" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 font-bold outline-none focus:border-amber-600" required />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-black text-stone-500 uppercase ml-1">Harga (Rp)</label>
                <input type="number" placeholder="Contoh: 50000" value={form.harga} onChange={e => setForm({...form, harga: e.target.value})} className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 font-bold outline-none focus:border-amber-600" required />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-stone-500 uppercase ml-1">Foto Produk</label>
                <div className="relative w-full h-32 bg-stone-100 border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center overflow-hidden">
                  {form.gambar ? (
                    <img src={form.gambar} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-stone-400 text-xs font-bold text-center p-2">Klik untuk Pilih Foto</span>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-stone-500 uppercase ml-1">Deskripsi</label>
                <textarea placeholder="Penjelasan singkat..." value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})} className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 font-medium h-24 outline-none focus:border-amber-600" required />
              </div>

              <button className="w-full py-5 bg-amber-600 text-white rounded-[22px] font-black shadow-lg shadow-amber-200 hover:bg-amber-700 transition-all active:scale-95">SIMPAN MENU</button>
            </form>
          </div>
        </div>

        {/* LIST PANEL */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-black text-stone-900">Daftar Menu Aktif <span className="text-amber-600">({menus.length})</span></h2>
          <div className="grid grid-cols-1 gap-4">
            {menus.map(m => (
              <div key={m.id} className="bg-white p-5 rounded-[32px] border border-stone-200 flex items-center gap-6 shadow-sm hover:shadow-md transition">
                <img src={m.gambar} className="w-24 h-24 object-cover rounded-2xl border border-stone-100" />
                <div className="flex-1">
                  <h4 className="font-black text-xl text-stone-900 uppercase tracking-tight">{m.nama}</h4>
                  <p className="text-amber-600 font-black text-lg">Rp {Number(m.harga).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setForm(m)} className="px-4 py-2 bg-stone-100 text-stone-900 rounded-xl font-black text-xs hover:bg-amber-100">EDIT</button>
                  <button onClick={() => saveToLocal(menus.filter(x => x.id !== m.id))} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-black text-xs hover:bg-red-100">HAPUS</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}