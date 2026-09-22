import { Question, AdventureLevel } from '../types';

export const QUESTION_BANK: Question[] = [
  // ================= EASY =================
  // Type A: Persen -> Pecahan
  {
    id: 'q1',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'easy',
    topic: 'Persen ke Pecahan',
    questionText: 'Berapakah bentuk pecahan paling sederhana dari 50%?',
    highlightText: '50% = ?',
    choices: ['1/4', '1/2', '1/5', '2/3'],
    correctAnswerIndex: 1,
    explanation: '50% = 50/100. Jika pembilang dan penyebut sama-sama dibagi 50, hasilnya adalah 1/2.',
    hints: [
      'Ingat, tanda persen (%) berarti "per seratus".',
      '50% artinya 50 per 100 (50/100).',
      'Bagi pembilang dan penyebut dengan 50: 50÷50=1 dan 100÷50=2, jadi 1/2.'
    ]
  },
  {
    id: 'q2',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'easy',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 25% adalah...',
    highlightText: '25% = ?',
    choices: ['1/2', '1/4', '1/5', '3/4'],
    correctAnswerIndex: 1,
    explanation: '25% = 25/100. Bagi 25 di atas dan di bawah: 25÷25=1, 100÷25=4. Jadi bentuk sederhananya adalah 1/4.',
    hints: [
      'Persen adalah pecahan dengan penyebut 100.',
      'Tuliskan 25% sebagai 25/100.',
      'Bagi pembilang dan penyebut dengan angka 25.'
    ]
  },
  {
    id: 'q3',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'easy',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 75% adalah...',
    highlightText: '75% = ?',
    choices: ['1/4', '2/4', '3/4', '4/5'],
    correctAnswerIndex: 2,
    explanation: '75% = 75/100. Sederhanakan dengan membagi 25: 75÷25 = 3 dan 100÷25 = 4, menjadi 3/4.',
    hints: [
      '75% berarti 75 dari 100 bagian.',
      'Tuliskan 75/100.',
      '75 dan 100 sama-sama habis dibagi 25: hasilnya 3/4.'
    ]
  },
  {
    id: 'q4',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'easy',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan dari 10% adalah...',
    highlightText: '10% = ?',
    choices: ['1/10', '1/100', '1/5', '1/2'],
    correctAnswerIndex: 0,
    explanation: '10% = 10/100. Coret satu angka nol di atas dan bawah (bagi 10) menghasilkan 1/10.',
    hints: [
      'Persen artinya perseratus.',
      '10% = 10/100.',
      'Bagi atas dan bawah dengan 10, menjadi 1/10.'
    ]
  },
  {
    id: 'q5',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'easy',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan biasa dari 100% adalah...',
    highlightText: '100% = ?',
    choices: ['1/10', '1/2', '1', '10'],
    correctAnswerIndex: 2,
    explanation: '100% = 100/100 = 1 (utuh).',
    hints: [
      '100% berarti semua bagian penuh.',
      '100% = 100/100.',
      '100 dibagi 100 sama dengan 1.'
    ]
  },

  // Type B: Persen -> Desimal (Easy)
  {
    id: 'q6',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'easy',
    topic: 'Persen ke Desimal',
    questionText: 'Ubahlah 50% ke dalam bentuk bilangan desimal!',
    highlightText: '50% = ? (desimal)',
    choices: ['0,05', '0,5', '5,0', '50,0'],
    correctAnswerIndex: 1,
    explanation: '50% = 50/100 = 0,50 yang dapat disederhanakan menjadi 0,5.',
    hints: [
      'Mengubah persen ke desimal cukup membagi angkanya dengan 100.',
      'Geser tanda koma 2 langkah ke kiri dari angka 50.',
      '50 menjadi 0,50 atau ditulis 0,5.'
    ]
  },
  {
    id: 'q7',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'easy',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 25% adalah...',
    highlightText: '25% = ? (desimal)',
    choices: ['2,5', '0,25', '0,025', '25,0'],
    correctAnswerIndex: 1,
    explanation: '25% = 25/100 = 0,25.',
    hints: [
      '25% berarti 25 per seratus.',
      '25 dibagi 100 artinya menggeser koma dua kali ke kiri.',
      'Hasilnya adalah 0,25.'
    ]
  },
  {
    id: 'q8',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'easy',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 75% adalah...',
    highlightText: '75% = ? (desimal)',
    choices: ['0,75', '7,5', '0,075', '0,57'],
    correctAnswerIndex: 0,
    explanation: '75% = 75/100 = 0,75.',
    hints: [
      'Persen ke desimal: bagi angka dengan 100.',
      '75 : 100 = 0,75.',
      'Pilih 0,75.'
    ]
  },
  {
    id: 'q9',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'easy',
    topic: 'Persen ke Desimal',
    questionText: 'Berapakah 10% jika ditulis dalam desimal?',
    highlightText: '10% = ? (desimal)',
    choices: ['0,01', '0,1', '1,0', '0,11'],
    correctAnswerIndex: 1,
    explanation: '10% = 10/100 = 0,10 = 0,1.',
    hints: [
      '10% = 10 dibagi 100.',
      '10/100 = 0,10.',
      'Nol di belakang koma paling akhir dapat dihilangkan: 0,1.'
    ]
  },

  // Type D: Pernyataan Ekuivalen (Easy)
  {
    id: 'q10',
    type: 'D_IDENTIFY_CORRECT',
    difficulty: 'easy',
    topic: 'Hubungan Persen, Pecahan, & Desimal',
    questionText: 'Manakah pernyataan yang BENAR di bawah ini?',
    highlightText: 'Cari kesetaraan yang benar!',
    choices: [
      '50% = 1/5 = 0,5',
      '50% = 1/2 = 0,5',
      '50% = 1/4 = 0,25',
      '50% = 2/5 = 0,4'
    ],
    correctAnswerIndex: 1,
    explanation: '50% senilai dengan setengah (1/2) dan bernilai desimal 0,5.',
    hints: [
      '50% adalah separuh atau setengah.',
      'Setengah dalam pecahan ditulis 1/2.',
      'Dalam desimal, 1/2 sama dengan 0,5.'
    ]
  },

  // ================= MEDIUM =================
  // Type A: Persen -> Pecahan (Medium)
  {
    id: 'q11',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'medium',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 40% adalah...',
    highlightText: '40% = ?',
    choices: ['2/5', '4/10', '1/4', '3/5'],
    correctAnswerIndex: 0,
    explanation: '40% = 40/100. Bagi pembilang dan penyebut dengan 20: 40÷20 = 2 dan 100÷20 = 5, sehingga menjadi 2/5.',
    hints: [
      'Tuliskan 40/100.',
      'Sederhanakan dengan membagi angka 10 terlebih dahulu (4/10).',
      'Bagi lagi 4/10 dengan 2 untuk mendapatkan pecahan paling sederhana: 2/5.'
    ]
  },
  {
    id: 'q12',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'medium',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 60% adalah...',
    highlightText: '60% = ?',
    choices: ['3/5', '6/10', '2/3', '4/5'],
    correctAnswerIndex: 0,
    explanation: '60% = 60/100. Bagi pembilang dan penyebut dengan 20: 60÷20 = 3 dan 100÷20 = 5. Jadi 3/5.',
    hints: [
      '60% = 60/100.',
      'Coret nolnya jadi 6/10.',
      'Bagi 6 dan 10 dengan 2: hasilnya 3/5.'
    ]
  },
  {
    id: 'q13',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'medium',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 80% adalah...',
    highlightText: '80% = ?',
    choices: ['4/5', '8/10', '3/4', '5/8'],
    correctAnswerIndex: 0,
    explanation: '80% = 80/100. Sederhanakan dengan membagi 20: 80÷20 = 4 dan 100÷20 = 5, menghasilkan 4/5.',
    hints: [
      '80% artinya 80/100.',
      'FPB dari 80 dan 100 adalah 20.',
      '80÷20=4 dan 100÷20=5, maka jawabannya 4/5.'
    ]
  },
  {
    id: 'q14',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'medium',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 20% adalah...',
    highlightText: '20% = ?',
    choices: ['1/5', '2/10', '1/4', '1/2'],
    correctAnswerIndex: 0,
    explanation: '20% = 20/100. Bagi pembilang dan penyebut dengan 20: hasilnya 1/5.',
    hints: [
      '20% = 20/100.',
      '20 dikali berapa yang hasilnya 100? Dikali 5!',
      'Maka 20/100 = 1/5.'
    ]
  },
  {
    id: 'q15',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'medium',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 35% adalah...',
    highlightText: '35% = ?',
    choices: ['7/20', '3/5', '7/10', '35/50'],
    correctAnswerIndex: 0,
    explanation: '35% = 35/100. Bagi pembilang dan penyebut dengan 5: 35÷5 = 7 dan 100÷5 = 20, jadi 7/20.',
    hints: [
      '35% = 35/100.',
      'Angka yang berakhiran 5 dan 0 bisa dibagi 5.',
      '35÷5 = 7, dan 100÷5 = 20. Jadi 7/20.'
    ]
  },

  // Type B: Persen -> Desimal (Medium)
  {
    id: 'q16',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'medium',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 40% adalah...',
    highlightText: '40% = ? (desimal)',
    choices: ['0,04', '0,4', '4,0', '0,44'],
    correctAnswerIndex: 1,
    explanation: '40% = 40/100 = 0,40 = 0,4.',
    hints: [
      '40% dibagi 100.',
      'Geser tanda koma 2 kali ke kiri dari 40.',
      'Hasilnya 0,4.'
    ]
  },
  {
    id: 'q17',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'medium',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 60% adalah...',
    highlightText: '60% = ? (desimal)',
    choices: ['0,6', '0,06', '6,0', '0,66'],
    correctAnswerIndex: 0,
    explanation: '60% = 60/100 = 0,60 = 0,6.',
    hints: [
      'Bagi 60 dengan 100.',
      '60/100 = 0,60.',
      '0,60 sama nilainya dengan 0,6.'
    ]
  },
  {
    id: 'q18',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'medium',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 80% adalah...',
    highlightText: '80% = ? (desimal)',
    choices: ['0,8', '0,08', '8,0', '0,88'],
    correctAnswerIndex: 0,
    explanation: '80% = 80/100 = 0,80 = 0,8.',
    hints: [
      '80% = 80 per 100.',
      '80 dibagi 100 adalah 0,8.',
      'Pilih 0,8.'
    ]
  },
  {
    id: 'q19',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'medium',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 35% adalah...',
    highlightText: '35% = ? (desimal)',
    choices: ['0,35', '3,5', '0,035', '0,53'],
    correctAnswerIndex: 0,
    explanation: '35% = 35/100 = 0,35.',
    hints: [
      '35% artinya 35/100.',
      'Dua angka di belakang koma karena dibagi 100.',
      'Hasilnya 0,35.'
    ]
  },
  {
    id: 'q20',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'medium',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 5% adalah...',
    highlightText: '5% = ? (desimal)',
    choices: ['0,5', '0,05', '5,0', '0,005'],
    correctAnswerIndex: 1,
    explanation: '5% = 5/100 = 0,05. Hati-hati jangan tertukar dengan 50% (0,5)!',
    hints: [
      '5% = 5 dibagi 100.',
      'Geser koma 2 kali ke kiri dari angka 5: 5 -> 0,5 -> 0,05.',
      'Karena dibagi 100, ada 2 angka di belakang koma: 0,05.'
    ]
  },

  // Type C: Persen -> Pecahan DAN Desimal (Medium)
  {
    id: 'q21',
    type: 'C_PERCENT_TO_BOTH',
    difficulty: 'medium',
    topic: 'Pecahan & Desimal Lengkap',
    questionText: 'Bentuk pecahan paling sederhana dan desimal dari 40% adalah...',
    highlightText: '40% = ... dan ...',
    choices: [
      '2/5 dan 0,4',
      '4/5 dan 0,4',
      '2/5 dan 4,0',
      '4/10 dan 4,0'
    ],
    correctAnswerIndex: 0,
    explanation: '40% = 40/100 = 2/5 dan dalam desimal 40/100 = 0,4.',
    hints: [
      'Cari dulu pecahannya: 40/100 = 2/5.',
      'Lalu cari desimalnya: 40/100 = 0,4.',
      'Gabungkan keduanya: 2/5 dan 0,4.'
    ]
  },
  {
    id: 'q22',
    type: 'C_PERCENT_TO_BOTH',
    difficulty: 'medium',
    topic: 'Pecahan & Desimal Lengkap',
    questionText: 'Bentuk pecahan paling sederhana dan desimal dari 20% adalah...',
    highlightText: '20% = ... dan ...',
    choices: [
      '1/5 dan 0,2',
      '2/5 dan 0,2',
      '1/5 dan 0,02',
      '1/4 dan 0,25'
    ],
    correctAnswerIndex: 0,
    explanation: '20% = 20/100 = 1/5 dan dalam desimal 20/100 = 0,2.',
    hints: [
      '20% = 20/100 = 1/5.',
      '20 dibagi 100 = 0,2.',
      'Pilih pasangan 1/5 dan 0,2.'
    ]
  },
  {
    id: 'q23',
    type: 'C_PERCENT_TO_BOTH',
    difficulty: 'medium',
    topic: 'Pecahan & Desimal Lengkap',
    questionText: 'Bentuk pecahan paling sederhana dan desimal dari 75% adalah...',
    highlightText: '75% = ... dan ...',
    choices: [
      '3/4 dan 0,75',
      '3/5 dan 0,75',
      '1/4 dan 0,75',
      '3/4 dan 7,5'
    ],
    correctAnswerIndex: 0,
    explanation: '75% = 75/100 = 3/4 dan 75/100 = 0,75.',
    hints: [
      '75% jika disederhanakan dibagi 25 menjadi 3/4.',
      'Bentuk desimal dari 75% adalah 0,75.',
      'Pilih pasangan 3/4 dan 0,75.'
    ]
  },

  // Type D: Identifikasi Ekuivalen (Medium)
  {
    id: 'q24',
    type: 'D_IDENTIFY_CORRECT',
    difficulty: 'medium',
    topic: 'Hubungan Persen, Pecahan, & Desimal',
    questionText: 'Manakah kesetaraan berikut yang SALAH?',
    highlightText: 'Cari yang SALAH!',
    choices: [
      '25% = 1/4 = 0,25',
      '50% = 1/2 = 0,5',
      '80% = 4/5 = 0,8',
      '60% = 2/5 = 0,6'
    ],
    correctAnswerIndex: 3,
    explanation: 'Pernyataan 60% = 2/5 = 0,6 adalah SALAH karena 60% seharusnya 3/5, bukan 2/5 (2/5 = 40%).',
    hints: [
      'Periksa satu per satu kesetaraan pecahan.',
      '60% = 60/100. Jika dibagi 20 menghasilkan 3/5.',
      'Pilihan D menuliskan 2/5, padahal harusnya 3/5.'
    ]
  },
  {
    id: 'q25',
    type: 'D_IDENTIFY_CORRECT',
    difficulty: 'medium',
    topic: 'Hubungan Persen, Pecahan, & Desimal',
    questionText: 'Manakah pernyataan yang BENAR di bawah ini?',
    highlightText: 'Pilih yang BENAR!',
    choices: [
      '20% = 1/4 = 0,2',
      '20% = 1/5 = 0,2',
      '20% = 2/5 = 0,02',
      '20% = 1/5 = 0,02'
    ],
    correctAnswerIndex: 1,
    explanation: '20% = 20/100 = 1/5 = 0,2. Semuanya setara dan benar.',
    hints: [
      '20% = 20/100.',
      '20/100 disederhanakan menjadi 1/5.',
      'Bentuk desimalnya adalah 0,2.'
    ]
  },

  // ================= HARD =================
  // Type A: Persen -> Pecahan (Hard)
  {
    id: 'q26',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'hard',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 65% adalah...',
    highlightText: '65% = ?',
    choices: ['13/20', '6/10', '13/25', '7/10'],
    correctAnswerIndex: 0,
    explanation: '65% = 65/100. Bagi pembilang dan penyebut dengan 5: 65÷5 = 13 dan 100÷5 = 20, sehingga menjadi 13/20.',
    hints: [
      'Tuliskan 65/100.',
      'Karena berakhiran 5 dan 0, bagi keduanya dengan angka 5.',
      '65 dibagi 5 adalah 13, dan 100 dibagi 5 adalah 20. Jadi 13/20.'
    ]
  },
  {
    id: 'q27',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'hard',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 45% adalah...',
    highlightText: '45% = ?',
    choices: ['9/20', '4/10', '9/25', '2/5'],
    correctAnswerIndex: 0,
    explanation: '45% = 45/100. Bagi pembilang dan penyebut dengan 5: 45÷5 = 9 dan 100÷5 = 20. Hasilnya 9/20.',
    hints: [
      '45% = 45/100.',
      'Bagi pembilang dan penyebut dengan angka 5.',
      '45÷5 = 9, 100÷5 = 20. Jadi 9/20.'
    ]
  },
  {
    id: 'q28',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'hard',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 15% adalah...',
    highlightText: '15% = ?',
    choices: ['3/20', '1/5', '3/10', '15/50'],
    correctAnswerIndex: 0,
    explanation: '15% = 15/100. Sederhanakan dengan membagi 5: 15÷5 = 3 dan 100÷5 = 20, menjadi 3/20.',
    hints: [
      '15% = 15/100.',
      'Bagi dengan angka 5.',
      '15÷5 = 3, 100÷5 = 20. Maka hasilnya 3/20.'
    ]
  },
  {
    id: 'q29',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'hard',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 85% adalah...',
    highlightText: '85% = ?',
    choices: ['17/20', '8/10', '17/25', '4/5'],
    correctAnswerIndex: 0,
    explanation: '85% = 85/100. Bagi 5 di atas dan bawah: 85÷5 = 17 dan 100÷5 = 20, menghasilkan 17/20.',
    hints: [
      '85% = 85/100.',
      'Bagi pembilang dan penyebut dengan 5.',
      '85÷5 = 17, 100÷5 = 20.'
    ]
  },
  {
    id: 'q30',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'hard',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 90% adalah...',
    highlightText: '90% = ?',
    choices: ['9/10', '9/100', '4/5', '19/20'],
    correctAnswerIndex: 0,
    explanation: '90% = 90/100. Bagi dengan 10: 90÷10 = 9 dan 100÷10 = 10, jadi 9/10.',
    hints: [
      '90% = 90/100.',
      'Coret satu nol di atas dan bawah.',
      'Tersisa 9/10.'
    ]
  },

  // Type B: Persen -> Desimal (Hard)
  {
    id: 'q31',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'hard',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 65% adalah...',
    highlightText: '65% = ? (desimal)',
    choices: ['0,65', '6,5', '0,065', '0,56'],
    correctAnswerIndex: 0,
    explanation: '65% = 65/100 = 0,65.',
    hints: [
      'Bagi 65 dengan 100.',
      'Geser tanda koma 2 kali ke kiri.',
      'Hasilnya 0,65.'
    ]
  },
  {
    id: 'q32',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'hard',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 45% adalah...',
    highlightText: '45% = ? (desimal)',
    choices: ['0,45', '4,5', '0,045', '0,54'],
    correctAnswerIndex: 0,
    explanation: '45% = 45/100 = 0,45.',
    hints: [
      '45% = 45 per seratus.',
      '45/100 dalam desimal adalah 0,45.',
      'Pilih 0,45.'
    ]
  },
  {
    id: 'q33',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'hard',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 15% adalah...',
    highlightText: '15% = ? (desimal)',
    choices: ['0,15', '1,5', '0,015', '0,51'],
    correctAnswerIndex: 0,
    explanation: '15% = 15/100 = 0,15.',
    hints: [
      '15% = 15/100.',
      'Geser koma 2 kali ke kiri dari 15.',
      'Menjadi 0,15.'
    ]
  },
  {
    id: 'q34',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'hard',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 8% adalah...',
    highlightText: '8% = ? (desimal)',
    choices: ['0,8', '0,08', '8,0', '0,008'],
    correctAnswerIndex: 1,
    explanation: '8% = 8/100 = 0,08. Ingat bahwa 0,8 adalah 80%!',
    hints: [
      '8% = 8 per seratus.',
      'Karena dibagi 100, geser koma 2 langkah: 8 -> 0,8 -> 0,08.',
      'Maka bentuk desimalnya adalah 0,08.'
    ]
  },
  {
    id: 'q35',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'hard',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 90% adalah...',
    highlightText: '90% = ? (desimal)',
    choices: ['0,9', '0,09', '9,0', '0,99'],
    correctAnswerIndex: 0,
    explanation: '90% = 90/100 = 0,90 = 0,9.',
    hints: [
      '90% = 90/100.',
      '90/100 = 0,90.',
      'Nol di paling belakang setelah koma dihilangkan: 0,9.'
    ]
  },

  // Type C: Persen -> Pecahan DAN Desimal (Hard)
  {
    id: 'q36',
    type: 'C_PERCENT_TO_BOTH',
    difficulty: 'hard',
    topic: 'Pecahan & Desimal Lengkap',
    questionText: 'Bentuk pecahan paling sederhana dan desimal dari 60% adalah...',
    highlightText: '60% = ... dan ...',
    choices: [
      '3/5 dan 0,6',
      '2/5 dan 0,6',
      '3/5 dan 0,06',
      '6/10 dan 6,0'
    ],
    correctAnswerIndex: 0,
    explanation: '60% = 60/100 = 3/5 dan 60/100 = 0,6.',
    hints: [
      '60% = 60/100. Sederhanakan dibagi 20: 3/5.',
      'Dalam desimal: 60/100 = 0,60 = 0,6.',
      'Pasangan yang benar: 3/5 dan 0,6.'
    ]
  },
  {
    id: 'q37',
    type: 'C_PERCENT_TO_BOTH',
    difficulty: 'hard',
    topic: 'Pecahan & Desimal Lengkap',
    questionText: 'Bentuk pecahan paling sederhana dan desimal dari 80% adalah...',
    highlightText: '80% = ... dan ...',
    choices: [
      '4/5 dan 0,8',
      '3/5 dan 0,8',
      '4/5 dan 0,08',
      '8/10 dan 8,0'
    ],
    correctAnswerIndex: 0,
    explanation: '80% = 80/100 = 4/5 dan 80/100 = 0,8.',
    hints: [
      '80% = 80/100 = 4/5.',
      '80% = 0,80 = 0,8.',
      'Pilih 4/5 dan 0,8.'
    ]
  },
  {
    id: 'q38',
    type: 'C_PERCENT_TO_BOTH',
    difficulty: 'hard',
    topic: 'Pecahan & Desimal Lengkap',
    questionText: 'Bentuk pecahan paling sederhana dan desimal dari 35% adalah...',
    highlightText: '35% = ... dan ...',
    choices: [
      '7/20 dan 0,35',
      '7/20 dan 3,5',
      '3/5 dan 0,35',
      '7/10 dan 0,35'
    ],
    correctAnswerIndex: 0,
    explanation: '35% = 35/100 = 7/20 dan 35/100 = 0,35.',
    hints: [
      '35% = 35/100.',
      'Bagi 5 menjadi 7/20.',
      'Desimalnya 0,35. Pilih 7/20 dan 0,35.'
    ]
  },

  // Type D: Identifikasi Ekuivalen (Hard)
  {
    id: 'q39',
    type: 'D_IDENTIFY_CORRECT',
    difficulty: 'hard',
    topic: 'Hubungan Persen, Pecahan, & Desimal',
    questionText: 'Manakah dari pernyataan berikut yang BENAR?',
    highlightText: 'Pilih yang paling tepat!',
    choices: [
      '15% = 3/20 = 0,15',
      '15% = 1/5 = 0,15',
      '15% = 3/10 = 0,15',
      '15% = 3/20 = 1,5'
    ],
    correctAnswerIndex: 0,
    explanation: '15% = 15/100 = 3/20 dan bentuk desimalnya 0,15.',
    hints: [
      '15% = 15/100.',
      'Bagi 5: 15÷5 = 3, 100÷5 = 20.',
      'Desimalnya 0,15. Maka pilihan A benar.'
    ]
  },
  {
    id: 'q40',
    type: 'D_IDENTIFY_CORRECT',
    difficulty: 'hard',
    topic: 'Hubungan Persen, Pecahan, & Desimal',
    questionText: 'Pak Budi memanen 100 buah mangga, dan 45 di antaranya sudah matang. Berapa persen dan desimal mangga yang matang?',
    highlightText: '45 dari 100 mangga = ?',
    choices: [
      '45% dan 0,45',
      '45% dan 4,5',
      '4,5% dan 0,45',
      '55% dan 0,55'
    ],
    correctAnswerIndex: 0,
    explanation: '45 dari 100 artinya 45/100 = 45% dan desimalnya adalah 0,45.',
    hints: [
      'Banyak mangga matang per total: 45/100.',
      'Pecahan per seratus langsung menunjukkan persen: 45%.',
      'Bentuk desimalnya adalah 45 dibagi 100 = 0,45.'
    ]
  },
  {
    id: 'q41',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'easy',
    topic: 'Persen ke Pecahan',
    questionText: 'Jika sebuah kue dipotong menjadi 100 bagian sama besar, lalu Siti mengambil 30 bagian, berapa persen dan pecahan bagian Siti?',
    highlightText: '30 dari 100 bagian = ?',
    choices: ['30% atau 3/10', '30% atau 3/100', '3% atau 3/10', '30% atau 1/3'],
    correctAnswerIndex: 0,
    explanation: '30 dari 100 bagian = 30/100 = 30%. Sederhananya 30/100 = 3/10.',
    hints: [
      '30 dari 100 = 30/100.',
      '30/100 = 30%.',
      'Bagi 10 pembilang dan penyebut: 3/10.'
    ]
  },
  {
    id: 'q42',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'easy',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 30% adalah...',
    highlightText: '30% = ? (desimal)',
    choices: ['0,3', '0,03', '3,0', '0,33'],
    correctAnswerIndex: 0,
    explanation: '30% = 30/100 = 0,30 = 0,3.',
    hints: [
      '30% = 30/100.',
      '30 : 100 = 0,30.',
      'Disederhanakan menjadi 0,3.'
    ]
  },
  {
    id: 'q43',
    type: 'A_PERCENT_TO_FRACTION',
    difficulty: 'medium',
    topic: 'Persen ke Pecahan',
    questionText: 'Bentuk pecahan paling sederhana dari 70% adalah...',
    highlightText: '70% = ?',
    choices: ['7/10', '7/100', '3/5', '7/20'],
    correctAnswerIndex: 0,
    explanation: '70% = 70/100. Bagi 10 pada pembilang dan penyebut: 7/10.',
    hints: [
      '70% = 70/100.',
      'Coret satu nol: 7/10.',
      '7/10 sudah tidak bisa disederhanakan lagi.'
    ]
  },
  {
    id: 'q44',
    type: 'B_PERCENT_TO_DECIMAL',
    difficulty: 'medium',
    topic: 'Persen ke Desimal',
    questionText: 'Bentuk desimal dari 70% adalah...',
    highlightText: '70% = ? (desimal)',
    choices: ['0,7', '0,07', '7,0', '0,77'],
    correctAnswerIndex: 0,
    explanation: '70% = 70/100 = 0,70 = 0,7.',
    hints: [
      '70 dibagi 100.',
      '70/100 = 0,70 = 0,7.',
      'Pilih 0,7.'
    ]
  },
  {
    id: 'q45',
    type: 'D_IDENTIFY_CORRECT',
    difficulty: 'medium',
    topic: 'Hubungan Persen, Pecahan, & Desimal',
    questionText: 'Urutkan dari nilai yang terkecil ke terbesar: 25%, 0,5, dan 1/5!',
    highlightText: 'Urutkan: 25%, 0,5, 1/5',
    choices: [
      '1/5 (20%) < 25% < 0,5 (50%)',
      '25% < 1/5 (20%) < 0,5 (50%)',
      '0,5 (50%) < 25% < 1/5 (20%)',
      '1/5 (20%) < 0,5 (50%) < 25%'
    ],
    correctAnswerIndex: 0,
    explanation: 'Ubah semua ke persen: 1/5 = 20%, 25% = 25%, 0,5 = 50%. Jadi urutannya adalah 1/5 (20%) < 25% < 0,5 (50%).',
    hints: [
      'Ubah semuanya ke persen terlebih dahulu.',
      '1/5 = 20/100 = 20%.',
      '0,5 = 50/100 = 50%.',
      'Maka urutan dari kecil: 20% (1/5), lalu 25%, lalu 50% (0,5).'
    ]
  }
];

