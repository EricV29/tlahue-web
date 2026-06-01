# TLAHU-INTELLIGENCE — Style Reference

> **Vision:** Architectural Gliph Sky over Hidalgo — Identity-driven premium data platform.

**Theme:** Light (Hybrid with Luminous High-Contrast Hero)

## Overview

TLAHU-INTELLIGENCE is an identity-first design system built directly from the official Tlahuelilpan glyph colors. It blends a high-contrast, sunlit, atmospheric hero section with a crisp, minimal architectural light UI. It uses Montserrat for structural headings to anchor historical weight, and Inter for precise, compact interface readouts.

## Tokens — Colors

| Name              | Hex       | Token                   | Role                                                                                          | Inspiration                   |
| ----------------- | --------- | ----------------------- | --------------------------------------------------------------------------------------------- | ----------------------------- |
| **Canvas White**  | `#ffffff` | `--color-canvas-white`  | Main page background; absolute brightness and open layout space.                              | Clean light                   |
| **Agua Blue**     | `#3A85AC` | `--color-tlahu-blue`    | **Primary Interactive Accent:** Active states, focus edges, ghost borders, and text triggers. | Glifo - El agua viva          |
| **Tierra Gold**   | `#D5B35F` | `--color-tlahu-gold`    | **Brand Accent:** Featured element containers, icon highlights, and soft badging components.  | Glifo - La tierra fértil      |
| **Jarros Barro**  | `#AA642A` | `--color-tlahu-clay`    | **Deep Structural Contrast:** Dark primary headlines, heavy solid actions, and hero overlays. | Glifo - El jarrón tradicional |
| **Off White**     | `#FEFFFC` | `--color-off-white`     | Soft alternative section backing to introduce structural depth.                               | Limestone paths               |
| **Ash Gray**      | `#F9FAF7` | `--color-ash-gray`      | Input fields, search bars, and inner container fills.                                         | Soft river gravel             |
| **Cool Gray**     | `#EEF1ED` | `--color-cool-gray`     | Architectural micro-dividers and structural content grid borders.                             | Thin stone hairline           |
| **Dark Charcoal** | `#111827` | `--color-dark-charcoal` | High-contrast dense body text on white surfaces.                                              | High readability              |
| **Slate Gray**    | `#4B5563` | `--color-slate-gray`    | Muted descriptions, secondary labels, and placeholder helpers.                                | Distant horizon               |

## Tokens — Typography

### Montserrat (Display & Headlines)

- **Use:** Hero titles, primary section headers, and prominent display labels.
- **Weights:** 300 (Clean Layout), 500 (Section Anchors).
- **Sizes:** 40px, 48px, 54px
- **Line height:** 1.10
- **Letter spacing:** -0.0200em (Delivers a compressed, high-end editorial feel).

### Inter (UI & Body)

- **Use:** Core reading text, system navigation, button labels, and tag layouts.
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold).
- **Sizes:** 13px to 18px
- **Line height:** 1.20 to 1.50
- **Letter spacing:** -0.0120em (Compact interface grid execution).

### Type Scale

| Role         | Size | Line Height | Letter Spacing | Font Family | Token                 |
| ------------ | ---- | ----------- | -------------- | ----------- | --------------------- |
| caption      | 13px | 1.5         | -0.13px        | Inter       | `--text-caption`      |
| button-label | 16px | 1           | -0.19px        | Inter       | `--text-button-label` |
| subheading   | 18px | 1.2         | -0.18px        | Inter       | `--text-subheading`   |
| heading      | 40px | 1.1         | -0.8px         | Montserrat  | `--text-heading`      |
| heading-lg   | 48px | 1.1         | -0.96px        | Montserrat  | `--text-heading-lg`   |
| display      | 54px | 1.1         | -1.08px        | Montserrat  | `--text-display`      |

## Tokens — Spacing & Shapes

- **Base unit:** 4px | **Density:** Comfortable
- **Section gap:** 32px | **Card padding:** 16px | **Element gap:** 8px

### Border Radius

- **Nav Capsule:** 50.496px (Seamless organic pill floating frames)
- **Buttons:** 4px (Sharp, technical architectural termination)
- **Cards (Large):** 24px | **Cards (Medium):** 16px | **Cards (Small):** 12px

## Components (Tailwind Native Layouts)

### 1. Blurred Nav Capsule (Header Main)

- **Role:** Floating floating navigation frame over content.
- **Classes:** `bg-white/80 backdrop-blur-md rounded-[50.496px] shadow-[rgba(0,0,0,0.04)_0px_2px_12px_0px] border border-[#eef1ed] px-5 py-2 text-[#111827]`

### 2. Solid Primary Action (Clay Base)

- **Role:** High-emphasis interactive triggers and heavy CTAs.
- **Classes:** `bg-[#AA642A] text-white border border-[#AA642A] rounded-md px-5 py-2.5 font-medium hover:bg-[#8f5220] transition-all`

### 3. Outlined Interactive Button (Agua Border)

- **Role:** Clear responsive secondary links inside bright UI segments.
- **Classes:** `bg-transparent border-2 border-[#3A85AC] text-[#3A85AC] rounded-md px-4 py-2 font-medium hover:bg-[#3A85AC]/5 transition-all`

### 4. Luminous Identity Tag (Tierra Badge)

- **Role:** Small micro-indicators pointing to cultural sections.
- **Classes:** `bg-[#D5B35F]/10 border border-[#D5B35F]/30 text-[#8c6f27] text-xs font-semibold px-3 py-1 rounded-md`

### 5. Elevated Content Card (Info Container)

- **Role:** Primary component background for list arrays, news blocks, or services.
- **Classes:** `bg-[#ffffff] rounded-xl p-4 shadow-[rgba(17,24,39,0.03)_0px_8px_24px_0px] border border-[#dee2de]/50`

## Do's and Don'ts

- **Do:** Use the **Agua Blue (`#3A85AC`)** for actions, text highlights, and borders to keep the UI luminous and sharp.
- **Do:** Use **Jarros Barro (`#AA642A`)** when you need heavy, readable text blocks or highly important primary buttons.
- **Do:** Maintain an overall canvas color of clean white (`#ffffff`), letting the logo's colors act as the intentional layout conductors.
- **Don't:** Rely on pitch-black screens or dark muddy filters; the interface must feel bright, airy, and grounded in regional landscape sunlight.
- **Don't:** Mix random external hues; stay strictly within the clay, gold, and azure tri-color structure.
