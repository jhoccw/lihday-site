---
name: LIHDAY 德運實業
description: Red-and-black corporate site for a surveillance systems contractor; ruled grids, heavy CJK headings, one phone number.
colors:
  red: "#c30d23"
  red-deep: "#9f0a1c"
  red-on-dark: "#e5203a"
  red-tint: "#ffd9dd"
  ink: "#0b0b0c"
  ink-2: "#141416"
  ink-3: "#1e1e21"
  line-dark: "#2c2c30"
  on-dark: "#f4f4f5"
  on-dark-2: "#a9a9b2"
  paper: "#ffffff"
  paper-2: "#f4f4f5"
  line: "#dfdfe3"
  text: "#141416"
  text-2: "#55555d"
  disabled: "#a0a0a8"
  ember: "#3a0810"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 5.2vw + 0.5rem, 5rem)"
    fontWeight: 900
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 2.6vw + 1rem, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "0"
  statement:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "clamp(2rem, 2.4vw + 1rem, 3.25rem)"
    fontWeight: 900
    lineHeight: 1.3
  numeral:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 9.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title-lg:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2vw + 1rem, 2rem)"
    fontWeight: 700
    lineHeight: 1.45
  title:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  lead:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.4vw + 0.95rem, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "0.02em"
  body:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "0.02em"
    fontFeature: "'tnum'"
  body-sm:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "0.02em"
  label:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "0.02em"
  button:
    fontFamily: "'Archivo Variable', 'Noto Sans TC Variable', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
rounded:
  sm: "4px"
  full: "50%"
spacing:
  gutter: "clamp(20px, 5vw, 80px)"
  section: "clamp(72px, 10vw, 144px)"
  block: "clamp(40px, 5vw, 72px)"
  column: "clamp(32px, 6vw, 96px)"
  rail: "24px"
  header: "72px"
  max: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 1.5rem"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.red-deep}"
    textColor: "{colors.paper}"
  button-primary-compact:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0 1.125rem"
    height: "44px"
  link-arrow:
    textColor: "{colors.on-dark}"
    typography: "{typography.body}"
    height: "44px"
  nav-link:
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    height: "72px"
  icon-tile:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.red}"
    rounded: "{rounded.sm}"
    size: "52px"
  icon-tile-hover:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
  rail-button:
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    size: "56px"
  rail-button-hover:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
  rail-button-disabled:
    textColor: "{colors.disabled}"
  tab:
    textColor: "{colors.on-dark-2}"
    height: "84px"
  tab-active:
    textColor: "{colors.on-dark}"
  product-plate:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.sm}"
  call-bar:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    height: "56px"
---

# Design System: LIHDAY 德運實業

## Overview

**Creative North Star: "The Open Aperture"**

The site is the category-standard security-contractor homepage, built carefully: a white header with a red phone button, a black hero, alternating white, pale-grey and black sections, and one full-red section that holds the phone number. Nothing about the structure is experimental. The character comes from how plainly it is drawn: content sits in grids ruled with 1px hairlines instead of cards, headings are very heavy Traditional Chinese set in two short lines, and red is the only colour that is not black, white or grey.

The one drawn object is a camera lens in SVG. Its iris opens when the page loads, stops down as the hero scrolls away, and its glass drifts against the pointer. Everything else moves in the same grammar: headings rise line by line out of a mask, grids are ruled before their cells fill, the process rail is drawn by the scroll, and the phone number is dialled in digit by digit. Motion eases with expo-out (`cubic-bezier(0.16, 1, 0.3, 1)`) and settles; the page renders fully still under `prefers-reduced-motion` or `?static`.

Density is moderate and even. Sections breathe at `clamp(72px, 10vw, 144px)`, text columns stop near 34em, and every section ends closer to the phone call than it began.

**Key Characteristics:**
- Three grounds only: ink black, paper white with pale grey, and one full-red contact section.
- Hairline-ruled grids and lists carry structure; no bordered or shadowed card containers.
- Heavy CJK headings (weight 800 to 900) broken into deliberate lines, each line its own mask.
- One radius (4px) for every rectangle; circles only for marks.
- The phone number is always the primary action and always red or on red.
- A single drawn lens stands in for photography the project does not have.

## Colors

Red, black, white and four greys; the red is the brand's own and every other value is a near-neutral with a faint cool cast.

