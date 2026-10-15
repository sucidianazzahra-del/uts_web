# Dokumentasi Website Portofolio — Suci Dian Azzahra

> **Nama:** Suci Dian Azzahra
> **NIM:** D0425309
> **Fakultas:** FKIP (Keguruan dan Ilmu Pendidikan)
> **Program Studi:** Pendidikan Teknologi Informasi
> **Universitas:** Universitas Sulawesi Barat
> **Tema Website:** Portofolio Pribadi
> **Teknologi:** HTML, CSS, Bootstrap 5, JavaScript

Dokumen ini menjelaskan **struktur file**, **fungsi setiap halaman**, **komponen Bootstrap 5 yang dipakai**, dan **cara kerja JavaScript validasi login** — supaya kamu bisa memahami dan mempertanggungjawabkan kode saat ditanya dosen.

---

## 1. Struktur Folder

```
suci/                          (folder root proyek)
├── index.html                 → Halaman Beranda
├── projects.html              → Halaman Daftar Konten (daftar proyek + filter)
├── detail.html                → Halaman Detail (studi kasus 1 proyek)
├── about.html                 → Halaman Tentang / Profil
├── login.html                 → Halaman Login + validasi JavaScript
│
├── css/
│   └── style.css              → Gaya kustom (warna, kartu, hero, footer, dll)
│
├── js/
│   ├── main.js                → JavaScript bersama (tahun footer, menu aktif, tombol ke atas)
│   └── login.js               → JavaScript khusus validasi form login
│
├── img/
│   ├── avatar.svg             → Ilustrasi foto profil
│   ├── project-1.svg ... project-6.svg   → Thumbnail 6 proyek
│
└── dokumentasi.md             → File ini
```

**Kenapa dipisah per folder?**
Agar kode rapi: HTML di root, gaya di `css/`, skrip di `js/`, gambar di `img/`. Ini memudahkan perawatan dan standar umum sebuah website.

---

## 2. Halaman-Halaman dan Perannya

| No | File | Jenis Halaman | Isi Utama |
|----|------|---------------|-----------|
| 1 | `index.html` | Beranda | Hero perkenalan, statistik, bidang keahlian, skill bar, proyek unggulan, CTA |
| 2 | `projects.html` | Daftar Konten | 6 kartu proyek + tombol filter kategori (Semua/Web/Desain/Multimedia/Data/Video) |
| 3 | `detail.html` | Detail | Studi kasus "Website Portofolio Pribadi": latar belakang, tujuan, fitur, accordion proses, sidebar info & teknologi |
| 4 | `about.html` | Tentang/Profil | Biodata, perkenalan, riwayat pendidikan, minat & keahlian, form kontak (demo) |
| 5 | `login.html` | Login | Form email + password dengan validasi JavaScript dan alert Bootstrap |

Semua halaman dihubungkan oleh **navbar** yang sama (di atas) dan **footer** yang sama (di bawah), sehingga navigasi konsisten.

---

## 3. Komponen Bootstrap 5 yang Digunakan

Sesuai ketentuan tugas, beberapa komponen Bootstrap 5 diterapkan:

| Komponen | Kelas Bootstrap | Dipakai Di |
|----------|-----------------|------------|
| **Navbar** responsif | `navbar`, `navbar-expand-lg`, `collapse`, `navbar-toggler` | Semua halaman |
| **Grid system** | `container`, `row`, `col-lg-*`, `col-md-*` | Semua halaman |
| **Button** | `btn`, `btn-primary`, `btn-outline-primary`, `btn-sm`, `btn-lg` | Semua halaman |
| **Card** | `card`, `card-body`, `card-title`, `card-text` | index, projects, detail, about |
| **Badge** | `badge`, `badge-soft` (kustom) | index, projects, detail |
| **Alert** | `alert`, `alert-danger`, `alert-success` | login (via JavaScript) |
| **Form** | `form-control`, `input-group`, `form-label`, `invalid-feedback` | login, about |
| **Accordion** | `accordion`, `accordion-item`, `accordion-collapse` | detail |
| **List Group** | `list-group`, `list-group-item` | about |
| **Breadcrumb** | `breadcrumb` | detail |
| **Progress bar** | `progress`, `progress-bar`, `skill-bar` (kustom) | index, about |
| **Icons** | Bootstrap Icons (`bi bi-*`) | Semua halaman |

