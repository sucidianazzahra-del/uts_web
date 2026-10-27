<?php
const BATAS_LULUS = 60;
const MIN_KEHADIRAN = 75;
const BOBOT_TUGAS = 0.3;
const BOBOT_UTS = 0.3;
const BOBOT_UAS = 0.4;

$nama = "Suci dian azzahra";
$tugas = 80;
$uts = 75;
$uas = 120;
$kehadiran = -110;  

$dataValid = true;

if ($tugas < 0 || $tugas > 100 || $uts < 0 || $uts > 100 || $uas < 0 || $uas > 100) {
    echo "Nilai tugas, UTS, dan UAS harus berada antara 0 dan 100.<br>";
    $dataValid = false;
}

if ($kehadiran < 0 || $kehadiran > 100) {
    echo "Kehadiran harus berada antara 0 dan 100.<br>";
    $dataValid = false;
}

if ($dataValid) {
    $nilaiAkhir = ($tugas * BOBOT_TUGAS) + ($uts * BOBOT_UTS) + ($uas * BOBOT_UAS);

    if ($nilaiAkhir >= 85) {
        $huruf = "A";
    } elseif ($nilaiAkhir >= 75) {
        $huruf = "B";
    } elseif ($nilaiAkhir >= 65) {
        $huruf = "C";
    } elseif ($nilaiAkhir >= BATAS_LULUS) {
        $huruf = "D";
    } else {
        $huruf = "E";
    }

    if ($nilaiAkhir >= BATAS_LULUS && $kehadiran >= MIN_KEHADIRAN) {
        $status = "Lulus";
    } else {
        $status = "Belum lulus";
    }

    echo "Nama: " . $nama . "<br>";
    echo "Tugas: " . $tugas . " | UTS: " . $uts . " | UAS: " . $uas . "<br>";
    echo "Nilai Akhir: " . str_replace('.', ',', round($nilaiAkhir, 2)) . "<br>";
    echo "Nilai Huruf: " . $huruf . "<br>";
    echo "Kehadiran: " . $kehadiran . "%<br>";
    echo "Status: " . $status . "<br>";
}
?>
