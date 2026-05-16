# 🔗 BEM Connect

Platform khusus untuk ngepost hal hal seru di BEM seperti kegiatan, pengumuman, sampai momen kebersamaan.

## 🛠️ Tech Stack

### Frontend
- React + Vite
- React Router DOM

### Backend
- ExpressJS
- PostgreSQL
- JWT Authentication
- Multer (Image Upload)
- Bcrypt

## 📁 Struktur Project
```
bem-connect/
├── backend/                # ExpressJS Backend
│   └── src/
│       ├── config/         # Database & Multer config
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── uploads/        # Uploaded images
│   
├── src/                    # React Frontend
│   ├── api/                # API handlers
|   ├── assets/
│   ├── components/
│   └── pages/
└── public/
```

## ⚙️ Environment Variables

Buat file `.env` di folder `backend/`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bemconnect
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
PORT=5000
```

## 🚀 Cara Deploy Lokal

### Prerequisites
- Node.js v18+
- PostgreSQL v16+

### 1. Clone Repository
```bash
git clone https://github.com/jendoraa/bem-connect.git
cd bem-connect
```

### 2. Setup Database
```bash
sudo -u postgres psql
```
```sql
CREATE DATABASE bemconnect;
\q
```

### 3. Setup Backend
```bash
cd backend
npm install
```

Buat file `.env` dan isi sesuai environment variables di atas.

```bash
npm run dev
```

Server berjalan di `http://localhost:5000`

### 4. Setup Frontend
Buka terminal baru:
```bash
cd bem-connect
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`

## 📱 Fitur

- ✅ Landing Page
- ✅ Register & Login dengan JWT
- ✅ Timeline dengan postingan
- ✅ Upload gambar
- ✅ Like & Unlike post
- ✅ Komentar & Reply
- ✅ Responsive design

## 👥 Kontak

- CP: Nanda
- ID LINE: 16273551