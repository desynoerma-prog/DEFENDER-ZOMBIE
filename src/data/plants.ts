import { PlantCard, PlantType } from '../types';

export interface AlmanacPlantEntry {
  type: PlantType | string;
  name: string;
  category: 'day' | 'night' | 'pool' | 'fog' | 'roof' | 'upgrade';
  cost: number;
  damage: string;
  recharge: string;
  mathSkill: string;
  description: string;
  playable: boolean;
  rowInImage: number;
}

export const PLANT_CARDS: PlantCard[] = [
  {
    type: 'peashooter',
    name: 'Peashooter (Penembak Kacang)',
    cost: 100,
    cooldown: 5,
    icon: '🌱',
    description: 'Menembakkan proyektil kacang pecahan ke zombie di jalurnya.'
  },
  {
    type: 'sunflower',
    name: 'Sunflower (Bunga Matahari)',
    cost: 50,
    cooldown: 5,
    icon: '🌻',
    description: 'Menghasilkan 50 energi matahari untuk membeli tanaman bertahan.'
  },
  {
    type: 'cherrybomb',
    name: 'Cherry Bomb (Bom Ceri)',
    cost: 150,
    cooldown: 20,
    icon: '🍒',
    description: 'Meledakkan semua zombie di area 3×3 seketika dengan daya ledak tinggi!'
  },
  {
    type: 'wallnut',
    name: 'Wall-nut (Benteng Kacang)',
    cost: 50,
    cooldown: 15,
    icon: '🥔',
    description: 'Memiliki kulit cangkang sangat keras untuk menghalangi laju zombie.'
  },
  {
    type: 'potatomine',
    name: 'Potato Mine (Ranjau Kentang)',
    cost: 25,
    cooldown: 18,
    icon: '🥔',
    description: 'Ranjau tanah yang meledak (SPUDOW!) saat diinjak zombie.'
  },
  {
    type: 'iceshooter',
    name: 'Snow Pea (Penembak Es)',
    cost: 175,
    cooldown: 7,
    icon: '❄️',
    description: 'Menembakkan proyektil es kristal yang membekukan dan memperlambat zombie.'
  },
  {
    type: 'chomper',
    name: 'Chomper (Bunga Pemangsa)',
    cost: 150,
    cooldown: 10,
    icon: '👄',
    description: 'Membuka rahang tajamnya dan menelan zombie utuh dalam sekejap!'
  },
  {
    type: 'repeater',
    name: 'Repeater (Penembak Ganda)',
    cost: 200,
    cooldown: 7,
    icon: '🌿',
    description: 'Menembakkan 2 butir kacang pecahan berturut-turut ke arah musuh.'
  },
  {
    type: 'threepeater',
    name: 'Threepeater (Penembak 3 Baris)',
    cost: 325,
    cooldown: 8,
    icon: '🔱',
    description: 'Senjata legendaris! Menembakkan kacang ke 3 baris sekaligus!'
  },
  {
    type: 'squash',
    name: 'Squash (Labu Penghantam)',
    cost: 50,
    cooldown: 15,
    icon: '🍈',
    description: 'Melompat tinggi dan menghantam zombie di depannya sampai pipih!'
  },
  {
    type: 'jalapeno',
    name: 'Jalapeno (Cabai Api Membara)',
    cost: 125,
    cooldown: 20,
    icon: '🌶️',
    description: 'Membakar seluruh zombie dalam satu baris penuh menjadi abu!'
  },
  {
    type: 'torchwood',
    name: 'Torchwood (Kayu Obor Api)',
    cost: 175,
    cooldown: 7,
    icon: '🪵',
    description: 'Mengubah peluru kacang biasa menjadi bola api yang menghasilkan kerusakan ganda!'
  },
  {
    type: 'tallnut',
    name: 'Tall-nut (Kacang Raksasa)',
    cost: 125,
    cooldown: 20,
    icon: '🛡️',
    description: 'Kacang bertubuh raksasa dengan HP ganda yang tidak bisa dilompati!'
  },
  {
    type: 'gatlingpea',
    name: 'Gatling Pea (Meriam 4 Laras)',
    cost: 250,
    cooldown: 10,
    icon: '🎖️',
    description: 'Helm baja militer! Menembakkan rentetan 4 peluru kacang super cepat!'
  },
  {
    type: 'twinsunflower',
    name: 'Twin Sunflower (Bunga Matahari Kembar)',
    cost: 150,
    cooldown: 10,
    icon: '🌻🌻',
    description: 'Dua kepala bunga matahari ceria yang menghasilkan 2× lipat matahari!'
  }
];

