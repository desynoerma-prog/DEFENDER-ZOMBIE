import { MathQuestion, MathElement, MathDifficulty } from '../types';

/**
 * 🌱 MATH DEFENDER - STEAM MATHEMATICS ADVENTURE
 * GRADE 4 ELEMENTARY SCHOOL (SD) INDONESIAN CURRICULUM QUESTION ENGINE
 *
 * 5 Main Elements:
 * 1. Bilangan (Whole numbers to 10,000, Ops to 1,000, Multi/Div to 100, Factors, Multiples, Fractions, Decimals, Percent)
 * 2. Aljabar (Unknown values □, Operations relationship, Patterns: Increasing, Decreasing, Object)
 * 3. Pengukuran (Length cm/m, Weight g/kg, Estimation, Non-standard/Standard Area & Volume)
 * 4. Geometri (Quadrilaterals, Triangles, Polygons, Sides, Vertices, Composition & Decomposition)
 * 5. Data (Tables, Pictograms, Bar charts, Comparing, Differences, Extremes)
 */

export const GRADE_4_MATH_BANK: MathQuestion[] = [
  // =========================================================================
  // ELEMENT 1: BILANGAN
  // =========================================================================

  // --- BILANGAN: LOW (Recall, Direct Calculation, Place Value, Basic Fractions) ---
  {
    id: 'bilangan_nilai_tempat_low_001',
    element: 'Bilangan',
    subtopic: 'Nilai Tempat',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Pada bilangan 4.582, angka 5 menempati nilai tempat ...',
    options: ['satuan', 'puluhan', 'ratusan', 'ribuan'],
    correctAnswer: 2,
    explanation: 'Pada bilangan 4.582, nilai tempat dari kanan ke kiri adalah: 2 (satuan), 8 (puluhan), 5 (ratusan), dan 4 (ribuan). Jadi angka 5 menempati ratusan.',
    hints: [
      'Ingat urutan nilai tempat dari sebelah kanan: satuan, puluhan, ratusan, ribuan.',
      'Angka 5 berada di urutan ketiga dari sebelah kanan.',
      'Urutan ketiga dari kanan bernilai ratusan (5 × 100 = 500).'
    ],
    skill: 'Menentukan nilai tempat bilangan cacah',
    estimatedTime: 15
  },
  {
    id: 'bilangan_baca_tulis_low_002',
    element: 'Bilangan',
    subtopic: 'Membaca Bilangan',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Bilangan 7.046 dibaca ...',
    options: [
      'Tujuh ribu empat puluh enam',
      'Tujuh ratus empat puluh enam',
      'Tujuh ribu empat ratus enam',
      'Tujuh puluh ribu empat puluh enam'
    ],
    correctAnswer: 0,
    explanation: '7.046 terdiri atas 7 ribuan, 0 ratusan, 4 puluhan, dan 6 satuan, sehingga dibaca "tujuh ribu empat puluh enam".',
    hints: [
      'Perhatikan angka pada tempat ratusan adalah 0.',
      'Angka 7 di tempat ribuan (tujuh ribu) dan 46 (empat puluh enam).',
      'Gabungkan keduanya: tujuh ribu empat puluh enam.'
    ],
    skill: 'Membaca lambang bilangan cacah',
    estimatedTime: 15
  },
  {
    id: 'bilangan_penjumlahan_low_003',
    element: 'Bilangan',
    subtopic: 'Penjumlahan Bilangan',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Hasil dari 345 + 230 adalah ...',
    highlightText: '345 + 230 = ?',
    options: ['565', '575', '585', '675'],
    correctAnswer: 1,
    explanation: 'Jumlahkan per nilai tempat: Satuan 5 + 0 = 5, Puluhan 4 + 3 = 7, Ratusan 3 + 2 = 5. Jadi 345 + 230 = 575.',
    hints: [
      'Jumlahkan satuan terlebih dahulu: 5 + 0 = 5.',
      'Lalu jumlahkan puluhan: 4 + 3 = 7.',
      'Terakhir jumlahkan ratusan: 3 + 2 = 5, menghasilkan 575.'
    ],
    skill: 'Penjumlahan bilangan sampai 1.000',
    estimatedTime: 15
  },
  {
    id: 'bilangan_pengurangan_low_004',
    element: 'Bilangan',
    subtopic: 'Pengurangan Bilangan',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Hasil pengurangan dari 680 - 250 adalah ...',
    highlightText: '680 - 250 = ?',
    options: ['410', '420', '430', '450'],
    correctAnswer: 2,
    explanation: 'Kurangkan per nilai tempat: 0 - 0 = 0 (satuan), 8 - 5 = 3 (puluhan), 6 - 2 = 4 (ratusan). Hasilnya adalah 430.',
    hints: [
      'Kurangkan dari nilai tempat satuan: 0 - 0 = 0.',
      'Kurangkan puluhan: 8 - 5 = 3.',
      'Kurangkan ratusan: 6 - 2 = 4, sehingga menjadi 430.'
    ],
    skill: 'Pengurangan bilangan sampai 1.000',
    estimatedTime: 15
  },
  {
    id: 'bilangan_perkalian_low_005',
    element: 'Bilangan',
    subtopic: 'Perkalian Dasar',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Berapakah hasil dari 7 × 8?',
    highlightText: '7 × 8 = ?',
    options: ['48', '54', '56', '64'],
    correctAnswer: 2,
    explanation: '7 × 8 = 56. Dapat dihitung dengan penjumlahan berulang angka 7 sebanyak 8 kali, atau 8 sebanyak 7 kali.',
    hints: [
      'Perkalian adalah penjumlahan berulang.',
      '7 × 7 = 49, maka 7 × 8 = 49 + 7.',
      '49 + 7 = 56.'
    ],
    skill: 'Perkalian bilangan cacah sampai 100',
    estimatedTime: 12
  },
  {
    id: 'bilangan_pembagian_low_006',
    element: 'Bilangan',
    subtopic: 'Pembagian Dasar',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Hasil dari 54 ÷ 6 adalah ...',
    highlightText: '54 ÷ 6 = ?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 2,
    explanation: '54 ÷ 6 = 9 karena 9 × 6 = 54.',
    hints: [
      'Pembagian adalah kebalikan dari perkalian.',
      'Cari angka yang jika dikalikan 6 menghasilkan 54.',
      '6 × 9 = 54, jadi 54 ÷ 6 = 9.'
    ],
    skill: 'Pembagian bilangan cacah sampai 100',
    estimatedTime: 12
  },
  {
    id: 'bilangan_pecahan_banding_low_007',
    element: 'Bilangan',
    subtopic: 'Pecahan Pembilang Satu',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Manakah pecahan yang nilainya lebih besar antara 1/2 dan 1/4?',
    options: ['1/2 lebih besar', '1/4 lebih besar', 'Keduanya sama besar', 'Tidak dapat ditentukan'],
    correctAnswer: 0,
    explanation: 'Pada pecahan berpembilang 1, semakin kecil penyebutnya, semakin besar potongan bagiannya. Membagi kue menjadi 2 potong menghasilkan bagian yang lebih besar dibanding dibagi 4 potong.',
    hints: [
      'Bayangkan sebuah kue utuh.',
      'Jika dibagi 2 orang, masing-masing mendapat setengah (1/2). Jika dibagi 4 orang, masing-masing mendapat seperempat (1/4).',
      'Potongan 1/2 jelas lebih besar daripada potongan 1/4.'
    ],
    skill: 'Membandingkan pecahan berpembilang 1',
    estimatedTime: 15
  },
  {
    id: 'bilangan_persen_dasar_low_008',
    element: 'Bilangan',
    subtopic: 'Konsep Persen',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Arti dari 25% adalah ...',
    options: [
      '25 bagian dari 100 bagian',
      '25 bagian dari 10 bagian',
      '25 bagian dari 1.000 bagian',
      '25 dikalikan 10'
    ],
    correctAnswer: 0,
    explanation: 'Kata "persen" berasal dari bahasa Latin "per centum" yang berarti "per seratus". Jadi 25% berarti 25 dari 100 bagian (25/100).',
    hints: [
      'Simbol % melambangkan per seratus.',
      '25% dapat ditulis sebagai pecahan 25/100.',
      'Artinya adalah 25 bagian dari keseluruhan 100 bagian.'
    ],
    skill: 'Memahami makna persen sebagai perseratus',
    estimatedTime: 15
  },

  // --- BILANGAN: MIDDLE (Multi-step, Factors, Equivalent Fractions, Contextual) ---
  {
    id: 'bilangan_faktor_mid_009',
    element: 'Bilangan',
    subtopic: 'Faktor Bilangan',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Semua faktor dari bilangan 18 adalah ...',
    options: [
      '1, 2, 3, 6, 9, 18',
      '1, 2, 4, 6, 9, 18',
      '2, 3, 6, 9',
      '1, 3, 6, 9, 18'
    ],
    correctAnswer: 0,
    explanation: 'Faktor adalah bilangan yang dapat membagi habis suatu bilangan: 1×18=18, 2×9=18, 3×6=18. Maka faktor dari 18 adalah 1, 2, 3, 6, 9, dan 18.',
    hints: [
      'Faktor adalah bilangan-bilangan yang jika dikalikan menghasilkan 18.',
      'Pasangan faktor: 1 × 18, 2 × 9, 3 × 6.',
      'Daftar berurutan: 1, 2, 3, 6, 9, 18.'
    ],
    skill: 'Menentukan faktor bilangan cacah',
    estimatedTime: 25
  },
  {
    id: 'bilangan_kelipatan_mid_010',
    element: 'Bilangan',
    subtopic: 'Kelipatan Bilangan',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Kelipatan persekutuan terkecil dari 4 dan 6 yang kurang dari 20 adalah ...',
    options: ['12', '16', '18', '24'],
    correctAnswer: 0,
    explanation: 'Kelipatan 4: 4, 8, 12, 16... Kelipatan 6: 6, 12, 18... Bilangan kelipatan yang sama (persekutuan) pertama adalah 12.',
    hints: [
      'Tulis kelipatan 4: 4, 8, 12, 16, 20.',
      'Tulis kelipatan 6: 6, 12, 18, 24.',
      'Cari angka yang sama pada kedua daftar: 12.'
    ],
    skill: 'Menentukan kelipatan persekutuan',
    estimatedTime: 25
  },
  {
    id: 'bilangan_pecahan_senilai_mid_011',
    element: 'Bilangan',
    subtopic: 'Pecahan Senilai',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Pecahan yang senilai dengan 2/3 adalah ...',
    highlightText: '2/3 = ... / 9',
    options: ['4/9', '6/9', '7/9', '8/9'],
    correctAnswer: 1,
    explanation: 'Untuk mencari pecahan senilai dengan penyebut 9, kalikan pembilang dan penyebut dengan 3: (2 × 3) / (3 × 3) = 6/9.',
    hints: [
      'Perhatikan perubahan penyebut dari 3 menjadi 9.',
      'Penyebut dikalikan 3 (3 × 3 = 9).',
      'Kalikan juga pembilang dengan 3: 2 × 3 = 6, jadi 6/9.'
    ],
    skill: 'Menentukan pecahan senilai',
    estimatedTime: 25
  },
  {
    id: 'bilangan_konteks_kebun_mid_012',
    element: 'Bilangan',
    subtopic: 'Soal Cerita Operasi Hitung',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Kebun sekolah memiliki 350 bibit bunga matahari. Siswa kelas 4 menanam 180 bibit pada hari Senin dan 95 bibit pada hari Selasa. Berapa sisa bibit yang belum ditanam?',
    options: ['75 bibit', '85 bibit', '95 bibit', '105 bibit'],
    correctAnswer: 0,
    explanation: 'Total bibit yang sudah ditanam = 180 + 95 = 275 bibit. Sisa bibit = 350 - 275 = 75 bibit.',
    hints: [
      'Langkah 1: Hitung total bibit yang sudah ditanam pada hari Senin dan Selasa (180 + 95).',
      '180 + 95 = 275 bibit.',
      'Langkah 2: Kurangkan total awal dengan bibit yang sudah ditanam: 350 - 275 = 75 bibit.'
    ],
    skill: 'Menyelesaikan masalah kontekstual penjumlahan dan pengurangan',
    estimatedTime: 30
  },
  {
    id: 'bilangan_desimal_persen_mid_013',
    element: 'Bilangan',
    subtopic: 'Hubungan Persen dan Desimal',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Bentuk desimal dari 75% adalah ...',
    highlightText: '75% = ?',
    options: ['0,075', '0,75', '7,5', '75,0'],
    correctAnswer: 1,
    explanation: '75% = 75/100. Pembagian dengan 100 menggeser tanda koma dua tempat ke kiri dari 75 menjadi 0,75.',
    hints: [
      'Ubah persen menjadi pecahan perseratus: 75/100.',
      'Bagi 75 dengan 100.',
      '75 dibagi 100 menghasilkan 0,75.'
    ],
    skill: 'Mengubah persen ke desimal',
    estimatedTime: 20
  },

  // --- BILANGAN: HARD (Multi-step, Analysis, STEAM Complex, Boss) ---
  {
    id: 'bilangan_steam_analisis_hard_014',
    element: 'Bilangan',
    subtopic: 'Penalaran Pecahan & Persen',
    difficulty: 'HARD',
    type: 'multiple_choice',
    question: 'Sebuah taman matematika seluas 100 petak ditanami 1/4 bagian dengan Peashooter dan 0,50 bagian dengan Sunflower. Berapa persen sisa lahan yang belum ditanami?',
    options: ['15%', '25%', '35%', '45%'],
    correctAnswer: 1,
    explanation: '1/4 bagian = 25%. 0,50 bagian = 50%. Bagian yang sudah ditanami = 25% + 50% = 75%. Sisa lahan yang belum ditanami = 100% - 75% = 25%.',
    hints: [
      'Ubah semua bagian ke bentuk persen terlebih dahulu.',
      '1/4 = 25% dan 0,50 = 50%.',
      'Jumlahkan lahan yang sudah ditanam: 25% + 50% = 75%. Sisa = 100% - 75% = 25%.'
    ],
    skill: 'Menganalisis hubungan pecahan, desimal, dan persen kontekstual',
    estimatedTime: 45
  },
  {
    id: 'bilangan_boss_operasi_hard_015',
    element: 'Bilangan',
    subtopic: 'Tantangan Multi-Langkah Bilangan',
    difficulty: 'HARD',
    type: 'multiple_choice',
    isBossQuestion: true,
    question: 'Sebuah gudang benih memiliki 850 kantong benih. Sebanyak 245 kantong disalurkan ke Kebun Timur, dan 380 kantong disalurkan ke Kebun Barat. Jika sisanya dimasukkan secara merata ke dalam 5 kotak penyimpanan, berapa kantong benih isi tiap kotak?',
    options: ['45 kantong', '50 kantong', '55 kantong', '65 kantong'],
    correctAnswer: 0,
    explanation: 'Total benih yang disalurkan = 245 + 380 = 625 kantong. Sisa benih = 850 - 625 = 225 kantong. Dibagi ke dalam 5 kotak: 225 ÷ 5 = 45 kantong tiap kotak.',
    hints: [
      'Langkah 1: Jumlahkan benih yang disalurkan (245 + 380 = 625).',
      'Langkah 2: Hitung sisa benih di gudang (850 - 625 = 225).',
      'Langkah 3: Bagi sisa benih ke dalam 5 kotak (225 ÷ 5 = 45).'
    ],
    skill: 'Memecahkan masalah multi-langkah operasi hitung campuran',
    estimatedTime: 60
  },

  // =========================================================================
  // ELEMENT 2: ALJABAR
  // =========================================================================

  // --- ALJABAR: LOW (Unknown in addition/subtraction, Simple patterns) ---
  {
    id: 'aljabar_kalimat_tambah_low_016',
    element: 'Aljabar',
    subtopic: 'Nilai yang Belum Diketahui',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Tentukan bilangan pengganti □ agar kalimat matematika berikut benar: □ + 25 = 70',
    highlightText: '□ + 25 = 70',
    options: ['35', '45', '55', '95'],
    correctAnswer: 1,
    explanation: 'Untuk mencari nilai □ pada operasi penjumlahan, kurangkan hasil dengan bilangan yang diketahui: □ = 70 - 25 = 45.',
    hints: [
      'Pengurangan adalah kebalikan dari penjumlahan.',
      'Kurangkan 70 dengan 25.',
      '70 - 25 = 45.'
    ],
    skill: 'Menemukan nilai yang belum diketahui pada penjumlahan',
    estimatedTime: 15
  },
  {
    id: 'aljabar_kalimat_kurang_low_017',
    element: 'Aljabar',
    subtopic: 'Nilai yang Belum Diketahui',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Tentukan bilangan pengganti □ pada kalimat matematika: 85 - □ = 40',
    highlightText: '85 - □ = 40',
    options: ['35', '45', '55', '125'],
    correctAnswer: 1,
    explanation: 'Pada pengurangan A - □ = C, nilai □ dicari dengan cara A - C: 85 - 40 = 45.',
    hints: [
      'Berapa angka yang harus dikurangkan dari 85 agar bersisa 40?',
      'Hitung 85 dikurangi 40.',
      '85 - 40 = 45.'
    ],
    skill: 'Menemukan nilai yang belum diketahui pada pengurangan',
    estimatedTime: 15
  },
  {
    id: 'aljabar_pola_tambah_low_018',
    element: 'Aljabar',
    subtopic: 'Pola Bilangan Membesar',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Perhatikan pola bilangan berikut: 5, 10, 15, 20, ... Bilangan berikutnya adalah ...',
    highlightText: '5, 10, 15, 20, ?',
    options: ['22', '24', '25', '30'],
    correctAnswer: 2,
    explanation: 'Pola bilangan ini selalu bertambah 5 (+5) pada setiap langkah. Maka setelah 20 adalah 20 + 5 = 25.',
    hints: [
      'Periksa selisih antara dua bilangan berurutan: 10 - 5 = 5, 15 - 10 = 5.',
      'Polanya adalah selalu ditambah 5.',
      'Tambahkan 5 pada bilangan terakhir (20 + 5 = 25).'
    ],
    skill: 'Melanjutkan pola bilangan membesar',
    estimatedTime: 12
  },
  {
    id: 'aljabar_pola_kurang_low_019',
    element: 'Aljabar',
    subtopic: 'Pola Bilangan Mengecil',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Perhatikan pola bilangan berikut: 100, 90, 80, 70, ... Bilangan berikutnya adalah ...',
    highlightText: '100, 90, 80, 70, ?',
    options: ['50', '55', '60', '65'],
    correctAnswer: 2,
    explanation: 'Pola bilangan ini selalu berkurang 10 (-10). Maka bilangan selanjutnya setelah 70 adalah 70 - 10 = 60.',
    hints: [
      'Perhatikan bahwa bilangan semakin kecil.',
      'Dari 100 ke 90 berkurang 10, dari 90 ke 80 berkurang 10.',
      'Kurangkan 10 dari 70: 70 - 10 = 60.'
    ],
    skill: 'Melanjutkan pola bilangan mengecil',
    estimatedTime: 12
  },
  {
    id: 'aljabar_pola_gambar_low_020',
    element: 'Aljabar',
    subtopic: 'Pola Gambar Objek',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Perhatikan barisan tanaman: 🌱 (1 daun), 🌱🌱 (2 daun), 🌱🌱🌱 (3 daun), ... Berapa daun pada susunan ke-5?',
    options: ['4 daun', '5 daun', '6 daun', '7 daun'],
    correctAnswer: 1,
    explanation: 'Setiap susunan bertambah 1 daun sesuai nomor urutan. Susunan ke-1 = 1, ke-2 = 2, ke-3 = 3, ke-4 = 4, maka susunan ke-5 memiliki 5 daun.',
    hints: [
      'Perhatikan hubungan antara nomor susunan dengan jumlah daun.',
      'Susunan 1 punya 1 daun, susunan 2 punya 2 daun.',
      'Maka susunan ke-5 memiliki 5 daun.'
    ],
    skill: 'Mengidentifikasi pola gambar sederhana',
    estimatedTime: 15
  },

  // --- ALJABAR: MIDDLE (2-step patterns, Relationships, Contextual Algebra) ---
  {
    id: 'aljabar_pola_loncat_mid_021',
    element: 'Aljabar',
    subtopic: 'Pola Bilangan Melompat',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Perhatikan pola bilangan: 12, 18, 24, 30, ... Bilangan pada urutan ke-6 adalah ...',
    highlightText: '12, 18, 24, 30, [U5], [U6]?',
    options: ['36', '40', '42', '48'],
    correctAnswer: 2,
    explanation: 'Pola bertambah 6 (+6): Urutan 1 = 12, Urutan 2 = 18, Urutan 3 = 24, Urutan 4 = 30, Urutan 5 = 30 + 6 = 36, Urutan 6 = 36 + 6 = 42.',
    hints: [
      'Cari aturan polanya: 18 - 12 = 6, jadi selalu ditambah 6.',
      'Hitung urutan ke-5: 30 + 6 = 36.',
      'Hitung urutan ke-6: 36 + 6 = 42.'
    ],
    skill: 'Menentukan suku tertentu pada pola bilangan',
    estimatedTime: 25
  },
  {
    id: 'aljabar_hubungan_operasi_mid_022',
    element: 'Aljabar',
    subtopic: 'Hubungan Antar Operasi',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Jika 48 ÷ 6 = 8, maka kalimat matematika yang berhubungan langsung dan benar adalah ...',
    options: [
      '8 × 6 = 48',
      '48 + 6 = 54',
      '48 - 6 = 42',
      '8 + 6 = 14'
    ],
    correctAnswer: 0,
    explanation: 'Perkalian adalah kebalikan dari pembagian. Jika 48 ÷ 6 = 8, maka 8 × 6 = 48 atau 6 × 8 = 48.',
    hints: [
      'Ingat konsep hubungan kebalikan antara perkalian dan pembagian.',
      'Jika A ÷ B = C, maka C × B = A.',
      'Dengan demikian, 8 × 6 = 48.'
    ],
    skill: 'Memahami hubungan antara operasi perkalian dan pembagian',
    estimatedTime: 20
  },
  {
    id: 'aljabar_konteks_pensil_mid_023',
    element: 'Aljabar',
    subtopic: 'Masalah Nilai Rumpang Kontekstual',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Deni mempunyai sejumlah pensil di kotaknya. Ibu guru memberinya 18 pensil baru. Sekarang Deni memiliki 45 pensil. Berapa banyak pensil Deni mula-mula?',
    options: ['23 pensil', '27 pensil', '33 pensil', '63 pensil'],
    correctAnswer: 1,
    explanation: 'Bentuk kalimat matematikanya adalah □ + 18 = 45. Maka pensil mula-mula = 45 - 18 = 27 pensil.',
    hints: [
      'Tuliskan kalimat matematika: Pensil mula-mula (□) + 18 = 45.',
      'Untuk mencari □, hitung 45 - 18.',
      '45 - 18 = 27 pensil.'
    ],
    skill: 'Menyelesaikan masalah kontekstual dengan nilai yang belum diketahui',
    estimatedTime: 25
  },

  // --- ALJABAR: HARD (Missing middle term, Multi-step patterns, Boss) ---
  {
    id: 'aljabar_pola_rumpang_hard_024',
    element: 'Aljabar',
    subtopic: 'Pola Rumpang di Tengah',
    difficulty: 'HARD',
    type: 'multiple_choice',
    question: 'Perhatikan pola bilangan berikut: 14, 22, □, 38, 46. Bilangan yang tepat untuk mengisi kotak □ adalah ...',
    highlightText: '14, 22, □, 38, 46',
    options: ['28', '30', '32', '34'],
    correctAnswer: 1,
    explanation: 'Periksa selisih awal: 22 - 14 = 8. Periksa selisih akhir: 46 - 38 = 8. Polanya bertambah 8 (+8). Jadi kotak tengah adalah 22 + 8 = 30 (dan 30 + 8 = 38, cocok!).',
    hints: [
      'Hitung selisih antara 22 dan 14: 22 - 14 = 8.',
      'Cek apakah 46 - 38 juga sama dengan 8.',
      'Tambahkan 8 ke bilangan 22: 22 + 8 = 30.'
    ],
    skill: 'Menentukan nilai yang hilang pada pola bilangan',
    estimatedTime: 40
  },
  {
    id: 'aljabar_boss_pola_hard_025',
    element: 'Aljabar',
    subtopic: 'Tantangan Aljabar Menara Pertahanan',
    difficulty: 'HARD',
    type: 'multiple_choice',
    isBossQuestion: true,
    question: 'Di Kebun Pertahanan, robot penyiram air menyemprotkan 15 liter air pada menit pertama, 23 liter pada menit kedua, dan 31 liter pada menit ketiga. Jika pola berlanjut, berapa liter air yang disemprotkan pada menit ke-5?',
    options: ['39 liter', '45 liter', '47 liter', '55 liter'],
    correctAnswer: 2,
    explanation: 'Selisih per menit: 23 - 15 = 8 liter, 31 - 23 = 8 liter (pola +8 liter/menit). Menit ke-4 = 31 + 8 = 39 liter. Menit ke-5 = 39 + 8 = 47 liter.',
    hints: [
      'Tentukan penambahan air tiap menit: 23 - 15 = 8 liter.',
      'Hitung untuk menit ke-4: 31 + 8 = 39 liter.',
      'Hitung untuk menit ke-5: 39 + 8 = 47 liter.'
    ],
    skill: 'Menganalisis pola bilangan bertingkat dalam konteks STEAM',
    estimatedTime: 50
  },

  // =========================================================================
  // ELEMENT 3: PENGUKURAN
  // =========================================================================

  // --- PENGUKURAN: LOW (Direct conversion cm-m, g-kg, Non-standard area) ---
  {
    id: 'pengukuran_panjang_low_026',
    element: 'Pengukuran',
    subtopic: 'Satuan Panjang',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Panjang sebuah tali adalah 3 meter. Panjang tali tersebut sama dengan ... cm.',
    highlightText: '3 m = ... cm',
    options: ['30 cm', '300 cm', '3.000 cm', '30.000 cm'],
    correctAnswer: 1,
    explanation: '1 meter = 100 sentimeter. Maka 3 meter = 3 × 100 = 300 sentimeter.',
    hints: [
      'Ingat tangga satuan panjang: 1 m = 100 cm.',
      'Kalikan 3 dengan 100.',
      '3 × 100 = 300 cm.'
    ],
    skill: 'Mengonversi satuan panjang meter ke sentimeter',
    estimatedTime: 15
  },
  {
    id: 'pengukuran_berat_low_027',
    element: 'Pengukuran',
    subtopic: 'Satuan Berat',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Berat sekantong pupuk tanaman adalah 2 kilogram. Berat pupuk tersebut sama dengan ... gram.',
    highlightText: '2 kg = ... g',
    options: ['20 g', '200 g', '2.000 g', '20.000 g'],
    correctAnswer: 2,
    explanation: '1 kilogram = 1.000 gram. Maka 2 kilogram = 2 × 1.000 = 2.000 gram.',
    hints: [
      '1 kg setara dengan 1.000 gram.',
      'Kalikan jumlah kilogram dengan 1.000.',
      '2 × 1.000 = 2.000 gram.'
    ],
    skill: 'Mengonversi satuan berat kilogram ke gram',
    estimatedTime: 15
  },
  {
    id: 'pengukuran_luas_satuan_low_028',
    element: 'Pengukuran',
    subtopic: 'Luas Satuan Tak Baku',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Sebuah denah petak kebun berukuran panjang 4 petak satuan dan lebar 3 petak satuan. Luas denah kebun tersebut adalah ...',
    highlightText: 'Panjang 4 petak, Lebar 3 petak',
    options: ['7 petak satuan', '12 petak satuan', '14 petak satuan', '16 petak satuan'],
    correctAnswer: 1,
    explanation: 'Luas persegi panjang dihitung dengan mengalikan panjang × lebar: 4 × 3 = 12 petak satuan.',
    hints: [
      'Bayangkan ada 4 kolom petak dan 3 baris petak.',
      'Hitung total petak dengan perkalian panjang × lebar.',
      '4 × 3 = 12 petak satuan.'
    ],
    skill: 'Menentukan luas menggunakan petak satuan tak baku',
    estimatedTime: 15
  },
  {
    id: 'pengukuran_alat_ukur_low_029',
    element: 'Pengukuran',
    subtopic: 'Pemilihan Satuan Ukur',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Satuan baku yang paling tepat untuk mengukur panjang buku tulis matematika adalah ...',
    options: ['kilometer (km)', 'meter (m)', 'sentimeter (cm)', 'milimeter (mm)'],
    correctAnswer: 2,
    explanation: 'Buku tulis memiliki panjang sekitar 20–30 cm, sehingga satuan yang paling praktis dan tepat digunakan adalah sentimeter (cm).',
    hints: [
      'Bayangkan penggaris yang ada di kotak pensilmu.',
      'Penggaris sekolah biasanya menggunakan satuan sentimeter.',
      'Sentimeter (cm) paling pas untuk benda berukuran buku tulis.'
    ],
    skill: 'Memilih satuan panjang yang sesuai',
    estimatedTime: 15
  },

  // --- PENGUKURAN: MIDDLE (Composite length, Contextual weight, Area) ---
  {
    id: 'pengukuran_panjang_campur_mid_030',
    element: 'Pengukuran',
    subtopic: 'Operasi Satuan Panjang Campuran',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Siti mempunyai pita sepanjang 2 m 45 cm. Pita tersebut dipotong 1 m 20 cm untuk mengikat tanaman tomat. Berapa panjang sisa pita Siti?',
    options: ['1 m 15 cm', '1 m 25 cm', '1 m 35 cm', '2 m 25 cm'],
    correctAnswer: 1,
    explanation: 'Kurangkan satuan meter: 2 m - 1 m = 1 m. Kurangkan satuan cm: 45 cm - 20 cm = 25 cm. Sisa pita adalah 1 m 25 cm.',
    hints: [
      'Pisahkan perhitungan meter dan sentimeter.',
      'Meter: 2 m - 1 m = 1 m.',
      'Sentimeter: 45 cm - 20 cm = 25 cm. Gabungkan menjadi 1 m 25 cm.'
    ],
    skill: 'Menyelesaikan masalah pengurangan satuan panjang campuran',
    estimatedTime: 25
  },
  {
    id: 'pengukuran_berat_konteks_mid_031',
    element: 'Pengukuran',
    subtopic: 'Masalah Berat Buah dan Sayur',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Sebuah keranjang berisi 1 kg wortel dan 750 gram tomat. Berapa gram total berat isi keranjang tersebut?',
    options: ['1.500 gram', '1.750 gram', '1.850 gram', '2.000 gram'],
    correctAnswer: 1,
    explanation: 'Ubah semua satuan ke gram: 1 kg = 1.000 gram. Total berat = 1.000 gram + 750 gram = 1.750 gram.',
    hints: [
      'Ubah 1 kg menjadi gram terlebih dahulu: 1 kg = 1.000 gram.',
      'Jumlahkan dengan berat tomat: 1.000 g + 750 g.',
      'Hasilnya adalah 1.750 gram.'
    ],
    skill: 'Menjumlahkan satuan berat dengan konversi',
    estimatedTime: 25
  },
  {
    id: 'pengukuran_volume_kubus_mid_032',
    element: 'Pengukuran',
    subtopic: 'Volume Kubus Satuan',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Sebuah balok mainan tersusun dari 3 lapis kubus satuan. Setiap lapis terdiri atas 4 baris dan tiap baris ada 2 kubus. Berapa volume balok tersebut?',
    options: ['18 kubus satuan', '20 kubus satuan', '24 kubus satuan', '28 kubus satuan'],
    correctAnswer: 2,
    explanation: 'Kubus pada satu lapis = 4 × 2 = 8 kubus satuan. Karena ada 3 lapis, maka volume total = 3 × 8 = 24 kubus satuan.',
    hints: [
      'Hitung dulu jumlah kubus dalam satu lapis: 4 × 2 = 8 kubus.',
      'Kalikan dengan jumlah lapis (3 lapis): 8 × 3.',
      '8 × 3 = 24 kubus satuan.'
    ],
    skill: 'Menghitung volume benda dengan kubus satuan',
    estimatedTime: 30
  },

  // --- PENGUKURAN: HARD (Multi-step, Area difference, Estimation, Boss) ---
  {
    id: 'pengukuran_kebun_luas_hard_033',
    element: 'Pengukuran',
    subtopic: 'Penalaran Luas Kebun Sekolah',
    difficulty: 'HARD',
    type: 'multiple_choice',
    question: 'Kebun sekolah berbentuk persegi panjang dengan panjang 9 meter dan lebar 6 meter. Jika 1/3 luas kebun ditanami kangkung dan sisanya ditanami bayam, berapa m² luas kebun yang ditanami bayam?',
    options: ['18 m²', '24 m²', '36 m²', '54 m²'],
    correctAnswer: 2,
    explanation: 'Luas total kebun = 9 m × 6 m = 54 m². Luas kangkung = 1/3 × 54 = 18 m². Luas bayam = 54 m² - 18 m² = 36 m² (atau 2/3 × 54 = 36 m²).',
    hints: [
      'Langkah 1: Hitung luas total kebun (panjang × lebar): 9 × 6 = 54 m².',
      'Langkah 2: Luas kangkung adalah sepertiga dari total: 54 ÷ 3 = 18 m².',
      'Langkah 3: Kurangkan total dengan luas kangkung: 54 - 18 = 36 m².'
    ],
    skill: 'Memecahkan masalah luas bangun datar dan pecahan',
    estimatedTime: 50
  },
  {
    id: 'pengukuran_boss_air_hard_034',
    element: 'Pengukuran',
    subtopic: 'Tantangan Pengukuran Tangki Air',
    difficulty: 'HARD',
    type: 'multiple_choice',
    isBossQuestion: true,
    question: 'Sebuah drum penyiram tanaman berisi 5.000 gram pupuk cair. Pagi hari terpakai 1 kg 800 g, dan sore hari terpakai 1.500 g. Berapa gram sisa pupuk cair dalam drum?',
    options: ['1.500 gram', '1.700 gram', '1.800 gram', '2.200 gram'],
    correctAnswer: 1,
    explanation: '1 kg 800 g = 1.800 g. Total pemakaian = 1.800 g + 1.500 g = 3.300 g. Sisa pupuk = 5.000 g - 3.300 g = 1.700 gram.',
    hints: [
      'Ubah 1 kg 800 g menjadi gram: 1.000 + 800 = 1.800 gram.',
      'Hitung total yang sudah terpakai: 1.800 g + 1.500 g = 3.300 gram.',
      'Kurangkan dari isi mula-mula: 5.000 g - 3.300 g = 1.700 gram.'
    ],
    skill: 'Menganalisis masalah multi-langkah satuan berat',
    estimatedTime: 60
  },

  // =========================================================================
  // ELEMENT 4: GEOMETRI
  // =========================================================================

  // --- GEOMETRI: LOW (Sides, Vertices, Basic Triangle & Quadrilateral recognition) ---
  {
    id: 'geometri_segitiga_sifat_low_035',
    element: 'Geometri',
    subtopic: 'Sifat Bangun Segitiga',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Berapa banyak sisi dan titik sudut yang dimiliki oleh bangun datar segitiga?',
    options: [
      '3 sisi dan 3 titik sudut',
      '3 sisi dan 4 titik sudut',
      '4 sisi dan 3 titik sudut',
      '4 sisi dan 4 titik sudut'
    ],
    correctAnswer: 0,
    explanation: 'Segitiga adalah bangun datar segi banyak yang memiliki 3 buah sisi lurus dan 3 buah titik sudut.',
    hints: [
      'Kata "segitiga" berasal dari kata "tiga".',
      'Hitung garis tepi pembentuk segitiga (ada 3 sisi).',
      'Hitung titik pertemuan antar garisnya (ada 3 titik sudut).'
    ],
    skill: 'Mengidentifikasi jumlah sisi dan titik sudut segitiga',
    estimatedTime: 12
  },
  {
    id: 'geometri_persegi_sifat_low_036',
    element: 'Geometri',
    subtopic: 'Sifat Bangun Persegi',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Bangun datar yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku adalah ...',
    options: ['Persegi panjang', 'Persegi', 'Trapesium', 'Jajar genjang'],
    correctAnswer: 1,
    explanation: 'Persegi memiliki ciri khusus yaitu keempat sisinya berukuran sama panjang dan keempat sudutnya berupa sudut siku-siku (90°).',
    hints: [
      'Perhatikan kata kuncinya: keempat sisinya sama panjang.',
      'Semua sudutnya siku-siku.',
      'Bangun tersebut adalah persegi.'
    ],
    skill: 'Mengidentifikasi sifat bangun datar segiempat',
    estimatedTime: 15
  },
  {
    id: 'geometri_segi_banyak_low_037',
    element: 'Geometri',
    subtopic: 'Segi Banyak (Poligon)',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Bangun datar segi banyak yang memiliki tepat 5 sisi disebut ...',
    options: ['Segi empat', 'Segi lima (Pentagon)', 'Segi enam (Heksagon)', 'Segi delapan (Oktagon)'],
    correctAnswer: 1,
    explanation: 'Segi banyak dengan 5 sisi disebut segi lima (pentagon), sedangkan segi enam memiliki 6 sisi.',
    hints: [
      'Hitung jumlah sisi yang ditanyakan: 5 sisi.',
      'Nama bangun disesuaikan dengan jumlah sisinya: segi lima.',
      'Istilah lainnya adalah pentagon.'
    ],
    skill: 'Mengenal nama segi banyak berdasarkan jumlah sisi',
    estimatedTime: 12
  },
  {
    id: 'geometri_sudut_siku_low_038',
    element: 'Geometri',
    subtopic: 'Jenis Sudut Bangun Datar',
    difficulty: 'LOW',
    type: 'multiple_choice',
    question: 'Berapa banyak sudut siku-siku pada bangun persegi panjang?',
    options: ['1 sudut', '2 sudut', '3 sudut', '4 sudut'],
    correctAnswer: 3,
    explanation: 'Persegi panjang memiliki 4 titik sudut, dan keempat sudutnya merupakan sudut siku-siku (tegak lurus).',
    hints: [
      'Pojok-pojok buku atau layar meja berbentuk sudut siku-siku.',
      'Persegi panjang memiliki 4 pojok sudut.',
      'Semua 4 sudut tersebut adalah sudut siku-siku.'
    ],
    skill: 'Menentukan sudut siku-siku pada segiempat',
    estimatedTime: 15
  },

  // --- GEOMETRI: MIDDLE (Types of triangles, Trapezoid, Rhombus, Shape Composition) ---
  {
    id: 'geometri_jenis_segitiga_mid_039',
    element: 'Geometri',
    subtopic: 'Jenis-Jenis Segitiga',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Segitiga yang memiliki ketiga sisi sama panjang dan ketiga sudutnya sama besar disebut ...',
    options: [
      'Segitiga sama kaki',
      'Segitiga sama sisi',
      'Segitiga siku-siku',
      'Segitiga sembarang'
    ],
    correctAnswer: 1,
    explanation: 'Segitiga sama sisi memiliki ketiga sisi yang sama panjang dan ketiga sudutnya masing-masing sebesar 60°.',
    hints: [
      'Kata kuncinya: ketiga sisinya sama panjang.',
      'Segitiga sama kaki hanya memiliki 2 sisi sama panjang.',
      'Segitiga yang ketiga sisinya sama panjang disebut segitiga sama sisi.'
    ],
    skill: 'Membedakan jenis-jenis segitiga berdasarkan panjang sisi',
    estimatedTime: 20
  },
  {
    id: 'geometri_trapesium_mid_040',
    element: 'Geometri',
    subtopic: 'Sifat Khusus Segiempat',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Bangun segiempat yang memiliki tepat sepasang sisi yang sejajar adalah ...',
    options: ['Jajar genjang', 'Trapesium', 'Layang-layang', 'Persegi'],
    correctAnswer: 1,
    explanation: 'Trapesium didefinisikan sebagai bangun datar segiempat yang mempunyai tepat sepasang sisi sejajar (sisi atas dan sisi alas).',
    hints: [
      'Jajar genjang memiliki dua pasang sisi sejajar.',
      'Bangun yang hanya memiliki satu pasang sisi sejajar disebut trapesium.',
      'Bentuknya sering mirip atap rumah atau perahu.'
    ],
    skill: 'Mengidentifikasi ciri khusus trapesium',
    estimatedTime: 25
  },
  {
    id: 'geometri_komposisi_mid_041',
    element: 'Geometri',
    subtopic: 'Menyusun Bangun Datar',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    question: 'Dua buah segitiga siku-siku sama kaki yang berukuran sama jika sisi miringnya saling ditempelkan akan membentuk bangun datar ...',
    options: ['Persegi', 'Trapesium', 'Segi lima', 'Lingkaran'],
    correctAnswer: 0,
    explanation: 'Ketika dua segitiga siku-siku sama kaki digabungkan pada sisi miringnya, keempat sisinya menjadi sama panjang dan keempat sudutnya menjadi siku-siku, sehingga membentuk sebuah persegi.',
    hints: [
      'Bayangkan melipat selembar kertas persegi secara diagonal menjadi dua bagian segitiga.',
      'Jika dibalikkan dan digabung kembali pada garis lipatan miringnya, bentuk apa yang kembali muncul?',
      'Bentuk yang dihasilkan adalah persegi.'
    ],
    skill: 'Menyusun (komposisi) bangun datar dari bangun lain',
    estimatedTime: 25
  },

  // --- GEOMETRI: HARD (Decomposing shapes, Visual Tangram reasoning, Boss) ---
  {
    id: 'geometri_dekomposisi_hard_042',
    element: 'Geometri',
    subtopic: 'Mengurai Bangun Datar',
    difficulty: 'HARD',
    type: 'multiple_choice',
    question: 'Sebuah jajar genjang dapat diurai (dipotong dengan satu garis lurus) menjadi dua bangun datar. Manakah pasangan bangun datar yang DAPAT terbentuk?',
    options: [
      'Sebuah segitiga dan sebuah trapesium',
      'Dua buah lingkaran',
      'Dua buah segi lima',
      'Sebuah persegi dan sebuah lingkaran'
    ],
    correctAnswer: 0,
    explanation: 'Jika sebuah jajar genjang dipotong tegak lurus dari salah satu titik sudut atas ke sisi alas, akan terpisah menjadi sebuah segitiga siku-siku dan sebuah trapesium siku-siku.',
    hints: [
      'Bayangkan memotong bagian ujung miring jajar genjang secara lurus ke bawah.',
      'Satu potongan di ujung akan berbentuk segitiga.',
      'Bagian sisa yang memiliki sepasang sisi sejajar berbentuk trapesium.'
    ],
    skill: 'Menganalisis penguraian (dekomposisi) bangun datar',
    estimatedTime: 45
  },
  {
    id: 'geometri_boss_taman_hard_043',
    element: 'Geometri',
    subtopic: 'Tantangan Arsitektur Kebun STEAM',
    difficulty: 'HARD',
    type: 'multiple_choice',
    isBossQuestion: true,
    question: 'Taman bunga STEAM dirancang dari gabungan 1 buah persegi (sisi 6 m) dan 1 buah segitiga sama kaki yang menempel di salah satu sisinya dengan tinggi segitiga 4 m. Berapa luas total rancangan taman tersebut?',
    options: ['42 m²', '48 m²', '52 m²', '60 m²'],
    correctAnswer: 1,
    explanation: 'Luas persegi = sisi × sisi = 6 × 6 = 36 m². Alas segitiga = sisi persegi = 6 m. Luas segitiga = (alas × tinggi) ÷ 2 = (6 × 4) ÷ 2 = 12 m². Luas total taman = 36 + 12 = 48 m².',
    hints: [
      'Langkah 1: Hitung luas persegi: sisi × sisi = 6 × 6 = 36 m².',
      'Langkah 2: Hitung luas segitiga: (alas × tinggi) ÷ 2 = (6 × 4) ÷ 2 = 12 m².',
      'Langkah 3: Jumlahkan kedua luas tersebut: 36 + 12 = 48 m².'
    ],
    skill: 'Menghitung luas gabungan bangun datar sederhana',
    estimatedTime: 60
  },

  // =========================================================================
  // ELEMENT 5: DATA
  // =========================================================================

  // --- DATA: LOW (Reading simple table, Extremes, 1-to-1 Pictogram) ---
  {
    id: 'data_tabel_terbanyak_low_044',
    element: 'Data',
    subtopic: 'Membaca Tabel Data',
    difficulty: 'LOW',
    type: 'multiple_choice',
    visual: 'Tabel Tanaman: Mawar (8), Melati (12), Anggrek (5), Dahlia (9)',
    question: 'Berdasarkan data tanaman di atas, tanaman apakah yang jumlahnya PALING BANYAK?',
    options: ['Mawar', 'Melati', 'Anggrek', 'Dahlia'],
    correctAnswer: 1,
    explanation: 'Bandingkan angkanya: Mawar (8), Melati (12), Anggrek (5), Dahlia (9). Angka 12 adalah yang tertinggi, yaitu tanaman Melati.',
    hints: [
      'Periksa angka pada setiap jenis tanaman.',
      'Angka terbesar di antara 8, 12, 5, dan 9 adalah 12.',
      'Tanaman dengan jumlah 12 adalah Melati.'
    ],
    skill: 'Mengidentifikasi nilai data tertinggi pada tabel',
    estimatedTime: 15
  },
  {
    id: 'data_tabel_tersedikit_low_045',
    element: 'Data',
    subtopic: 'Membaca Tabel Data',
    difficulty: 'LOW',
    type: 'multiple_choice',
    visual: 'Data Panen: Senin (15 kg), Selasa (20 kg), Rabu (8 kg), Kamis (14 kg)',
    question: 'Pada hari apakah hasil panen tanaman PALING SEDIKIT?',
    options: ['Senin', 'Selasa', 'Rabu', 'Kamis'],
    correctAnswer: 2,
    explanation: 'Hasil panen pada hari Rabu adalah 8 kg, yang merupakan nilai terendah di antara hari lainnya (15 kg, 20 kg, 8 kg, 14 kg).',
    hints: [
      'Cari nilai yang paling kecil pada daftar panen.',
      'Bandingkan 15, 20, 8, dan 14.',
      'Nilai 8 kg berada pada hari Rabu.'
    ],
    skill: 'Mengidentifikasi nilai data terendah pada tabel',
    estimatedTime: 15
  },
  {
    id: 'data_piktogram_dasar_low_046',
    element: 'Data',
    subtopic: 'Piktogram (Diagram Gambar)',
    difficulty: 'LOW',
    type: 'multiple_choice',
    visual: 'Keterangan: Setiap 🌻 mewakili 1 tanaman matahari. Di baris kelas 4A ada: 🌻🌻🌻🌻🌻',
    question: 'Berapa banyak tanaman matahari milik kelas 4A?',
    options: ['4 tanaman', '5 tanaman', '6 tanaman', '10 tanaman'],
    correctAnswer: 1,
    explanation: 'Karena 1 simbol 🌻 bernilai 1 tanaman, maka 5 simbol 🌻 mewakili 5 × 1 = 5 tanaman.',
    hints: [
      'Perhatikan keterangan: 1 gambar 🌻 = 1 tanaman.',
      'Hitung banyaknya gambar bunga yang tertera.',
      'Ada 5 gambar bunga, berarti ada 5 tanaman.'
    ],
    skill: 'Membaca data piktogram dengan skala satu satuan',
    estimatedTime: 12
  },

  // --- DATA: MIDDLE (Pictogram with scale, Differences, Bar chart interpretation) ---
  {
    id: 'data_piktogram_skala_mid_047',
    element: 'Data',
    subtopic: 'Piktogram Berskala',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    visual: 'Keterangan: 1 simbol 🍅 = mewakili 5 buah tomat. Di keranjang Budi ada 4 simbol 🍅.',
    question: 'Berapakah jumlah buah tomat sebenarnya di keranjang Budi?',
    options: ['9 buah', '15 buah', '20 buah', '25 buah'],
    correctAnswer: 2,
    explanation: 'Setiap simbol 🍅 bernilai 5 buah. Jika ada 4 simbol, maka jumlah sebenarnya adalah 4 × 5 = 20 buah tomat.',
    hints: [
      'Perhatikan skala: 1 gambar mewakili 5 buah, bukan 1 buah.',
      'Kalikan jumlah simbol dengan nilai skalanya (4 × 5).',
      '4 × 5 = 20 buah tomat.'
    ],
    skill: 'Membaca piktogram dengan skala kelipatan bilangan',
    estimatedTime: 20
  },
  {
    id: 'data_selisih_batang_mid_048',
    element: 'Data',
    subtopic: 'Selisih Data Diagram Batang',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    visual: 'Pengunjung Perpustakaan: Kelas 4A (28 siswa), Kelas 4B (19 siswa)',
    question: 'Berapa selisih banyaknya siswa pengunjung perpustakaan antara Kelas 4A dan Kelas 4B?',
    options: ['7 siswa', '8 siswa', '9 siswa', '11 siswa'],
    correctAnswer: 2,
    explanation: 'Selisih dihitung dengan mengurangkan data yang lebih besar dengan data yang lebih kecil: 28 - 19 = 9 siswa.',
    hints: [
      'Kata "selisih" berarti nilai terbesar dikurangi nilai terkecil.',
      'Kurangkan 28 dengan 19.',
      '28 - 19 = 9 siswa.'
    ],
    skill: 'Menghitung selisih antar kategori pada data',
    estimatedTime: 20
  },
  {
    id: 'data_tabel_jumlah_mid_049',
    element: 'Data',
    subtopic: 'Menggabungkan Data',
    difficulty: 'MIDDLE',
    type: 'multiple_choice',
    visual: 'Bibit Tersedia: Cabai (35), Terong (42), Tomat (28)',
    question: 'Berapa jumlah total seluruh bibit sayuran yang tersedia?',
    options: ['95 bibit', '100 bibit', '105 bibit', '115 bibit'],
    correctAnswer: 2,
    explanation: 'Jumlah total = 35 + 42 + 28. (35 + 28 = 63; 63 + 42 = 105 bibit).',
    hints: [
      'Jumlahkan ketiga bilangan bibit tersebut.',
      '35 + 42 = 77.',
      '77 + 28 = 105 bibit.'
    ],
    skill: 'Menjumlahkan data dari beberapa kategori tabel',
    estimatedTime: 25
  },

  // --- DATA: HARD (Multi-step data reasoning, Bar chart comparisons, Boss) ---
  {
    id: 'data_analisis_target_hard_050',
    element: 'Data',
    subtopic: 'Analisis Data Terhadap Target',
    difficulty: 'HARD',
    type: 'multiple_choice',
    visual: 'Panen Sayur (kg): Senin (25), Selasa (35), Rabu (30), Kamis (40). Target harian sekolah adalah 32 kg.',
    question: 'Berapa hari hasil panen sayur sekolah BERHASIL MENCAPAI ATAU MELEBIHI target 32 kg?',
    options: ['1 hari', '2 hari', '3 hari', '4 hari'],
    correctAnswer: 1,
    explanation: 'Bandingkan dengan target 32 kg: Senin (25 < 32), Selasa (35 >= 32 [Ya]), Rabu (30 < 32), Kamis (40 >= 32 [Ya]). Hanya ada 2 hari (Selasa dan Kamis) yang memenuhi.',
    hints: [
      'Periksa satu per satu hari yang hasilnya minimal 32 kg.',
      'Selasa = 35 kg (memenuhi).',
      'Kamis = 40 kg (memenuhi). Total ada 2 hari.'
    ],
    skill: 'Menganalisis data berdasarkan kriteria tertentu',
    estimatedTime: 40
  },
  {
    id: 'data_boss_laporan_hard_051',
    element: 'Data',
    subtopic: 'Tantangan Master Data STEAM',
    difficulty: 'HARD',
    type: 'multiple_choice',
    isBossQuestion: true,
    visual: 'Data Penjualan Buah (kg): Jeruk (45), Apel (60), Mangga (35), Pisang (50). Setiap 1 kg buah dijual seharga Rp10.000.',
    question: 'Berapa selisih total hasil penjualan buah terbanyak dan buah tersedikit?',
    options: ['Rp150.000', 'Rp200.000', 'Rp250.000', 'Rp300.000'],
    correctAnswer: 2,
    explanation: 'Buah terbanyak = Apel (60 kg). Buah tersedikit = Mangga (35 kg). Selisih berat = 60 kg - 35 kg = 25 kg. Selisih hasil penjualan = 25 kg × Rp10.000 = Rp250.000.',
    hints: [
      'Langkah 1: Tentukan buah terbanyak (Apel: 60 kg) dan tersedikit (Mangga: 35 kg).',
      'Langkah 2: Hitung selisih beratnya: 60 - 35 = 25 kg.',
      'Langkah 3: Kalikan selisih berat dengan harga per kg: 25 × Rp10.000 = Rp250.000.'
    ],
    skill: 'Menyelesaikan masalah dua langkah data dan nilai kuantitas',
    estimatedTime: 60
  }
];

// Helper to convert MathQuestion to the legacy Question format if needed
export function toLegacyQuestion(mq: MathQuestion): import('../types').Question {
  return {
    id: mq.id,
    type: mq.element,
    difficulty: mq.difficulty,
    element: mq.element,
    subtopic: mq.subtopic,
    topic: `${mq.element}: ${mq.subtopic}`,
    questionText: mq.question,
    highlightText: mq.highlightText,
    visual: mq.visual,
    choices: [...mq.options],
    correctAnswerIndex: mq.correctAnswer,
    explanation: mq.explanation,
    hints: mq.hints,
    skill: mq.skill,
    estimatedTime: mq.estimatedTime,
    isBossQuestion: mq.isBossQuestion
  };
}

// Map of World IDs to Curriculum Elements
export const WORLD_ELEMENT_MAP: Record<number, MathElement> = {
  1: 'Bilangan',     // World 1: Number Forest
  2: 'Aljabar',      // World 2: Algebra Valley
  3: 'Pengukuran',   // World 3: Measurement Meadow
  4: 'Geometri',     // World 4: Geometry Garden
  5: 'Data'          // World 5: Data City
};
