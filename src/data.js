export const company = {
  name: '德運實業有限公司',
  brand: 'LIHDAY',
  tel: '03-363-0858',
  telHref: 'tel:+88633630858',
  fax: '03-367-0685',
  email: 'lihday.tw@gmail.com',
  // TODO: replace with the company's real Facebook page URL
  facebook: 'https://www.facebook.com/',
  address: '桃園市桃園區三民路三段416號1樓',
  mapHref: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('桃園市桃園區三民路三段416號'),
  hours: ['週一至週五', '9:00–12:00', '13:40–17:00'],
}

export const nav = [
  { label: '服務項目', to: { path: '/', hash: '#services' } },
  { label: '解決方案', to: { path: '/', hash: '#solutions' } },
  { label: '產品', to: { path: '/products' }, products: true },
  { label: '合作夥伴', to: { path: '/', hash: '#partners' } },
  { label: '關於德運', to: { path: '/', hash: '#about' } },
  { label: '聯絡我們', to: { path: '/', hash: '#contact' } },
]

export const services = [
  { icon: 'camera', name: '數位遠端監控系統', desc: '現場影像的即時監看、錄影與回放，人不在現場也能遠端連線。' },
  { icon: 'fingerprint', name: '生物辨識門禁管控系統', desc: '以生物特徵辨識身分，管制人員進出。' },
  { icon: 'intercom', name: '網路影像對講機系統', desc: '訪客來訪時，以影像與語音確認身分。' },
  { icon: 'home', name: '智慧家庭遠端控制', desc: '從遠端掌握並控制家中的設備。' },
  { icon: 'building', name: '社區大樓弱電保養', desc: '社區與大樓弱電設備的檢查、保養與維修。' },
  { icon: 'speaker', name: '公共廣播系統', desc: '場域內的廣播與通報。' },
  { icon: 'parking', name: '停車場管控系統', desc: '車輛進出的管制與管理。' },
  { icon: 'plate', name: '車牌辨識系統', desc: '自動辨識車牌，記錄車輛進出。' },
  { icon: 'lamp', name: '節能護眼液晶照明', desc: '兼顧節能與護眼的液晶照明。' },
]

// Placeholder venue photos, hot-linked from Unsplash. Replace with real site photos.
const unsplash = (id) => `https://images.unsplash.com/${id}?w=1920&q=60&auto=format&fit=crop`

export const solutions = [
  {
    id: 'bank',
    img: unsplash('photo-1758448721149-aa0ce8e1b2c9'),
    name: '銀行',
    title: '櫃台、|點鈔機|與各分行，|集中在|總部管理。',
    body: '人來人往的櫃台需要高解析度攝影機辨識客戶身分，並以 60FPS 高張數攝影機確認點鈔機有無異狀。錄影主機必須長時間不間斷錄影，並具備故障轉移或備份，不讓影像因硬碟損壞而流失。',
    points: ['智能辨識客戶身分', '60FPS 高張數攝影機', '透過 CMS 將各分行影像拉回總部', '休息期間的位移偵測與警報通報'],
  },
  {
    id: 'school',
    img: unsplash('photo-1591123120675-6f7f1aae0e5b'),
    name: '校園',
    title: '保全人力有限，|更要顧及|整個校園的|死角。',
    body: '校園監控以監視、門禁、電子考場、緊急求救與電子圍籬為主，多方系統整合不易。德運把各系統整合起來，兼顧經濟效益與校園安全，同時作為學校日常管理的防護系統。',
    points: ['電子圍籬防止校外人士入侵', '人流密度偵測', '監視、門禁與考場系統整合', '緊急求救系統'],
  },
  {
    id: 'road',
    img: unsplash('photo-1564668836804-05a2de350bb6'),
    name: '道路',
    title: '惡劣的|戶外條件下，|影像一樣|清晰穩定。',
    body: '道路監控必須在戶外長時間提供清晰的影像與穩定的性能，才能預防事故、即時應變臨時狀況。德運以網路影像方案取代類比佈設，提高監控系統的整合能力。',
    points: ['網路影像架構', '流量管制', '車牌辨識', '戶外穩定運作'],
  },
  {
    id: 'hospital',
    img: unsplash('photo-1586534738560-438efdf1d205'),
    name: '醫院',
    title: '保護醫護、|病患、|訪客|與醫院的|重要資產。',
    body: '從掛號、藥房、病房、檢驗室到停車場與後勤單位，都需要即時監控。在有限的保全人力下，德運為監控中心提供的設備以智能辨識分析病房與公共空間，並協助釐清醫療糾紛的責任。',
    points: ['智能辨識分析病房與公共空間', '緊急求救鈴掌握現場狀況', '各部門即時監控', '停車場與後勤例行監測'],
  },
  {
    id: 'retail',
    img: unsplash('photo-1578916171728-46686eac8d58'),
    name: '零售',
    title: '用有限的預算，|掌握|每一家分店。',
    body: '從外部竊盜到內部監守自盜，都是零售商店的成本。德運設計完整的即時監看錄影系統，透過遠端連線掌握各分店營運狀況，並以 IP 網路架構做異地備份與控管。',
    points: ['遠端掌握各分店營運', '人流分析配合賣場陳列', '智能辨識系統', 'IP 網路架構異地備份'],
  },
]

export const process = [
  { step: '01', name: '規劃', desc: '先了解場域與需求。業主可以到桃園展示間實際參觀、了解設備，再由德運提出整合方案。' },
  { step: '02', name: '施工', desc: '所有工程都以最優質的施工品質與誠信精神完成，並掌握進度。' },
  { step: '03', name: '維護', desc: '完工後的維護保養與售後服務，仍由德運負責，業主不必擔心設備的問題。' },
]

export const brands = [
  { name: 'AXIS', img: '/img/brands/axis.png' },
  { name: 'BOSCH', img: '/img/brands/bosch.png' },
  { name: 'Honeywell', img: '/img/brands/honeywell.png' },
  { name: 'HPE', img: '/img/brands/hpe.png' },
  { name: 'LILIN', img: '/img/brands/lilin.png' },
  { name: 'Panasonic', img: '/img/brands/panasonic.png' },
  { name: 'SONY', img: '/img/brands/sony.png' },
  { name: 'Synology', img: '/img/brands/synology.png' },
  { name: 'TOA', img: '/img/brands/toa.png' },
  { name: 'VIVOTEK', img: '/img/brands/vivotek.png' },
]

export const clients = [
  { name: '臺北市稅捐稽徵處', img: '/img/clients/client-1.png' },
  { name: '遠東紡織', img: '/img/clients/client-3.png' },
  { name: '東隆興業', img: '/img/clients/client-5.png' },
  { name: '彩虹魚', img: '/img/clients/client-2.png' },
  { name: '精典泰迪的奶茶舖', img: '/img/clients/client-4.png' },
  { name: '打噴嚏', img: '/img/clients/client-6.png' },
]

export const values = ['品質', '進度', '務實', '誠信']
