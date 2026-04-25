<div align="center">

# 🌊 Kredia.AI
**Empowering the Informal Economy with AI-Driven Credit Intelligence.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

*Traditional credit systems fail the informal sector because they ignore the pulse of the local market. Kredia.AI bridges this gap by converting messy, unstructured business logs into objective, machine-readable credit profiles for micro-entrepreneurs and SMEs.*

</div>

---

## 📋 Table of Contents
- [🌊 Overview](#-overview)
- [🎯 Theme Alignment: AI for Finance](#-theme-alignment-ai-for-finance)
- [🏗 Final Architecture](#-final-architecture)
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Development Journey](#-development-journey)
- [⚡ Quick Start](#-quick-start)
- [🏭 Running in Production](#-running-in-production)
- [🔑 Environment Variables](#-environment-variables)
- [🔌 API Reference](#-api-reference)
- [📁 Project Structure](#-project-structure)
- [📊 Current Status](#-current-status)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌊 Overview
Kredia.AI is a lightweight AI prototype built to solve the **"Invisible Credit"** problem in the informal economy. While billions of dollars flow through side-hustles, Chamas (informal savings groups), and micro-businesses, these entrepreneurs remain unbankable because their financial history exists only in unstructured formats: **M-Pesa SMS logs, notebook entries, and verbal agreements.**

Kredia.AI acts as an intelligence bridge, using Large Language Models to convert these alternative data traces into high-fidelity, machine-readable credit profiles.

---

## 🎯 Theme Alignment: AI for Finance
This project was specifically engineered to address the **AI for Finance** thematic track by focusing on the transition from alternative data to financial trust.

### 📱 Utilization of Alternative Data
Instead of relying on traditional CRB (Credit Reference Bureau) reports, Kredia.AI uses:
*   **Simulated M-Pesa Patterns**: Parsing text-based transaction records (e.g., "Received 2000 from Jane Doe" or "Paid 800 for electricity") to establish cash flow.
*   **SMS Business Records**: Transforming the messy "Inbox" of a mama mboga or side-hustler into a digital ledger.
*   **Chama Contribution Traces**: Identifying regular payments to social savings groups as a proxy for financial discipline and community-vetted reliability.

### 📈 Predicting Creditworthiness for Side-Hustles
For a side-hustle, raw income isn't the only metric. Kredia.AI's scoring engine rewards:
1.  **Consistency (Reliability)**: Regular inflows, even if small, indicate a stable business model.
2.  **Spending Discipline (Burn Rate)**: Managing expenses relative to income, a key indicator for Chama sustainability.
3.  **Financial Resilience (Volatility)**: Understanding seasonal dips and peak periods in the local market.

### 🤝 Empowerment for Chamas
Kredia.AI provides Chamas with an objective tool to assess potential members. By analyzing a member's "Integrity Traces," a Chama can make data-driven decisions on loan disbursements without requiring formal collateral.

---

## 🏗 Final Architecture
```text
      [ USER / TRADER ] 
              │
      ( Raw Text Logs )
              ▼
      [ VITE + REACT ] <───> [ FIREBASE AUTH ] (Optional)
      ( Premium Dashboard )
              │
      ┌───────┴───────────────────────────────┐
      │          INTELLIGENCE PIPELINE        │
      │                                       │
      │  [ GEMINI 2.0 FLASH ] <──> [ PROMPT ENGINE ]
      │  ( Extraction & Analysis )     ( KES Context )
      │                                       │
      └───────┬───────────────────────────────┘
              │
      ( Structured Profile )
              ▼
      [ GOOGLE FIRESTORE ] <───> [ HISTORY SIDEBAR ]
      ( Persistent Storage )        ( Cloud Sync )
```

---

## ✨ Features

### 🤖 AI-Driven Extraction
Advanced LLM parsing that identifies income, expenses, and categories from colloquial language (e.g., "Sold fish for 2000" vs "Mjengo money received").

### 🇰🇪 KES Native Context
Fully localized for the Kenyan market, handling KES currency formatting and understanding local business terminology.

### 📉 Behavioral Analytics
Real-time computation of Consistency Ratios, Burn Rates, and Income Volatility to provide a nuanced 300-850 Credit Score.

### 📜 Permanent Cloud Ledger
Integrated with Firebase Firestore to ensure that every "Integrity Trace" is stored securely and accessible across sessions.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19 + TypeScript |
| **Build Tool** | Vite 6 |
| **AI Engine** | Google Gemini (Gemini 2.0 Flash Lite) |
| **Database** | Firebase Firestore |
| **Styling** | Tailwind CSS + Framer Motion |
| **Icons** | Lucide React |

---

## 🚀 Development Journey

| Phase | What Was Built |
| :--- | :--- |
| **Phase 1** | Core Intelligence: Prompt engineering for Gemini extraction. |
| **Phase 2** | Dashboard: Premium React UI with Recharts visualization. |
| **Phase 3** | Localization: KES currency integration and local business logic. |
| **Phase 4** | Persistence: Firebase integration for assessment history. |
| **Phase 5** | Production: Build optimization and GitHub preparation. |

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js (v18+)
- A Google AI Studio API Key ([Get it here](https://aistudio.google.com/))
- A Firebase Project ([Create one here](https://console.firebase.google.com/))

### 2. Clone and Configure
```bash
git clone https://github.com/Markkaruga254/Kredia.AI.git
cd Kredia.AI
cp .env.example .env
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

---

## 🏭 Running in Production
To build the project for production deployment (Vercel, Netlify, or Firebase Hosting):

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔑 Environment Variables

| Variable | Default | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | - | Your Google Generative AI key. |
| `VITE_FIREBASE_API_KEY` | - | Firebase Web API Key. |
| `VITE_FIREBASE_PROJECT_ID` | - | Your Firebase Project ID. |
| `VITE_FIREBASE_APP_ID` | - | Your Firebase Web App ID. |

---

## 🔌 API Reference
*Note: Kredia.AI currently uses a direct client-side integration with Gemini AI.*

| Method | Source | Input | Response |
| :--- | :--- | :--- | :--- |
| **POST** | Internal AI Service | Raw Text Logs | `CreditProfile` JSON |
| **GET** | Firestore | `trader_id` | `Array<Assessment>` |

---

## 📁 Project Structure
```text
Kredia.AI/
├── src/
│   ├── components/            # UI Components (ScoreCard, Insights, etc.)
│   │   └── HistoryList.tsx    # Firebase-synced history sidebar
│   ├── services/              # Logic Layer
│   │   ├── intelligence.ts    # Gemini API integration
│   │   └── dbService.ts       # Firestore CRUD operations
│   ├── lib/
│   │   ├── firebase.ts        # Firebase initialization
│   │   └── utils.ts           # Currency (KES) & formatting utils
│   ├── App.tsx                # Main Orchestrator
│   └── main.tsx               # Entry point
├── .env.example               # Template for secrets
└── package.json               # Dependencies & Scripts
```

---

## 📊 Current Status

| Area | Status | Notes |
| :--- | :--- | :--- |
| AI Extraction | ✅ Complete | High accuracy on informal logs. |
| KES Localization | ✅ Complete | Formatting and local context applied. |
| Firebase Sync | ✅ Complete | Assessments persisted to Firestore. |
| User Auth | ⚠️ Partial | Ready for Firebase Auth integration. |

---

## 🗺 Roadmap

### 🗓 Near-term
- [ ] Implement Firebase Auth (Google/Phone login).
- [ ] Add PDF report export for lenders.

### 🗓 Mid-term
- [ ] Multi-currency support (USD, UGX, TZS).
- [ ] WhatsApp/Telegram bot for log entry.

### 🗓 Long-term
- [ ] Blockchain-verified credit certificates.
- [ ] Direct lender API integration.

---

## 🤝 Contributing
1. Branch from `main`.
2. Ensure you use `feat/` or `fix/` prefixes for commits.
3. Open a PR with a detailed description of changes.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
