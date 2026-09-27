# 📖 Digital Photobook

Photobook digital dengan animasi flip 3D.

---

## 📸 Cara Menambahkan Foto

### Cover

Taruh 1 foto di `assets/cover.jpg`.

Nama **harus** `cover.jpg` (huruf kecil).

### Foto Halaman

Taruh foto di dalam folder `assets/page-1/` sampai `assets/page-14/`.

Nama file bebas. Contoh isi `assets/page-1/`:

```
assets/page-1/
├── foto1.jpg
├── foto2.png
└── foto3.webp
```

Sistem otomatis membaca semua gambar di folder dan menampilkannya.

**Format yang didukung:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`

**Jumlah foto per halaman:** bebas. 4 foto = grid 2×2, lainnya = grid 2 kolom.

**Urutan foto:** berdasarkan nama file (A–Z). Kalau mau urutan tertentu, beri angka di depan: `01-foto.jpg`, `02-foto.jpg`, dst.

---

## 🎨 Ukuran Foto

| Foto | Ukuran |
|---|---|
| Cover | 800 × 800 px |
| Halaman | 600 × 600 px |

Ukuran file di bawah 300 KB biar cepat.

---

## 🚀 Cara Menjalankan

Buka terminal di folder project, lalu jalankan:

```bash
python -m http.server 8000
```

Buka browser ke `http://localhost:8000`.

> ⚠️ **Wajib pakai local server.** Kalau langsung double-click `index.html`, foto tidak akan muncul.

**Alternatif:**
- `npx serve`
- VS Code + ekstensi Live Server

---

## 🔄 Ganti / Tambah / Hapus Foto

Tinggal edit file di folder `assets/`. Refresh browser. Selesai.

Tidak perlu edit kode apa pun.

---

## ✏️ Ubah Teks & Emoji

Buka `js/data.js`.

- **Teks halaman:** array `pageTexts`
- **Emoji sticker:** array `pageStickers`

---

## 🎯 Navigasi

| Aksi | Cara |
|---|---|
| Halaman berikutnya | Klik sisi kanan |
| Halaman sebelumnya | Klik sisi kiri |
| Kembali ke cover | Klik tombol di halaman terakhir |
| Reset cepat | Klik cover saat buku terbuka |

---

## ⚠️ Catatan

1. **Wajib local server.** Browser tidak bisa baca folder via `file://`.
2. **Nama folder huruf kecil.** `page-1` bukan `Page-1`.
3. **Folder kosong tidak masalah.** Halaman tetap tampil tanpa foto.
4. **Server yang didukung:** Python, npx serve, Live Server, Apache.

---

## 📋 Checklist

- [ ] Foto di `assets/cover.jpg`
- [ ] Folder `assets/page-1/` sampai `assets/page-14/` sudah dibuat
- [ ] Foto sudah dimasukkan ke folder masing-masing
- [ ] Jalankan `python -m http.server 8000`
- [ ] Buka `http://localhost:8000`