**Cara memuat Bootstrap 5 (CDN):** diletakkan di bagian `<head>` setiap halaman:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
```
Dan JavaScript Bootstrap (untuk navbar collapse, accordion, dll) diletakkan sebelum `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

---

## 4. `css/style.css` — Gaya Kustom

File ini menimpa (override) warna dan gaya bawaan Bootstrap agar punya identitas visual tersendiri.

- **Variabel warna** (`:root`) — warna ungu utama `--suci-primary: #6d28d9`, aksen kuning `--suci-accent: #f59e0b`. Ganti di sini untuk mengubah seluruh tema.
- `.hero` — bagian pembuka dengan gradien ungu.
- `.card-hover` — efek kartu terangkat saat kursor diarahkan.
- `.portfolio-thumb` — menyamakan ukuran semua gambar proyek (tinggi 200px, `object-fit: cover`).
- `.skill-bar .progress-bar` — gradien pada bar keahlian.
- `.login-wrapper` / `.login-card` — latar dan kartu halaman login.

> **Poin penting yang sering ditanya:** `object-fit: cover` membuat gambar mengisi area tanpa gepeng/terdistorsi.

---

## 5. `js/main.js` — JavaScript Bersama

Dijalankan setelah halaman selesai dimuat (`DOMContentLoaded`). Tugasnya:

1. **Tahun otomatis di footer** — mengisi `<span id="tahun">` dengan tahun berjalan.
2. **Menandai menu aktif** — membandingkan `href` menu dengan nama file yang sedang dibuka, lalu menambah kelas `active`.
3. **Tombol "kembali ke atas"** — muncul setelah pengguna menggulir 300px, dan menggulir halus ke atas saat diklik.
4. **Inisialisasi tooltip Bootstrap** — mengaktifkan tooltip jika ada elemen `data-bs-toggle="tooltip"`.

---

## 6. Cara Kerja Validasi Login (PALING PENTING)

File: **`js/login.js`**, dipakai oleh **`login.html`**.

### 6.1 Alur Sederhana
```
Tombol Login diklik
      │
      ▼
Form "submit" tertangkap → event.preventDefault()  (halaman TIDAK reload)
      │
      ▼
Cek Email:  kosong? format salah?
Cek Password: kosong? kurang dari 8 karakter?
      │
      ├── Ada yang salah → tampilkan pesan merah di bawah input + alert danger
      │
      └── Semua benar    → tampilkan alert success (hijau)
```

### 6.2 Bagian Penting Kode

**a) Mengambil elemen dari HTML**
```javascript
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const alertBox = document.getElementById("formAlert");
```

**b) Pola email (regex)**
```javascript
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```
Artinya: deretan karakter, lalu `@`, lalu deretan karakter, lalu titik, lalu deretan karakter. Contoh valid: `nama@email.com`. Contoh tidak valid: `nama.com`, `nama@`, `@email.com`.

**c) Mencegah halaman reload**
```javascript
form.addEventListener("submit", function (event) {
  event.preventDefault();   // <-- kunci agar tidak reload
  ...
});
```
Tanpa `preventDefault()`, browser akan mengirim form dan memuat ulang halaman.

**d) Memeriksa email & password**
```javascript
if (emailInput.value.trim() === "") { /* error: kosong */ }
if (!polaEmail.test(emailInput.value.trim())) { /* error: format salah */ }
if (passwordInput.value.length < 8) { /* error: terlalu pendek */ }
```
- `.trim()` menghapus spasi di awal/akhir agar spasi saja dianggap kosong.
- `.length` menghitung jumlah karakter password.

**e) Menampilkan pesan error di bawah input**
```javascript
input.classList.add("is-invalid");     // memberi border merah (kelas Bootstrap)
errorEl.textContent = "pesan error";   // teks masuk ke <div class="invalid-feedback">
```

**f) Menampilkan alert Bootstrap**
```javascript
alertBox.className = "alert alert-danger";   // merah
alertBox.innerHTML = "<strong>Login gagal.</strong> ...";
alertBox.classList.remove("d-none");         // tampilkan
```
Untuk berhasil, tinggal ganti `alert-danger` menjadi `alert-success`.

**g) Tombol lihat/sembunyikan password**
```javascript
const tipe = passwordInput.getAttribute("type") === "password" ? "text" : "password";
passwordInput.setAttribute("type", tipe);
```
Mengubah tipe input antara `password` (tersembunyi) dan `text` (terlihat).