### Primary
- **Signal Red** (`red`): The action and emphasis colour on light grounds. Primary buttons, icon glyphs, the process dots and drawn rail, the nav hover bar, text selection, the focus ring, and the ground of the entire contact section.
- **Pressed Red** (`red-deep`): Hover state of the red button only.
- **Lit Red** (`red-on-dark`): The same red raised in lightness so it reads on ink. Emphasised words inside dark headings, the active tab's underline and arrow, check marks in dark lists, footer link hover.
- **Red Tint** (`red-tint`): Field labels (`dt`) on the red contact ground, where white is reserved for the values.

### Neutral
- **Ink** (`ink`): Ground for the hero, solutions, about, footer and the mobile menu. Also the hover fill of the round call mark on red.
- **Ink 2 / Ink 3** (`ink-2`, `ink-3`): Declared as raised dark surfaces. `ink-2` shares its value with `text`; neither is used as a surface in the shipped homepage.
- **Dark Hairline** (`line-dark`): Every rule on ink.
- **On Dark** (`on-dark`): Primary text on ink.
- **On Dark Muted** (`on-dark-2`): Lead paragraphs, body copy, labels and inactive tabs on ink.
- **Paper** (`paper`): Header and default section ground; text on red.
- **Paper 2** (`paper-2`): The process section ground, icon tiles, and the plates behind product photos.
- **Hairline** (`line`): Every rule on paper, and the undrawn part of the process rail.
- **Text** (`text`): Body and headings on paper; also the 1px strong rule that opens a grid or underlines a group heading.
- **Text Muted** (`text-2`): Leads and descriptions on paper.
- **Disabled** (`disabled`): Glyph colour of a disabled rail button.
- **Ember** (`ember`): Centre of the radial glow behind the lens in the hero. It fades to transparent and appears nowhere else.

### Named Rules
**The Two Reds Rule.** `red` is for light grounds and for fills. On ink, red text and red marks use `red-on-dark`. A red-filled button keeps `red` on any ground because its label is white.

**The One Red Room Rule.** Red becomes a section ground exactly once, in the contact section. Everywhere else it is a mark: a button, a glyph, a dot, a line, one emphasised word.

**The Three Grounds Rule.** A section is ink, paper (white or `paper-2`), or the red room. No tinted, gradient or image grounds; the hero's ember glow is light from the lens, not a ground.

## Typography

**Display Font:** Archivo Variable for Latin and numerals, Noto Sans TC Variable for Chinese (with PingFang TC, Microsoft JhengHei, system-ui)
**Body Font:** the same single stack
**Label/Mono Font:** none distinct

**Character:** One sans stack does everything. Archivo comes first so digits, model numbers and Latin brand names take its wider, firmer shapes, while Chinese falls through to Noto Sans TC. Hierarchy is made with weight and size, not with a second family. Numerals are tabular throughout.

### Hierarchy
- **Display** (900, `clamp(2.375rem, 5.2vw + 0.5rem, 5rem)`, 1.18, -0.01em): The hero heading only, in three lines.
- **Headline** (800, `clamp(1.875rem, 2.6vw + 1rem, 3.25rem)`, 1.25, tracking 0, balanced): Every section heading, written as two lines.
- **Statement** (900, `clamp(2rem, 2.4vw + 1rem, 3.25rem)`, 1.3): Single words or short phrases that stand as content: process step names, the list of company values (which runs to 3.5rem). Scenario tab names use the same idea one step down (800, `clamp(1.5rem, 1.6vw + 1rem, 2.25rem)`, 1.2).
- **Numeral** (800, `clamp(2.5rem, 9.6vw, 6rem)`, 1.1, -0.01em): The phone number in the contact section.
- **Title Large** (700, `clamp(1.375rem, 1.2vw + 1rem, 2rem)`, 1.45): The headline sentence inside a scenario panel; max 22em.
- **Title** (700, 1.25rem, 1.4): Item names in grids and rails (product model numbers sit at 1.375rem).
- **Lead** (400, `clamp(1rem, 0.4vw + 0.95rem, 1.1875rem)`, 1.85): The one paragraph beside or under a section heading; max 34em, muted colour.
- **Body** (400, 1rem, 1.8, 0.02em): Running text; max 36 to 38em.
- **Body Small** (400 or 500, 0.9375rem): Item descriptions, header nav (500), footer.
- **Label** (400, 0.8125rem, muted): Terms in fact lists and the footer base line (0.875rem on the red ground).
- **Button** (700, 1.0625rem, line-height 1; phone digits inside a button at 1.1875rem).

### Named Rules
**The Written Line Rule.** Display and headline text is broken into lines by hand in the markup, two for a section and three for the hero. Each line is its own masked block so it can rise on entry. Do not let a heading wrap wherever the viewport decides.

**The Phrase Break Rule.** Chinese headings and leads break at phrase boundaries (`word-break: auto-phrase`), paragraphs use `text-wrap: pretty`, headings `balance`.

