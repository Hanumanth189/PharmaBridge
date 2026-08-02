# PharmaBridge Academy - Industry Readiness Program 2026 Platform

Welcome to the official web application repository for **PharmaBridge Academy (Industry Readiness Program 2026)**, founded by **Panuganti Hanumantha Rao, M.Pharm** (NIPER Trained, GPAT Qualified, Associate Programmer at GSK).

This platform serves as an interactive hub for students to explore the **55-session curriculum**, explore **10 pharmaceutical career pathways**, and access version-controlled student learning materials hosted on **GitHub Storage**.

---

## 🌟 Key Features

- **55-Session Curriculum Explorer**: Filter and view sessions across 3 progressive tracks:
  1. **Knowledge Track** (25 Sessions) - QA, QC, Regulatory Affairs, Pharmacovigilance, Clinical Research.
  2. **Digital Skills Track** (20 Sessions) - Advanced Excel for Pharma, AI Tools, Documentation, CDISC/Clinical Data.
  3. **Career Readiness Track** (10 Sessions) - ATS Resume Building, Interview Q&A, Career Mapping.
- **Git Material Storage Hub**: Live search and filter catalog connected directly to GitHub repositories for downloading workbooks, SOP templates, Excel datasets, and regulatory guides.
- **10 Career Pathways**: Mapped target roles for Clinical Research, QA, QC, RA, Medical Writing, Pharmacovigilance, and Clinical Data Management.
- **Founder Spotlight & Contact Integration**: Comprehensive overview of academic and industry credentials.

---

## 🚀 How to Run Locally

Since this is a clean, modern zero-dependency web app (HTML5, CSS3, JavaScript), you can view it directly in your browser:

1. Double click on `index.html` or open it with Google Chrome / Microsoft Edge / Firefox.
2. Alternatively, use a local server like VS Code Live Server or python:
   ```bash
   npx http-server ./ -p 8080
   ```
   Open `http://localhost:8080` in your web browser.

---

## 🌐 How to Deploy to GitHub Pages (Free Hosting)

Follow these simple steps to deploy this website live on GitHub in under 2 minutes:

### Step 1: Initialize Git and Push to GitHub

Open your terminal in this project folder (`c:\Users\hanum\OneDrive\Desktop\project`) and run:

```bash
git init
git add .
git commit -m "Initial commit - PharmaBridge Academy Platform"
```

Create a new empty repository on your GitHub account named `pharmabridge-academy` (or similar), then connect and push:

```bash
git branch -M main
git remote add origin https://github.com/hanumanthpanuganti/pharmabridge-academy.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/hanumanthpanuganti/pharmabridge-academy`.
2. Click on **Settings** (top right tab).
3. Scroll down to **Pages** in the left sidebar under "Code and automation".
4. Under **Build and deployment -> Source**, select **Deploy from a branch**.
5. Under **Branch**, select `main` and `/ (root)` directory, then click **Save**.
6. After 1-2 minutes, your website will be live at:
   `https://hanumanthpanuganti.github.io/pharmabridge-academy/`

---

## 📁 Repository Structure

```
├── index.html        # Main landing page & student portal
├── styles.css        # Luxury dark navy & emerald design system
├── script.js        # Dynamic track switcher, search filter, Git URL copy
├── materials.json    # Catalog of student learning materials with Git storage links
└── README.md         # Documentation & deployment guide
```

---

## 👨‍🏫 Founder Contact & Support

- **Founder**: Panuganti Hanumantha Rao, M.Pharm
- **Email**: hanumanthpanuganti@gmail.com
- **Phone**: +91 75699 09707
- **Website**: www.pharmabridgeacademy.in
