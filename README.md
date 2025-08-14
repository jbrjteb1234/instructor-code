# instructor-code

A simple full-stack teaching project with a **frontend** (JavaScript/HTML) and a **backend** (primarily **Python**). Use it as a starter or as lecture/demo code for explaining client–server basics, API consumption, and persistence.

---

## Table of Contents
- [Quick start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [1) Clone](#1-clone)
  - [2) Frontend (dev)](#2-frontend-dev)
  - [3) Backend (dev)](#3-backend-dev)
- [Project structure](#project-structure)

---

## Quick start

### Prerequisites
- **Node.js** LTS (18+ recommended) & **npm**/**pnpm** for the frontend  
- **Python 3.10+** for the backend  
- Optional: **Git**, **curl**, **make**

### 1) Clone
```bash
git clone https://github.com/jbrjteb1234/instructor-code.git
cd instructor-code

cd frontend
# If an env example exists, copy it:
# cp .env.example .env
npm install
npm run dev   # or: npm start

cd ../backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt


