/* ==========================================================================
   login.js - Validasi form login menggunakan JavaScript (sisi browser)
   ==========================================================================
   Alur kerja singkat:
   1. Ambil elemen form dan input.
   2. Dengarkan event "submit". Saat tombol diklik, JS mencegah form
      benar-benar dikirim (event.preventDefault()).
   3. Periksa setiap input. Jika ada yang salah -> tampilkan pesan
      error di bawah input + alert Bootstrap berwarna merah.
   4. Jika semua valid -> tampilkan alert sukses berwarna hijau.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Ambil elemen-elemen penting dari halaman ---
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const alertBox = document.getElementById("formAlert");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Ekspresi reguler (regex) untuk memeriksa format email sederhana.
  // Arti: sesuatu@sesuatu.sesuatu
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const PASSWORD_MIN = 8; // panjang minimum password

  // --- Fungsi bantu untuk menampilkan/menghapus pesan error ---
  function setError(input, errorEl, pesan) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    errorEl.textContent = pesan;
  }

  function setValid(input, errorEl) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    errorEl.textContent = "";
  }

  // Fungsi bantu: menyembunyikan alert
  function hideAlert() {
    alertBox.classList.add("d-none");
    alertBox.innerHTML = "";
  }

  // Fungsi bantu: menampilkan alert dengan warna tertentu
  function showAlert(tipe, pesan) {
    alertBox.className = "alert alert-" + tipe;
    alertBox.innerHTML = pesan;
    alertBox.classList.remove("d-none");
  }

  // --- 2. Validasi email ---
  function validasiEmail() {
    const nilai = emailInput.value.trim();

    if (nilai === "") {
      setError(emailInput, emailError, "Email tidak boleh kosong.");
      return false;
    }
    if (!polaEmail.test(nilai)) {
      setError(emailInput, emailError, "Format email tidak valid. Contoh: nama@email.com");
      return false;
    }
    setValid(emailInput, emailError);
    return true;
  }

  // --- 3. Validasi password ---
  function validasiPassword() {
    const nilai = passwordInput.value;

    if (nilai === "") {
      setError(passwordInput, passwordError, "Password tidak boleh kosong.");
      return false;
    }
    if (nilai.length < PASSWORD_MIN) {
      setError(
        passwordInput,
        passwordError,
        "Password minimal " + PASSWORD_MIN + " karakter. Saat ini: " + nilai.length + " karakter."
      );
      return false;
    }
    setValid(passwordInput, passwordError);
    return true;
  }

  // --- 4. Validasi langsung saat pengguna mengetik/meninggalkan input ---
  emailInput.addEventListener("blur", validasiEmail);
  passwordInput.addEventListener("blur", validasiPassword);

  emailInput.addEventListener("input", function () {
    if (emailInput.classList.contains("is-invalid")) validasiEmail();
  });
  passwordInput.addEventListener("input", function () {
    if (passwordInput.classList.contains("is-invalid")) validasiPassword();
  });

  // --- 5. Tombol mata untuk lihat/sembunyikan password ---
  const togglePassword = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");
  togglePassword.addEventListener("click", function () {
    const tipe = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", tipe);
    eyeIcon.classList.toggle("bi-eye");
    eyeIcon.classList.toggle("bi-eye-slash");
  });

  // --- 6. Event utama: saat form disubmit ---
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // cegah reload halaman
    hideAlert();

    // Jalankan semua validasi (tidak pakai && agar semua error tampil sekaligus)
    const emailValid = validasiEmail();
    const passwordValid = validasiPassword();

    if (!emailValid || !passwordValid) {
      // Ada input tidak valid -> tampilkan alert peringatan
      showAlert(
        "danger",
        '<i class="bi bi-exclamation-triangle-fill me-2"></i>' +
          "<strong>Login gagal.</strong> Periksa kembali input yang ditandai merah di bawah."
      );
      // Fokuskan ke input pertama yang bermasalah
      if (!emailValid) emailInput.focus();
      else passwordInput.focus();
      return;
    }

    // Semua valid -> tampilkan pesan berhasil
    showAlert(
      "success",
      '<i class="bi bi-check-circle-fill me-2"></i>' +
        "<strong>Login berhasil!</strong> Selamat datang kembali, " +
        emailInput.value.trim() +
        ". (Ini hanya simulasi validasi, tidak terhubung ke database.)"
    );
  });
});