// Complete Almanac catalog corresponding to the user's p_almanac_big.webp
export const ALL_ALMANAC_PLANTS: AlmanacPlantEntry[] = [
  // ROW 1
  {
    type: 'peashooter',
    name: 'Peashooter',
    category: 'day',
    cost: 100,
    damage: 'Normal (30)',
    recharge: 'Cepat (5 detik)',
    mathSkill: 'Menembakkan proyektil pecahan 1/2 dan 1/4 yang menyamakan penyebut!',
    description: 'Garis pertahanan pertama rumahmu. Menembakkan kacang ke arah zombie yang mendekat.',
    playable: true,
    rowInImage: 1
  },
  {
    type: 'sunflower',
    name: 'Sunflower',
    category: 'day',
    cost: 50,
    damage: 'Tidak Ada',
    recharge: 'Cepat (5 detik)',
    mathSkill: 'Menghasilkan 50 Matahari per siklus, mengajarkan kelipatan 50 dan persentase!',
    description: 'Tanaman paling penting yang memancarkan energi matahari untuk membeli pertahanan tanaman lainnya.',
    playable: true,
    rowInImage: 1
  },
  {
    type: 'cherrybomb',
    name: 'Cherry Bomb',
    category: 'day',
    cost: 150,
    damage: 'Dahsyat (500)',
    recharge: 'Sangat Lambat (20 detik)',
    mathSkill: 'Meledakkan area matriks 3×3 = 9 petak secara serentak!',
    description: 'Dua saudara ceri pemarah yang langsung meledakkan seluruh zombie di sekitarnya.',
    playable: true,
    rowInImage: 1
  },
  {
    type: 'wallnut',
    name: 'Wall-nut',
    category: 'day',
    cost: 50,
    damage: 'Tidak Ada (HP 400)',
    recharge: 'Lambat (15 detik)',
    mathSkill: 'Menunjukkan pengurangan pecahan HP saat digigit dari 100% → 66% → 33%!',
    description: 'Benteng pertahanan kokoh yang tersenyum ramah dan mengulur waktu agar tanaman penembakmu aman.',
    playable: true,
    rowInImage: 1
  },
  {
    type: 'potatomine',
    name: 'Potato Mine',
    category: 'day',
    cost: 25,
    damage: 'Dahsyat (500)',
    recharge: 'Lambat (18 detik)',
    mathSkill: 'Menghitung waktu jeda 4 detik sebelum berseru "SPUDOW!"',
    description: 'Murah dan mematikan. Butuh waktu untuk mengaktifkan antenanya di dalam tanah.',
    playable: true,
    rowInImage: 1
  },
  {
    type: 'iceshooter',
    name: 'Snow Pea',
    category: 'day',
    cost: 175,
    damage: 'Normal (30) + Efek Beku',
    recharge: 'Cepat (7 detik)',
    mathSkill: 'Mengurangi kecepatan gerak zombie sebesar 50% (setengah kali lebih lambat)!',
    description: 'Menembakkan proyektil es kristal yang membekukan zombie dan memperlambat serangannya.',
    playable: true,
    rowInImage: 1
  },
  {
    type: 'chomper',
    name: 'Chomper',
    category: 'day',
    cost: 150,
    damage: 'Seketika (Instant K.O.)',
    recharge: 'Cepat (10 detik)',
    mathSkill: 'Menelan 1 zombie utuh = mengeliminasi nilai penyebut zombie seketika!',
    description: 'Bunga pemangsa ungu raksasa yang mampu menelan satu zombie utuh, lalu mengunyahnya perlahan.',
    playable: true,
    rowInImage: 1
  },
  {
    type: 'repeater',
    name: 'Repeater',
    category: 'day',
    cost: 200,
    damage: '2× Normal (60 per putaran)',
    recharge: 'Cepat (7 detik)',
    mathSkill: 'Konsep perkalian 2×: Menembakkan 2 butir kacang pecahan berturut-turut!',
    description: 'Peashooter yang berlatih keras dan kini mampu melipatgandakan serangannya.',
    playable: true,
    rowInImage: 1
  },
  {
    type: 'puffshroom',
    name: 'Puff-shroom',
    category: 'night',
    cost: 0,
    damage: 'Normal (Jarak Dekat)',
    recharge: 'Sangat Cepat',
    mathSkill: 'Nilai 0 (Nol)! Gratis tanpa biaya matahari sama sekali.',
    description: 'Jamur kecil gratis yang menembakkan spora jarak pendek di waktu malam.',
    playable: false,
    rowInImage: 1
  },

  // ROW 2
  {
    type: 'sunshroom',
    name: 'Sun-shroom',
    category: 'night',
    cost: 25,
    damage: 'Tidak Ada',
    recharge: 'Cepat',
    mathSkill: 'Pertumbuhan pecahan: Awalnya 15 matahari (30%), lalu tumbuh menjadi 25 matahari (100%)!',
    description: 'Jamur malam yang membesar seiring berjalannya waktu dan menghasilkan lebih banyak matahari.',
    playable: false,
    rowInImage: 2
  },
  {
    type: 'fumeshroom',
    name: 'Fume-shroom',
    category: 'night',
    cost: 75,
    damage: 'Tembus Pelindung',
    recharge: 'Cepat',
    mathSkill: 'Menembus pelindung ember/kerucut secara langsung.',
    description: 'Menyemprotkan asap ungu yang menembus kerucut dan pintu kasa zombie.',
    playable: false,
    rowInImage: 2
  },
  {
    type: 'gravebuster',
    name: 'Grave Buster',
    category: 'night',
    cost: 75,
    damage: 'Menghancurkan Batu Nisan',
    recharge: 'Cepat',
    mathSkill: 'Mereduksi batu nisan dari 1 menjadi 0.',
    description: 'Tanaman menjalar yang ditanam di atas batu nisan untuk melenyapkannya.',
    playable: false,
    rowInImage: 2
  },
  {
    type: 'hypnoshroom',
    name: 'Hypno-shroom',
    category: 'night',
    cost: 75,
    damage: 'Membalikkan Arah Zombie',
    recharge: 'Lambat',
    mathSkill: 'Mengalikan arah vektor gerak dengan -1 (berbalik menyerang kawannya)!',
    description: 'Ketika dimakan zombie, membuat zombie terhipnotis dan berbalik membantumu.',
    playable: false,
    rowInImage: 2
  },
  {
    type: 'scaredyshroom',
    name: 'Scaredy-shroom',
    category: 'night',
    cost: 25,
    damage: 'Normal (Jarak Jauh)',
    recharge: 'Cepat',
    mathSkill: 'Pengukuran jarak: Bersembunyi jika zombie berada dalam jarak < 2 petak.',
    description: 'Penembak spora jarak jauh yang pemalu dan akan bersembunyi jika zombie mendekat.',
    playable: false,
    rowInImage: 2
  },
  {
    type: 'iceshroom',
    name: 'Ice-shroom',
    category: 'night',
    cost: 75,
    damage: 'Membekukan Seluruh Layar',
    recharge: 'Sangat Lambat',
    mathSkill: 'Membuat kecepatan seluruh elemen dalam matriks menjadi 0 untuk beberapa detik!',
    description: 'Membekukan semua zombie di layar seketika.',
    playable: false,
    rowInImage: 2
  },
  {
    type: 'doomshroom',
    name: 'Doom-shroom',
    category: 'night',
    cost: 125,
    damage: 'Maksimum (Seluruh Layar)',
    recharge: 'Sangat Lambat',
    mathSkill: 'Eksponensial ledakan kawah kiamat!',
    description: 'Ledakan jamur raksasa yang memusnahkan hampir semua zombie dan meninggalkan lubang kawah.',
    playable: false,
    rowInImage: 2
  },
  {
    type: 'lilypad',
    name: 'Lily Pad',
    category: 'pool',
    cost: 25,
    damage: 'Tidak Ada (Alas Air)',
    recharge: 'Cepat',
    mathSkill: 'Penjumlahan platform: Memberikan alas agar tanaman darat bisa ditempatkan di air.',
    description: 'Daun teratai air yang memungkinkan tanaman darat ditanam di atas kolam renang.',
    playable: false,
    rowInImage: 2
  },
  {
    type: 'squash',
    name: 'Squash',
    category: 'day',
    cost: 50,
    damage: 'Besar (450)',
    recharge: 'Lambat (15 detik)',
    mathSkill: 'Gaya gravitasi dan momentum F = m × a menghantam target terdekat!',
    description: 'Labu pemarah yang mengawasi zombie terdekat, melompat, dan menindihnya hingga gepeng.',
    playable: true,
    rowInImage: 2
  },

  // ROW 3
  {
    type: 'threepeater',
    name: 'Threepeater',
    category: 'day',
    cost: 325,
    damage: '3× Normal (30 di 3 Jalur)',
    recharge: 'Cepat (8 detik)',
    mathSkill: 'Operasi matriks 3 dimensi: Menyerang baris atas, tengah, dan bawah sekaligus!',
    description: 'Menembakkan 3 butir kacang melintasi 3 jalur berbeda secara serentak.',
    playable: true,
    rowInImage: 3
  },
  {
    type: 'tanglekelp',
    name: 'Tangle Kelp',
    category: 'pool',
    cost: 25,
    damage: 'Seketika (Dalam Air)',
    recharge: 'Lambat',
    mathSkill: 'Eliminasi 1 banding 1 di zona perairan.',
    description: 'Ganggang laut yang menarik zombie perenang ke dasar kolam.',
    playable: false,
    rowInImage: 3
  },
  {
    type: 'jalapeno',
    name: 'Jalapeno',
    category: 'day',
    cost: 125,
    damage: 'Besar (Membakar 1 Jalur Penuh)',
    recharge: 'Sangat Lambat (20 detik)',
    mathSkill: 'Sapuan garis lurus linear Y = row untuk mengeliminasi semua elemen baris.',
    description: 'Cabai api yang membakar satu baris penuh rumput atau genteng menjadi abu membara.',
    playable: true,
    rowInImage: 3
  },
  {
    type: 'spikeweed',
    name: 'Spikeweed',
    category: 'pool',
    cost: 100,
    damage: 'Kontinu di Tanah',
    recharge: 'Cepat',
    mathSkill: 'Kerusakan berkala per detik saat zombie menginjaknya.',
    description: 'Duri tajam di atas tanah yang melukai kaki zombie dan meletuskan ban mobil zombie.',
    playable: false,
    rowInImage: 3
  },
  {
    type: 'torchwood',
    name: 'Torchwood',
    category: 'day',
    cost: 175,
    damage: 'Pengganda 2× Kerusakan Peluru',
    recharge: 'Cepat (7 detik)',
    mathSkill: 'Faktor pengali: Peluru biasa × 2 = Peluru Api (60 DMG) yang membara!',
    description: 'Batang pohon berapi yang mengubah kacang biasa menjadi bola api dengan damage ganda.',
    playable: true,
    rowInImage: 3
  },
  {
    type: 'tallnut',
    name: 'Tall-nut',
    category: 'pool',
    cost: 125,
    damage: 'Tidak Ada (HP 800)',
    recharge: 'Lambat (20 detik)',
    mathSkill: 'Dua kali lipat (2×) ketahanan Wall-nut dengan tinggi penghalang 2 meter!',
    description: 'Kacang bertubuh raksasa yang tidak bisa dilompati oleh zombie galah atau lumba-lumba.',
    playable: true,
    rowInImage: 3
  },
  {
    type: 'seashroom',
    name: 'Sea-shroom',
    category: 'fog',
    cost: 0,
    damage: 'Normal (Air)',
    recharge: 'Lambat',
    mathSkill: 'Nilai 0 (Gratis) khusus untuk petak perairan.',
    description: 'Jamur air gratis yang hanya bisa mengapung di atas kolam malam hari.',
    playable: false,
    rowInImage: 3
  },
  {
    type: 'plantern',
    name: 'Plantern',
    category: 'fog',
    cost: 25,
    damage: 'Menerangi Kabut',
    recharge: 'Lambat',
    mathSkill: 'Radius lingkaran pencahayaan r = 3 petak.',
    description: 'Lentera tanaman yang menerangi kabut tebal di arena malam berkabut.',
    playable: false,
    rowInImage: 3
  },
  {
    type: 'cactus',
    name: 'Cactus',
    category: 'fog',
    cost: 125,
    damage: 'Normal + Menusuk Balon',
    recharge: 'Cepat',
    mathSkill: 'Penyesuaian sumbu Z: Meregangkan tubuh ke atas untuk menembak zombie balon!',
    description: 'Kaktus yang menembakkan duri ke darat dan bisa memanjangkan tubuhnya untuk meletuskan balon.',
    playable: false,
    rowInImage: 3
  },

  // ROW 4
  {
    type: 'blover',
    name: 'Blover',
    category: 'fog',
    cost: 100,
    damage: 'Meniup Kabut & Balon',
    recharge: 'Cepat',
    mathSkill: 'Meniup bersih 100% kabut dari layar permainan.',
    description: 'Kipas semanggi berdaun empat yang menghembuskan angin kencang meniup kabut dan zombie terbang.',
    playable: false,
    rowInImage: 4
  },
  {
    type: 'splitpea',
    name: 'Split Pea',
    category: 'fog',
    cost: 125,
    damage: 'Depan 1×, Belakang 2×',
    recharge: 'Cepat',
    mathSkill: 'Dua arah (vektor positif dan negatif): Depan 1 butir, belakang 2 butir!',
    description: 'Menembak ke depan dan ke belakang untuk mengatasi zombie penambang yang datang dari belakang.',
    playable: false,
    rowInImage: 4
  },
  {
    type: 'starfruit',
    name: 'Starfruit',
    category: 'fog',
    cost: 125,
    damage: '5 Arah Bintang',
    recharge: 'Cepat',
    mathSkill: 'Pola geometri bintang 5 sudut: Menembakkan bintang ke 5 arah sudut berbeda.',
    description: 'Belimbing manis yang menembakkan bintang kecil ke 5 arah diagonal dan tegak lurus.',
    playable: false,
    rowInImage: 4
  },
  {
    type: 'pumpkin',
    name: 'Pumpkin',
    category: 'roof',
    cost: 125,
    damage: 'Pelindung Luar Tanaman',
    recharge: 'Lambat',
    mathSkill: 'Lapisan pelindung tambahan di luar tanaman utama.',
    description: 'Labu berongga yang membungkus tanaman lain untuk memberi lapisan pertahanan ekstra.',
    playable: false,
    rowInImage: 4
  },
  {
    type: 'magnetshroom',
    name: 'Magnet-shroom',
    category: 'roof',
    cost: 100,
    damage: 'Menarik Logam',
    recharge: 'Cepat',
    mathSkill: 'Gaya magnetik mengurangi armor logam zombie menjadi normal.',
    description: 'Menarik ember besi, pintu kawat, dan pancingan zombie dari jarak jauh.',
    playable: false,
    rowInImage: 4
  },
  {
    type: 'cabbagepult',
    name: 'Cabbage-pult',
    category: 'roof',
    cost: 100,
    damage: '2× Normal (Parabola Genteng)',
    recharge: 'Cepat',
    mathSkill: 'Lintasan parabola gerak peluru menembus sudut atap genteng!',
    description: 'Ketapel kubis yang melontarkan kubis melengkung di atas lereng atap genteng.',
    playable: false,
    rowInImage: 4
  },
  {
    type: 'flowerpot',
    name: 'Flower Pot',
    category: 'roof',
    cost: 25,
    damage: 'Tidak Ada (Pot Genteng)',
    recharge: 'Cepat',
    mathSkill: 'Media tanam dasar di atas genteng bata merah.',
    description: 'Pot tanah liat yang wajib digunakan untuk menanam tanaman di atas atap genteng rumah.',
    playable: false,
    rowInImage: 4
  },
  {
    type: 'kernelpult',
    name: 'Kernel-pult',
    category: 'roof',
    cost: 100,
    damage: 'Normal + Mentega Lengket',
    recharge: 'Cepat',
    mathSkill: 'Peluang probabilitas 25% melontarkan mentega yang menghentikan zombie total!',
    description: 'Melontarkan biji jagung dan sesekali sebongkah mentega lengket yang melumpuhkan gerakan zombie.',
    playable: false,
    rowInImage: 4
  },
  {
    type: 'coffeebean',
    name: 'Coffee Bean',
    category: 'roof',
    cost: 75,
    damage: 'Membangunkan Jamur Siang',
    recharge: 'Cepat',
    mathSkill: 'Mengubah status tanaman dari tidur (0) menjadi bangun (1) di siang hari!',
    description: 'Biji kopi yang membangkitkan jamur malam agar dapat beraksi di siang hari.',
    playable: false,
    rowInImage: 4
  },

  // ROW 5 & UPGRADE
  {
    type: 'garlic',
    name: 'Garlic',
    category: 'roof',
    cost: 50,
    damage: 'Mengalihkan Jalur Zombie',
    recharge: 'Cepat',
    mathSkill: 'Pergeseran baris: Mengubah baris zombie menjadi baris + 1 atau baris - 1.',
    description: 'Bawang putih dengan aroma menyengat yang membuat zombie mual dan berpindah ke jalur lain.',
    playable: false,
    rowInImage: 5
  },
  {
    type: 'umbrellaLeaf',
    name: 'Umbrella Leaf',
    category: 'roof',
    cost: 100,
    damage: 'Melindungi dari Bungee Zombie',
    recharge: 'Cepat',
    mathSkill: 'Perisai area 3×3 terhadap serangan udara.',
    description: 'Daun payung lebar yang menepis bungee zombie dan bola basket ketapel zombie.',
    playable: false,
    rowInImage: 5
  },
  {
    type: 'marigold',
    name: 'Marigold',
    category: 'roof',
    cost: 50,
    damage: 'Menghasilkan Koin Perak/Emas',
    recharge: 'Lambat',
    mathSkill: 'Konversi nilai ekonomi: 1 Koin Emas = 5 Koin Perak!',
    description: 'Bunga cantik yang sesekali memuntahkan koin perak dan koin emas berharga.',
    playable: false,
    rowInImage: 5
  },
  {
    type: 'melonpult',
    name: 'Melon-pult',
    category: 'roof',
    cost: 300,
    damage: 'Sangat Besar (Splash Damage)',
    recharge: 'Cepat',
    mathSkill: 'Kerusakan area kuadratik pada target dan sekitarnya.',
    description: 'Melontarkan semangka raksasa dengan daya hancur luar biasa melengkung di atap genteng.',
    playable: false,
    rowInImage: 5
  },
  {
    type: 'gatlingpea',
    name: 'Gatling Pea',
    category: 'upgrade',
    cost: 250,
    damage: '4× Cepat (4 Butir per Tembakan)',
    recharge: 'Sangat Lambat (10 detik)',
    mathSkill: 'Perkalian 4×: Menyemburkan 4 kacang pecahan beruntun berdaya hancur tinggi!',
    description: 'Upgrade legendaris untuk Repeater! Memakai helm militer dan menembakkan 4 kacang beruntun.',
    playable: true,
    rowInImage: 5
  },
  {
    type: 'twinsunflower',
    name: 'Twin Sunflower',
    category: 'upgrade',
    cost: 150,
    damage: 'Tidak Ada',
    recharge: 'Sangat Lambat (10 detik)',
    mathSkill: 'Kelipatan 2×: Menghasilkan 2 butir matahari (100 matahari) dalam satu siklus!',
    description: 'Dua bunga matahari ceria pada satu batang yang menghasilkan energi matahari ganda.',
    playable: true,
    rowInImage: 5
  },
  {
    type: 'gloomshroom',
    name: 'Gloom-shroom',
    category: 'upgrade',
    cost: 150,
    damage: 'Menyemprot 8 Arah Sekeliling',
    recharge: 'Sangat Lambat',
    mathSkill: 'Semprotan 360 derajat ke 8 petak bertetangga!',
    description: 'Upgrade untuk Fume-shroom yang menyemburkan asap pekat ke 8 petak di sekelilingnya.',
    playable: false,
    rowInImage: 5
  },
  {
    type: 'cattail',
    name: 'Cattail',
    category: 'upgrade',
    cost: 225,
    damage: 'Duri Kendali Sasaran',
    recharge: 'Sangat Lambat',
    mathSkill: 'Sistem pelacak target dengan jarak Euclidean terdekat di seluruh layar!',
    description: 'Topi kucing merah muda yang menembakkan duri pelacak ke zombie di jalur mana pun.',
    playable: false,
    rowInImage: 5
  },
  {
    type: 'wintermelon',
    name: 'Winter Melon',
    category: 'upgrade',
    cost: 200,
    damage: 'Dahsyat + Efek Beku Area',
    recharge: 'Sangat Lambat',
    mathSkill: 'Menggabungkan kerusakan dahsyat semangka dengan pelambatan es 50%!',
    description: 'Upgrade melon-pult yang melontarkan melon es beku membekukan segerombolan zombie.',
    playable: false,
    rowInImage: 5
  },

  // ROW 6 (SPECIAL UPGRADES)
  {
    type: 'goldmagnet',
    name: 'Gold Magnet',
    category: 'upgrade',
    cost: 50,
    damage: 'Menarik Koin Otomatis',
    recharge: 'Sangat Lambat',
    mathSkill: 'Akumulasi total koin emas dan perak di layar.',
    description: 'Magnet emas yang mengumpulkan koin dan berlian secara otomatis untukmu.',
    playable: false,
    rowInImage: 6
  },
  {
    type: 'spikerock',
    name: 'Spikerock',
    category: 'upgrade',
    cost: 125,
    damage: 'Duri Baja Super Keras',
    recharge: 'Sangat Lambat',
    mathSkill: 'Ketahanan 3× lipat terhadap kendaraan zombie.',
    description: 'Upgrade untuk Spikeweed dengan duri batu baja yang dapat menahan hantaman mobil zamboni berkali-kali.',
    playable: false,
    rowInImage: 6
  },
  {
    type: 'cobcannon',
    name: 'Cob Cannon',
    category: 'upgrade',
    cost: 500,
    damage: 'Nuklir Jagung (Area Raksasa)',
    recharge: 'Sangat Lambat',
    mathSkill: 'Biaya 500 matahari = investasi tertinggi dengan hasil ledakan terluas!',
    description: 'Meriam jagung raksasa yang membutuhkan 2 petak Kernel-pult untuk menembakkan roket jagung berdaya ledak nuklir.',
    playable: false,
    rowInImage: 6
  }
];