**The Weight Ladder Rule.** 900 for display and statements, 800 for headlines, 700 for titles and actions, 500 for navigation and list facts, 400 for reading. Size alone never separates two levels.

## Layout

A centred column with a 1280px maximum and a fluid gutter of `clamp(20px, 5vw, 80px)`. Sections are full-bleed grounds with `clamp(72px, 10vw, 144px)` of vertical padding; the fixed header is 72px and the hero starts beneath it and fills the rest of the first viewport (`100svh - 72px`).

Section heads take one of two shapes: heading and lead side by side in two equal columns aligned to the bottom, or heading alone above full-width content. The body sits `clamp(40px, 5vw, 72px)` below the head. Two-column bodies are asymmetric (4:8 for tabs and panel, 7:5 for copy and values) with a `clamp(32px, 6vw, 96px)` column gap. Repeating content is a ruled grid: three columns for services, six for client logos, four for fact lists. Products break the column and run as a horizontal snap rail that starts on the column edge and bleeds off the right side of the viewport.

Responsive changes are structural:
- At 1023px and below, the header nav and phone button collapse to a menu button; the menu is a full ink sheet wiped down from the header.
- At 899px and below, two-column heads and bodies stack, the service grid goes to two columns, the fact rows to two, the lens leaves its absolute position and sits under the hero copy, and the scenario tabs become a horizontal scrolling row.
- At 767px and below, the process rail turns vertical and a fixed red call bar appears at the bottom between the hero and the contact section.
- At 559px and below, services become a single-column list with the icon tile beside the text; at 479px client logos go to two columns and contact facts to one.

Touch targets are at least 44px; primary actions are 56px.

## Elevation & Depth

The system is flat. Depth comes from the change of ground between sections and from hairlines, not from shadows. Surfaces do not lift on hover; hover changes colour or draws a line.

### Shadow Vocabulary
- **Floating call bar** (`box-shadow: 0 10px 28px -8px rgba(0, 0, 0, 0.55)`): The mobile call bar only, because it floats over every ground on the page.

### Named Rules
**The Flat Ground Rule.** Nothing in the page flow casts a shadow. A shadow is allowed only on an element that is fixed above scrolling content. Stacking order is fixed: content, call bar (40), header and menu (50), skip link (100).

**The Lens Is the Only Depth Rule.** Gradients, bevels, glare and parallax belong to the drawn lens and the ember glow behind it. Interface surfaces stay solid.

## Shapes

Rectangles have one radius, a barely softened 4px: buttons, icon tiles, product plates, rail buttons, the call bar. The focus ring carries 2px. Full circles are reserved for marks: the process dots (16px) and the round call mark beside the phone number. There is no pill shape and no intermediate radius.

Lines are the main form. Hairlines are 1px. A grid or a group heading opens with a 1px rule in full text colour and continues in the pale hairline. Lines that show state or progress are thicker: 2px for the active tab and the process rail, 3px for the header nav hover bar. Cells in a ruled grid have no outer frame; the first column has no left padding or left border, so content aligns with the column edge.

## Components

Controls are plain and firm: solid fills, square-ish corners, state shown by colour or by a line being drawn from the left.

### Buttons
- **Shape:** 4px radius, 56px tall, `0 1.5rem` padding, icon and label with a 0.625rem gap, no wrap.
- **Primary:** Signal Red fill with white 700 label. It almost always carries a phone icon and the phone number in Archivo digits. The header version is 44px tall with `0 1.125rem` padding and shows the number alone.
- **Hover / Focus:** Fill moves to Pressed Red over 0.25s; active nudges down 1px. Focus is a 2px outline offset 3px, red on paper and white on ink or red.
- **Secondary (arrow link):** Bold text with a 1px underline in the current colour and a trailing arrow that slides 4px right on hover. 44px tall. Used beside a primary button, never alone as the main action.
- **Rail buttons:** 56px squares with a 1px text-colour border and an arrow. Hover fills red with a white arrow; disabled drops to the pale hairline and a grey arrow.

### Icons
A single inline set drawn on a 24px grid with a 1.5px round stroke and no fill, coloured by `currentColor`. Sizes in use: 18, 20, 22, 24, 28, 32.

### Ruled Cells (services, facts, logos)
- **Corner Style:** none; cells are regions between hairlines.
- **Background:** the section ground.
- **Border:** 1px hairline below each cell and between columns; the grid opens with a 1px rule in text colour.
- **Internal Padding:** 32px (24px at tablet, 20px in the single-column list).
- **Icon tile:** 52px square, 4px radius, `paper-2` fill with a red 28px glyph; the tile turns solid red with a white glyph when its cell is hovered.
- **Entry:** the grid wipes in from the left, then cells fade up in a stagger.

