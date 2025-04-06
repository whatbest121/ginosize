# Ginosize Project

โปรเจคนี้ประกอบด้วย 3 ส่วนหลัก:
1. **Frontend**: Next.js application
2. **Backend**: Node.js API server
3. **Database**: MongoDB

## โปรเจคนี้ เมื่อรันขึ้นมาจะทำการสร้าง user และ listItem ให้แล้วด้วย seed ตอนรัน backend
- username: admin0 
- password: 123456

## การติดตั้งและรันด้วย Docker

### ความต้องการเบื้องต้น
- Docker
- Docker Compose

### วิธีรัน
1. Clone repository:
```bash
git clone <repository-url>
cd jenosize
```

2. รันแอปพลิเคชันด้วย Docker Compose:
```bash
docker-compose up -d
```

3. แอปพลิเคชันจะทำงานที่:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3023
   - MongoDB: localhost:27017

### วิธีหยุดการทำงาน
```bash
docker-compose down
```

### ถ้าต้องการลบข้อมูลทั้งหมดรวมถึง volumes
```bash
docker-compose down -v
```

## การพัฒนาแบบไม่ใช้ Docker

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/signup` - สมัครสมาชิกใหม่
- `POST /auth/login` - เข้าสู่ระบบ

### Items
- `GET /item` - รับรายการสินค้าทั้งหมด
  - Query params: 
    - `page` (number): หน้าที่ต้องการ
    - `limit` (number): จำนวนรายการต่อหน้า
    - `sortBy` (string): ฟิลด์ที่ต้องการจัดเรียง (ค่าเริ่มต้น: "price")
    - `sortOrder` (string): ลำดับการเรียงจากน้อยไปมาก "asc" หรือจากมากไปน้อย "desc"
- `POST /item/add` - เพิ่มสินค้าใหม่ 