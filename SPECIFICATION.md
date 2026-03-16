# Senarai Modul Sistem Pelesenan MPOB

---

## 📄 Dokumen Spesifikasi Teknikal (MPOB(T/P)06/26)

Berdasarkan Jadual Pematuhan Spesifikasi Teknikal, modul-modul yang perlu dibangunkan dalam Sistem Pelesenan Baharu adalah:

### Modul Utama

1. **Halaman Utama**
   - Login / Daftar Masuk
   - Pendaftaran Pengguna Baru
   - Reset kata laluan dan tukar kata laluan
   - Pengumuman / Pekeliling / Pemberitahuan
   - Pengurusan dwi bahasa, direktori, Soalan Lazim, Manual Pengguna, Panduan Pelesenan
   - Web responsive (pelbagai medium paparan)

2. **Pengurusan Pengguna**
   - Access Control Level (ACL) yang dinamik
   - Single Sign-On (SSO) Keycloak & MyDigital ID
   - Profil pengguna (pendaftaran, kemaskini, peranan)
   - Kategori pengguna:
     - Pemohon
     - Pemegang Lesen
     - Pegawai Pemproses Lesen
     - Kakitangan Bahagian/Unit (Penguatkuasa, Kawalan Mutu, Pendakwaan, SECD, BEPI)
     - Pentadbir Sistem (User Admin & SuperAdmin)

3. **Modul Sistem Pelesenan** *(~38 aliran kerja)*
   | # | Jenis Permohonan | Bilangan Aliran Kerja |
   |---|---|---|
   | a | Pendaftaran Penanaman | 1 |
   | b | Permohonan Lesen Baharu (Baharu / Pengambilalihan / Tukar Taraf / Sementara / Khas) | 12 |
   | c | Pembaharuan Lesen | 4 |
   | d | Pindaan Butiran Lesen | 5 |
   | e | Tambahan Aktiviti | 5 |
   | f | Tambahan Daya Pemprosesan | 1 |
   | g | Pengurangan Aktiviti | 2 |
   | h | Pembatalan Lesen | 2 |
   | i | Salinan Diperakui Lesen | 1 |
   | j | Rayuan | 1 |
   | k | Tunjuk Sebab | 2 |
   | l | Pendengaran | 1 |
   | m | Pemulangan Bayaran | 1 |
   | **Jumlah** | | **~38** |

4. **e-Pemantauan**
   - Memantau status dan jangkamasa tindakan permohonan
   - Tracking activity log terkini / historical
   - Carian: No. Rujukan, Nama Pemohon, No. Lesen, Tarikh, Status, Jenis Permohonan, Kategori Lesen
   - Carian nombor lot mengikut negeri, daerah dan mukim
   - Export to Excel

5. **Audit Trail**
   - Log transaksi pertambahan, pengemaskinian dan penghapusan rekod
   - Boleh dicari mengikut pengguna, waktu login, masa dan tarikh

6. **Alert / Notifikasi**
   - Notifikasi melalui emel dan dalam sistem
   - Senarai tugasan harian pegawai
   - Peringatan pembaharuan lesen (3 bulan sebelum tamat)
   - Notifikasi status permohonan kepada pemohon/pemegang lesen
   - Notifikasi dokumen tidak lengkap
   - Notifikasi permohonan melebihi tempoh KPI

7. **Kawalan Capaian**
   - Pengurusan capaian mengikut peranan pengguna
   - QR Code untuk pengesahan dan kesahihan lesen/AP
   - Versi dokumen (overwrite & versioning)
   - Peringkat capaian (access level)

8. **Laporan & Statistik**
   - ~80 laporan/statistik (harian, mingguan, bulanan, tahunan)
   - Dynamic query dengan pilihan kolum dan filter
   - Export: PDF, Excel, CSV
   - Dashboard interaktif mengikut peranan pengguna (KPI, trend permohonan, jumlah pemegang lesen)