// Helper to shuffle choices and return randomized array with updated correct index
export function getRandomizedQuestion(question: Question): Question {
  const originalChoices = [...question.choices];
  const correctAnswer = originalChoices[question.correctAnswerIndex];

  // Fisher-Yates shuffle
  const shuffledChoices = [...originalChoices];
  for (let i = shuffledChoices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
  }

  const newCorrectIndex = shuffledChoices.indexOf(correctAnswer);

  return {
    ...question,
    choices: shuffledChoices,
    correctAnswerIndex: newCorrectIndex
  };
}

// User Requirement:
// Level Soal "Lower": Bilangan persen yang mudah-mudah saja langsung dirubah ke pecahan desimal atau bilangan desimal.
// Level "Middle": Soal yang sedang dengan menghubungkan pecahan persen dan pecahan biasa dan desimal.
// Level "Strong": Soal sulit / penalaran HOTS.
export function getQuestionsByAdventureLevel(level: AdventureLevel): Question[] {
  if (level === 'lower') {
    const list = QUESTION_BANK.filter(
      (q) =>
        q.type === 'B_PERCENT_TO_DECIMAL' ||
        (q.difficulty === 'easy' && q.type === 'A_PERCENT_TO_FRACTION')
    );
    return list.length > 0 ? list : QUESTION_BANK;
  }
  if (level === 'middle') {
    const list = QUESTION_BANK.filter(
      (q) =>
        q.type === 'C_PERCENT_TO_BOTH' ||
        q.type === 'D_IDENTIFY_CORRECT' ||
        q.difficulty === 'medium'
    );
    return list.length > 0 ? list : QUESTION_BANK;
  }
  // 'strong'
  const list = QUESTION_BANK.filter(
    (q) => q.difficulty === 'hard' || q.type === 'C_PERCENT_TO_BOTH' || q.type === 'D_IDENTIFY_CORRECT'
  );
  return list.length > 0 ? list : QUESTION_BANK;
}

