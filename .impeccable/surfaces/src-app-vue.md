---
version: 1
slug: "src-app-vue"
primary_target: "src/App.vue"
related_targets: []
---

# 首頁（src/App.vue）

Scope: 首頁，全站第一個頁面。Mode: Persuade。
Audience: 企業與機構採購決策者。Action: 來電 03-363-0858。
Proof: 自 1986 年、九項服務、五個場域方案、立岱產品、經銷品牌與服務客戶 Logo。
Constraints: 紅黑品牌色、Noto Sans TC、Vite + Vue、需有網站動態。不使用舊站藍色圖庫照。
Chosen direction: 使用者選擇「業界標準版」，向 VIVOTEK 官網的水準看齊。
Memorable moment: 首屏鏡頭光圈開啟，隨捲動縮小光圈。
Unresolved: 首屏與場域方案尚無實拍照片；其餘頁面未建置；最新消息未放上首頁（舊站唯一一則為 2025 春節公告）。

## Direction contract

THESIS: 安防業官網的標準排法，認真做到位：訪客預期的結構、清楚的電話行動、事實作為證據。不走概念性或實驗性的排版。

OWN-WORLD: 黑（#0b0b0c）首屏與深色段落、白與淺灰內容段落、品牌紅 #c30d23 只用在行動、重點字與整個聯絡段落。4px 圓角、1px 髮絲分隔線取代卡片。Noto Sans TC 配 Archivo 數字與拉丁字。

STORY: 訪客在幾秒內知道德運做監視系統的規劃、施工與維護，看到服務、場域方案、產品與合作對象後相信它可靠，然後來電。

FIRST VIEWPORT: 白色頁首（Logo、選單、紅色電話按鈕）。黑色首屏：左側三行超大標題、一句說明、紅色來電按鈕與次要連結；右側 SVG 鏡頭佔約一半寬並超出右緣；底部四欄事實列。

FORM: 業界標準版（canon，使用者選擇；非骰出的方向）。Seed key d7147f2d（concept-seed 輸出原文：「DIRECTION CONCEPT SEED (key: d7147f2d; mode: persuade; source: api; approved pool: c3b204a1eed6)」；選擇以 --kind canon 回報）。Signature interaction: 鏡頭光圈由 GSAP 驅動開啟、隨捲動收縮、內部隨游標視差。Motion grammar: 標題逐行遮罩升起、格線先畫再填入、流程線隨捲動畫出、電話號碼逐字撥入；expo.out。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
