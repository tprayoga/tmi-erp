export const PROJECTS = [
  // 🟡 Open (4 items)
  {
    id: 1,
    name: 'Permintaan Baut Hex M16',
    status: 'open',
    priority: 'Low',
    startDate: '2025-07-01',
    endDate: '2025-07-04',
    progress: 0,
    description: 'Inquiry baru masuk dari PT Baja Prima, menunggu review sales.',
    members: ['/static/user/user-01.png']
  },
  {
    id: 2,
    name: 'Permintaan Sekrup Stainless M8',
    status: 'open',
    priority: 'Low',
    startDate: '2025-07-02',
    endDate: '2025-07-06',
    progress: 0,
    description: 'Customer mengirim inquiry via email, belum ditindaklanjuti.',
    members: ['/static/user/user-02.png']
  },
  {
    id: 3,
    name: 'Permintaan Mur Kunci Flange',
    status: 'open',
    priority: 'Low',
    startDate: '2025-07-03',
    endDate: '2025-07-07',
    progress: 0,
    description: 'Sales baru menerima inquiry, belum di-assign.',
    members: ['/static/user/user-03.png']
  },
  {
    id: 4,
    name: 'Inquiry Sekrup Besi Panjang',
    status: 'open',
    priority: 'Low',
    startDate: '2025-07-04',
    endDate: '2025-07-08',
    progress: 0,
    description: 'Customer tanya sekrup 5cm, perlu validasi spesifikasi.',
    members: ['/static/user/user-04.png']
  },

  // 🔵 In Progress (3 items)
  {
    id: 5,
    name: 'RFQ Baut Proyek PLTU',
    status: 'in_progress',
    priority: 'High',
    startDate: '2025-07-01',
    endDate: '2025-07-05',
    progress: 40,
    description: 'Inquiry sedang dalam tahap pembuatan RFQ untuk PLTU Cirebon.',
    members: ['/static/user/user-05.png']
  },
  {
    id: 6,
    name: 'Negosiasi Quotation untuk PT Tangguh',
    status: 'in_progress',
    priority: 'High',
    startDate: '2025-07-02',
    endDate: '2025-07-06',
    progress: 50,
    description: 'Sudah kirim Quotation v1, menunggu revisi dari tim teknis.',
    members: ['/static/user/user-06.png']
  },
  {
    id: 7,
    name: 'RFQ Mur Proyek Jalan Tol',
    status: 'in_progress',
    priority: 'High',
    startDate: '2025-07-03',
    endDate: '2025-07-09',
    progress: 60,
    description: 'Masuk tahap finalisasi RFQ untuk pengadaan Mur M24.',
    members: ['/static/user/user-07.png']
  },

  // 🟠 Waiting Customer (2 items)
  {
    id: 8,
    name: 'Quotation untuk Sekrup Baja Ringan',
    status: 'waiting_customer',
    priority: 'Medium',
    startDate: '2025-06-30',
    endDate: '2025-07-04',
    progress: 70,
    description: 'Quotation sudah dikirim, menunggu approval customer.',
    members: ['/static/user/user-08.png']
  },
  {
    id: 9,
    name: 'Revisi Penawaran Mur Flange',
    status: 'waiting_customer',
    priority: 'Medium',
    startDate: '2025-07-01',
    endDate: '2025-07-05',
    progress: 65,
    description: 'Quotation v2 dikirim, menunggu balasan terkait delivery.',
    members: ['/static/user/user-09.png']
  },

  // 🟢 Closed - Won (5 items)
  {
    id: 10,
    name: 'Order PO Sekrup Baja - PT Tangguh',
    status: 'closed_won',
    priority: 'Low',
    startDate: '2025-06-15',
    endDate: '2025-06-25',
    progress: 100,
    description: 'Deal berhasil, PO sudah diterima dan pengiriman dijadwalkan.',
    members: ['/static/user/user-10.png']
  },
  {
    id: 11,
    name: 'PO Baut Galvanis - PT Makmur',
    status: 'closed_won',
    priority: 'Low',
    startDate: '2025-06-20',
    endDate: '2025-06-30',
    progress: 100,
    description: 'Order masuk dari PT Makmur, barang siap dikirim.',
    members: ['/static/user/user-11.png']
  },
  {
    id: 12,
    name: 'Penjualan Mur M10 - Proyek Jembatan',
    status: 'closed_won',
    priority: 'Low',
    startDate: '2025-06-10',
    endDate: '2025-06-20',
    progress: 100,
    description: 'PO disetujui setelah negosiasi harga.',
    members: ['/static/user/user-12.png']
  },
  {
    id: 13,
    name: 'Pengadaan Sekrup Panjang - PT Tera',
    status: 'closed_won',
    priority: 'Low',
    startDate: '2025-06-12',
    endDate: '2025-06-22',
    progress: 100,
    description: 'Quotation disetujui, pengiriman dalam proses.',
    members: ['/static/user/user-13.png']
  },
  {
    id: 14,
    name: 'Pengadaan Proyek PLN - Mur Stainless',
    status: 'closed_won',
    priority: 'Low',
    startDate: '2025-06-18',
    endDate: '2025-06-28',
    progress: 100,
    description: 'PO berhasil setelah revisi quotation v2.',
    members: ['/static/user/user-14.png']
  },

  // 🔴 Closed - Lost (1 item)
  {
    id: 15,
    name: 'Permintaan Sekrup Besi - PT Kalah',
    status: 'closed_lost',
    priority: 'Low',
    startDate: '2025-06-01',
    endDate: '2025-06-08',
    progress: 100,
    description: 'Customer memilih vendor lain karena harga lebih murah.',
    members: ['/static/user/user-15.png']
  }

  // ❌ Cancelled (0 items) – tidak dimasukkan
];


