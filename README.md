# Ipi Bouquet - Artisanal Floral E-Commerce

Petals & Poetry adalah platform e-commerce modern yang dikembangkan khusus untuk toko bunga premium (_high-end boutique florist_). Website ini menyajikan pengalaman visual yang elegan, kurasi koleksi bunga musiman, dan sistem pemesanan yang seamless.

Proyek ini dibangun menggunakan arsitektur **Monorepo** dengan **React.js** di sisi frontend dan **Express.js** di sisi backend.

---

## 🚀 Fitur Utama

- **Desain Editorial Premium**: Tampilan visual minimalis, anggun, dan responsif menggunakan Tailwind CSS.
- **Katalog Koleksi Musiman**: Manajemen produk bunga berdasarkan musim dan tema (_The Summer Collection_).
- **Smooth Visual Experience**: Efek transisi sinematik, _soft-focus backdrops_, dan optimasi aset gambar menggunakan format `.webp`.
- **RESTful API**: Integrasi backend Express.js yang cepat dan terstruktur menggunakan arsitektur MVC (Model-View-Controller).

---

## 📁 Struktur Folder (Monorepo)

```text
petals-poetry/
├── backend/               # Server & Logika Bisnis (Express.js)
│   ├── config/            # Koneksi Database & Konfigurasi .env
│   ├── controllers/       # Logika Bisnis / Handling Request API
│   ├── middleware/        # Custom Middleware (Auth, Validasi, dll.)
│   ├── models/            # Skema Database (MySQL / Mongoose)
│   ├── routes/            # Definisi Endpoint API (/api/v1/...)
│   └── index.js           # Entry Point Utama Server
│
├── frontend/              # Antarmuka Pengguna / UI (React.js + Vite + Tailwind)
│   ├── public/            # Aset Statis Publik (Images, Favicon)
│   └── src/
│       ├── components/    # Komponen Reusable (Navbar, Sidebar, Detail)
│       ├── pages/         # Komponen Halaman Utama (Home, Shop, About, Gallery, Order, Login, Register, Panel Admin)
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── .gitignore
└── README.md
```