9. **Borang Penilaian Tapak (Progressive Web App)**
   - Boleh diakses melalui tablet/telefon pintar
   - Fungsi offline — data sync automatik apabila internet tersedia
   - Rakam dan simpan gambar; plot koordinat premis
   - Laporan penilaian disimpan ke e-File permohonan berkaitan
   - Pengesahan koordinat oleh pegawai penilai

---

### Sub-Modul

| # | Sub-Modul | Keterangan |
|---|---|---|
| 1 | Penghantaran Penyata Bulanan | Borang MB4 dan KB4 |
| 2 | Lawatan Penilaian Tapak | Jana minit, muat naik gambar premis |
| 3 | Carian Dokumen | Carian mengikut kriteria |
| 4 | Carian Profil Pemegang Lesen | Mengikut Nombor Lesen / Nama Syarikat |
| 5 | Carian Ahli Lembaga Pengarah | Mengikut Nama & No. Kad Pengenalan |
| 6 | Carian Alamat Premis Berlesen | Pemilikan premis terdahulu |
| 7 | Carian Status Lesen | — |
| 8 | Modul Kewangan | Semakan bayaran, penjanaan resit, proses refund (integrasi MyFAS) |
| 9 | Analisa Modal Berganda | Mengikut syarikat dan Ahli Lembaga Pengarah |
| 10 | Senaraihitam | Integrasi SIMS |
| 11 | Senarai Pemerhatian (Watchlist) | Pemegang lesen dalam pemerhatian |
| 12 | Cetakan Lesen | Individu dan batch |
| 13 | Pentadbir Sistem | Tetapan KPI, akaun pengguna, konfigurasi workflow |
| 14 | Pengurusan Dokumen | Mesyuarat, surat menyurat, memo, pekeliling, dokumen permohonan |
| 15 | Pertanyaan dan Cadangan | — |
| 16 | Kajian Kepuasan Pelanggan | Maklum balas dari orang awam |

---

## 🌐 Sistem MyLesen MPOB (e-lesen.mpob.gov.my)

Sistem sedia ada untuk pemegang lesen industri (bukan pekebun kecil).

| # | Modul / Fungsi |
|---|---|
| 1 | Login Pemohon & Pelesen |
| 2 | Pendaftaran Pengguna Baru |
| 3 | Lupa Kata Laluan |
| 4 | Panduan Pelesenan (Kriteria, Syarat, Panduan Pembaharuan & Pindaan) |
| 5 | Penyata Bulanan |
| 6 | Statistik |
| 7 | Soalan Lazim (FAQ) |
| 8 | Manual Pengguna |
| 9 | Hubungi Kami |
| 10 | Portal Pegawai MPOB (akses berasingan) |

---

## 🌐 Sistem e-LesenPK MPOB (e-lesenpk.mpob.gov.my)

Sistem sedia ada khusus untuk **pekebun kecil** (Kategori SH — Kebun Kecil).

| # | Modul / Fungsi |
|---|---|
| 1 | Halaman Utama |
| 2 | Semakan Lesen |
| 3 | Log Masuk |
| 4 | Pendaftaran Baru |
| 5 | Permohonan Lesen Baharu |
| 6 | Pembaharuan Lesen |
| 7 | Pindaan Butiran Lesen |
| 8 | Pembatalan Lesen |
| 9 | Hubungi Kami |

---

## 📌 Kesimpulan

Sistem Pelesenan Baharu yang dibangunkan perlu **menggabungkan dan menambah baik** fungsi-fungsi daripada kedua-dua sistem sedia ada (MyLesen dan e-LesenPK) ke dalam satu platform bersepadu dengan ciri-ciri tambahan seperti:

- Progressive Web App (PWA) untuk penilaian tapak
- Integrasi dengan SSM, SIMS, MyFAS, MyDigital ID, Keycloak SSO
- Dashboard interaktif dan laporan dinamik
- Workflow engine yang dinamik dan boleh dikonfigurasi oleh pentadbir
- Keselamatan berasaskan OWASP SSDLC

---

*Rujukan: Tender No. MPOB(T/P)06/26 — Jadual Pematuhan Spesifikasi Teknikal*