export const PROJECT_STATUS = [{
  title: 'All',
  value: 'all',
  amount: 45
}, {
  title: 'In Progress',
  value: 'in-progress',
  amount: 12
}, {
  title: 'Upcoming',
  value: 'upcoming',
  amount: 12
}, {
  title: 'Blocked',
  value: 'blocked',
  amount: 12
}, {
  title: 'Completed',
  value: 'completed',
  amount: 12
}];
export const PROJECT_TASKS = [{
  title: 'Design',
  status: 'Completed'
}, {
  title: 'Development',
  status: 'Ongoing'
}, {
  title: 'Back End Development',
  status: 'Upcoming'
}];
export const PROJECT_FILES = [{
  id: 1,
  title: 'Design Homepage',
  image: '/static/files-icon/jpg.svg'
}, {
  id: 2,
  title: 'Preliminary Sketches',
  image: '/static/files-icon/zip.svg'
}, {
  id: 3,
  title: 'Preliminary Sketches',
  image: '/static/files-icon/pdf.svg'
}, {
  id: 4,
  title: 'Preliminary Sketches',
  image: '/static/files-icon/raw.svg'
}];
export const PROJECT_TOOLS = [{
  id: 1,
  position: 'Design Software',
  company: 'Adobe Illustrator',
  image: '/static/files-icon/illustrator.svg'
}, {
  id: 2,
  company: 'Sketch',
  position: 'Design Software',
  image: '/static/files-icon/sketch.svg'
}, {
  id: 3,
  company: 'Adobe Photoshop',
  position: 'Design Software',
  image: '/static/files-icon/photoshop.svg'
}];
export const PROJECT_STACKS = [{
  id: 1,
  company: 'HTML5',
  image: '/static/files-icon/html.svg',
  position: 'Code'
}, {
  id: 2,
  company: 'VueJS',
  image: '/static/files-icon/vue.svg',
  position: 'Code'
}, {
  id: 3,
  company: 'Sass',
  image: '/static/files-icon/sass.svg',
  position: 'Code'
}];