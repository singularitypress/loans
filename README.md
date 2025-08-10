# Loan Calculator – Next.js + TypeScript

This project is a simple **Loan Calculator** built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
It demonstrates how to:

- Manage form state with `useReducer`
- Render a responsive UI using Tailwind utility classes
- Use Google Fonts via the `next/font` package
- Keep the code concise and type‑safe

---

## 📦 Installation

```bash
# Install dependencies
bun i        # or npm i / pnpm i
```

> **Tip** – If you’re using a newer version of Node (≥18), everything will work out‑of‑the‑box.

---

## 🚀 Run in Development Mode

```bash
bun run dev   # or npm run dev / pnpm dev
```

Open your browser and visit `http://localhost:3000`.  
The page should display the **Loan Calculator** form with inputs for:

- Principal Amount
- Interest Rate (%)
- Term (in years)
- Payment Frequency (Monthly/Weekly/Biweekly)

---

## 🏗️ Project Structure

```
.
├── src/
│   ├── pages/
│   │   └── index.tsx          # Main page – the calculator UI
│   ├── components/            # (Optional) reusable UI components
│   └── styles/                # Global CSS / Tailwind config
├── public/
├── package.json
└── tailwind.config.js
```

### `index.tsx` Highlights

- **Font Loading**  
  Uses `next/font/google` to load the Geist font family.

- **State Management**  
  A reducer (`formReducer`) handles updates for principle, interest, term, and frequency.

- **Form Controls**  
  Each input dispatches an action on change. The form currently only displays the current values; you can extend it with actual loan calculations later.

---

## 🧪 Extending the Calculator

To add real‑time loan payment calculation:

1. Create a utility function that accepts `principal`, `interestRate`, `termYears`, and `frequency`.
2. Compute the periodic payment using the amortization formula.
3. Display the result below the form or inside the submit handler.

---

## 📦 Production Build

```bash
bun run build   # or yarn build / pnpm build
bun start       # starts the production server
```

---

## 🤝 Contributing

Feel free to fork, open issues, and submit pull requests.  
When contributing:

- Keep TypeScript types accurate.
- Follow the existing style (Tailwind utilities).
- Add tests if you add new logic.

---

## 📜 License

This project is licensed under the MIT License – see `LICENSE` for details.

---