### 6.3 Aturan Validasi yang Diterapkan
| Input | Aturan | Pesan bila gagal |
|-------|--------|------------------|
| Email | Tidak boleh kosong | "Email tidak boleh kosong." |
| Email | Harus berformat email valid | "Format email tidak valid. Contoh: nama@email.com" |
| Password | Tidak boleh kosong | "Password tidak boleh kosong." |
| Password | Minimal 8 karakter | "Password minimal 8 karakter. Saat ini: X karakter." |

> **Catatan:** Ini murni validasi di sisi browser (front-end). Tidak ada autentikasi/database, sesuai ketentuan tugas.

### 6.4 Cara Menguji
1. Buka `login.html`.
2. Klik **Login** tanpa mengisi apa pun → muncul dua pesan merah + alert merah.
3. Isi email `suci` (tanpa @) → muncul pesan format email salah.
4. Isi email `suci@email.com` dan password `123` → muncul pesan password minimal 8 karakter.
5. Isi email `suci@email.com` dan password `password123` → muncul **alert hijau** "Login berhasil!".

---

## 7. Fitur Tambahan (Nilai Plus)

### 7.1 Filter Kategori di `projects.html`
Tombol filter memakai atribut `data-filter` dan setiap kartu punya `data-kategori`. Saat tombol diklik, JavaScript menyembunyikan kartu yang tidak cocok menggunakan kelas `d-none`:
```javascript
item.classList.toggle("d-none", !cocok);
```

### 7.2 Responsif
Karena memakai grid Bootstrap (`col-12`, `col-md-6`, `col-lg-4`) dan navbar `collapse`, tampilan otomatis menyesuaikan dari HP sampai desktop. Uji dengan mengecilkan jendela browser atau mode perangkat di Developer Tools (F12).

---

## 8. Deployment ke GitHub Pages

1. Buat akun/repository di [github.com](https://github.com), misalnya nama repo **`portofolio`**.
2. Unggah semua file (`index.html`, folder `css`, `js`, `img`) ke repo tersebut.
   - Cara simpel: klik **Add file → Upload files**, lalu tarik semua file/folder.
   - Pastikan `index.html` berada di **root** repo (bukan di dalam subfolder).
3. Masuk ke **Settings → Pages**.
4. Pada **Source**, pilih **Deploy from a branch**, pilih branch **`main`** dan folder **`/ (root)`**, lalu **Save**.
5. Tunggu 1–2 menit. Website akan aktif di:
   ```
   https://USERNAME.github.io/portofolio/
   ```
6. Buka URL tersebut, pastikan beranda tampil, navigasi jalan, dan halaman login bisa diuji.

> **Tips:** Jika halaman blank/gambar tidak muncul, pastikan huruf besar/kecil nama file sama (contoh `img/avatar.svg`). GitHub Pages bersifat *case-sensitive*.

---

## 9. Antisipasi Pertanyaan Dosen

| Pertanyaan | Jawaban Singkat |
|------------|-----------------|
| Kenapa pakai Bootstrap? | Mempercepat pembuatan tampilan responsif dengan komponen siap pakai (grid, navbar, card, form, alert). |
| Apa fungsi `container` dan `row/col`? | `container` membungkus konten dengan lebar optimal; `row` + `col` menyusun layout grid 12 kolom yang responsif. |
| Apa itu `preventDefault()`? | Membatalkan perilaku bawaan tombol submit agar halaman tidak reload, sehingga validasi JS bisa berjalan. |
| Bagaimana pesan error muncul? | JavaScript menambah kelas `is-invalid` pada input dan mengisi `<div class="invalid-feedback">`, lalu menampilkan `alert` Bootstrap. |
| Apakah login ini aman? | Tidak — ini hanya validasi tampilan di browser, bukan sistem autentikasi. Sesuai ketentuan tugas. |
| Gimana caranya tampilan bisa rapi di HP? | Berkat grid responsif Bootstrap dan navbar collapse yang otomatis jadi tombol hamburger. |
| Bagaimana cara mengubah warna tema? | Ubah nilai variabel di `:root` pada `css/style.css`. |

---

## 10. Cara Menjalankan Secara Lokal

Cukup **buka `index.html`** dengan klik dua kali (double-click) di file explorer — karena website ini statis, tidak butuh server.

Jika ingin lebih rapi, gunakan ekstensi **Live Server** di VS Code: klik kanan `index.html` → **Open with Live Server**.

---

*Dokumen ini dibuat sebagai panduan pemahaman pribadi. Pelajari setiap bagian kode agar dapat menjelaskan dan mempertanggungjawabkannya.*
