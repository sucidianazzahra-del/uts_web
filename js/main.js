/* ==========================================================================
   main.js - JavaScript bersama untuk semua halaman (kecuali login)
   Berisi: tahun otomatis di footer, penanda menu aktif,
   dan tombol "kembali ke atas".
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Menampilkan tahun berjalan secara otomatis di footer
  const yearEl = document.getElementById("tahun");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Menandai menu navbar yang sedang aktif berdasarkan nama file URL
  const halamanIni = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === halamanIni) {
      link.classList.add("active");
    }
  });

  // 3. Tombol "kembali ke atas"
  const btnTop = document.getElementById("btnTop");
  if (btnTop) {
    window.addEventListener("scroll", function () {
      btnTop.classList.toggle("d-none", window.scrollY < 300);
    });
    btnTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 4. Tooltip Bootstrap (jika ada elemen ber-atribut data-bs-toggle="tooltip")
  if (window.bootstrap) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
      new bootstrap.Tooltip(el);
    });
  }
});