### Navigation
- **Header:** fixed, 72px, paper with a hairline below. Links are 0.9375rem at weight 500 and fill the header height; hover or focus draws a 3px red bar from the left along the bottom edge. The header slides away on scroll down past 60% of the first viewport and returns on scroll up.
- **Mobile menu:** a full ink sheet revealed by a downward clip. Links are 1.625rem at weight 800, separated by dark hairlines, entering in a 40ms stagger. The red phone button sits at the bottom, centred.
- **Footer:** ink ground, white-knockout logo, a three-column link grid (two on mobile), and a base line in label size above a dark hairline. Links turn Lit Red on hover.

### Scenario Tabs
A vertical tab list on ink beside one panel. Tabs are 84px rows separated by dark hairlines with the name in statement type, muted when inactive. The active tab turns white, draws a 2px Lit Red underline from the left and reveals a red arrow. Arrow keys move selection. The panel swaps out-in: the old one fades in 0.18s, the new one rises 20px out of a 6px blur. Panel points are a two-column ruled list with red check marks. On mobile the tabs become a horizontal scrolling row, 56px tall.

### Process Rail
An ordered list of three steps. Each step is a 16px red dot followed by a 2px line that the scroll fills with red, then a small red step number (0.9375rem, weight 600, 0.08em tracking), the step name in statement type and a short description. Vertical on mobile. The number belongs to ordered sequences only.

### Product Rail
A horizontal scroll-snap rail of items `clamp(240px, 22vw, 300px)` wide with a 24px gap. Each item is a square `paper-2` plate with a 4px radius; the photo is contained and multiplied into the plate so its white background disappears, and scales to 1.06 on hover. Model number and a one-line description sit below, outside the plate.

### Logo Marquee and Logo Grid
Brand logos run in an endless 48s linear marquee with soft edge masks, greyscale at 72% opacity, returning to full colour on hover and pausing while hovered. Under reduced motion the marquee becomes a static wrapped row. Client logos sit in a ruled six-column grid in full colour.

### Call Line
The contact section's phone number, set in numeral type across the column between two translucent white rules, with a round white call mark at the right. The whole row is one link. Digits rise one by one on entry; on hover the mark turns ink, grows slightly and tilts. Contact facts follow as a four-column definition list with Red Tint terms.

### Mobile Call Bar
A fixed 56px red bar, inset 12px from the screen edges with a 4px radius, carrying the phone icon, 來電洽詢 and the number. It slides up after the hero leaves and slides away when the contact section arrives.

### Lens
The hero's SVG lens: barrel, knurled grip, engraved ring, bevel, glass with concentric reflections, eight iris blades and a glare. About half the viewport wide and cropped by the right edge on desktop. It opens on load, stops down and rotates with scroll, and its glass and glare drift against the pointer on fine-pointer devices. The engraved ring is the only place uppercase, widely tracked Latin appears; it is part of the object.

## Do's and Don'ts

### Do:
- **Do** make the phone number the primary action of every surface: a Signal Red button with the phone icon and the digits.
- **Do** switch to `red-on-dark` for red text and marks on ink, and keep it to large text and graphics (it measures about 4.3:1 on ink).
- **Do** build repeating content as ruled cells: a 1px text-colour rule to open, 1px hairlines between, first column flush with the column edge.
- **Do** write section headings as two short lines at weight 800 and wrap each line in its own mask.
- **Do** use 4px for every rectangle and full circles only for dots and round marks.
- **Do** ease state changes and entrances with `cubic-bezier(0.16, 1, 0.3, 1)` or `expo.out`; keep overshoot (`back.out`) for small round marks popping in.
- **Do** keep every animated surface complete and readable when motion is off.
- **Do** place product photos on `paper-2` plates with multiply blending, and show partner logos as supplied.

### Don't:
- **Don't** use red as a section ground outside the contact section.
- **Don't** put `red` text or thin red marks on ink; that is what `red-on-dark` is for.
- **Don't** wrap content in bordered, shadowed or rounded card containers.
- **Don't** add shadows to anything in the page flow.
- **Don't** introduce a second typeface or a second accent colour.
- **Don't** use radii between 4px and a full circle, or pill-shaped buttons.
- **Don't** use stock scene photography; where there is no real photo, the drawn lens or a ruled grid of facts carries the space.
- **Don't** apply gradients, glare or parallax to interface surfaces; they belong to the lens.
