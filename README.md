# Ginosize Project

โปรเจคนี้ประกอบด้วย 3 ส่วนหลัก:
1. **Frontend**: Next.js application
2. **Backend**: Node.js API server
3. **Database**: MongoDB

## โปรเจคนี้ เมื่อรันขึ้นมาจะทำการสร้าง user และ listItem ให้แล้วด้วย seed ตอนรัน backend
- username: admin0 
- password: 123456
- ทำการ list item ทั้งหมด 100 item

## การติดตั้งและรันด้วย Docker

### ความต้องการเบื้องต้น
- Docker
- Docker Compose

### วิธีรัน
1. Clone repository:
```bash
git clone https://github.com/whatbest121/ginosize.git
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

## ฟีเจอร์หลัก

### ระบบยืนยันตัวตน (Authentication)
- **การลงทะเบียน**: ผู้ใช้สามารถสร้างบัญชีใหม่ด้วย username และ password
- **การเข้าสู่ระบบ**: ผู้ใช้ที่มีบัญชีแล้วสามารถเข้าสู่ระบบ
- **การออกจากระบบ**: ผู้ใช้สามารถออกจากระบบได้
- **การป้องกันหน้า**: หน้าบางหน้าจะถูกป้องกันไม่ให้ผู้ใช้ที่ไม่ได้เข้าสู่ระบบเข้าถึง

### ระบบสินค้า (Item Management)
- **รายการสินค้า**: แสดงสินค้าทั้งหมดในระบบ
- **การเพิ่มสินค้า**: ผู้ใช้ที่เข้าสู่ระบบแล้วสามารถเพิ่มสินค้าใหม่ได้
- **การจัดเรียง**: สามารถเรียงสินค้าตามราคา (มากไปน้อย/น้อยไปมาก)

### ระบบตะกร้าสินค้า (Shopping Cart)
- **เพิ่มสินค้าลงตะกร้า**: ผู้ใช้สามารถเพิ่มสินค้าลงในตะกร้าได้
- **ปรับเปลี่ยนจำนวน**: ผู้ใช้สามารถเพิ่มหรือลดจำนวนสินค้าในตะกร้าได้
- **ลบสินค้า**: ผู้ใช้สามารถลบสินค้าออกจากตะกร้าได้
- **การคงอยู่ของข้อมูล**: ข้อมูลตะกร้าจะถูกเก็บไว้แม้จะรีเฟรชหน้า


## โครงสร้างโปรเจค

### Frontend (Next.js)
```
frontend/
├── public/                # สินทรัพย์สาธารณะ
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── cart/          # หน้าตะกร้าสินค้า
│   │   ├── items/         # หน้ารายการสินค้า
│   │   │   └── add/       # หน้าเพิ่มสินค้า
│   │   ├── login/         # หน้าเข้าสู่ระบบ
│   │   ├── register/      # หน้าลงทะเบียน
│   │   └── layout.tsx     # Layout หลักของแอป
│   ├── components/        # React components
│   │   ├── auth/          # คอมโพเนนท์สำหรับการยืนยันตัวตน
│   │   ├── cart/          # คอมโพเนนท์สำหรับตะกร้าสินค้า
│   │   ├── navigation/    # คอมโพเนนท์การนำทาง (Navbar)
│   │   └── ui/            # คอมโพเนนท์ UI พื้นฐาน
│   ├── hooks/             # React hooks
│   │   ├── useAuth.ts     # การจัดการยืนยันตัวตน
│   │   └── useItems.ts    # การจัดการสินค้า
│   ├── lib/               # ไลบรารีและยูทิลิตี้
│   │   ├── api.ts         # การตั้งค่า Axios
│   │   ├── auth-provider.tsx # Authentication context provider
│   │   └── utils.ts       # ฟังก์ชันช่วยเหลือทั่วไป
│   └── store/             # Global state management
│       └── cartStore.ts   # Zustand store สำหรับตะกร้าสินค้า
```

### Backend (Node.js/Express)
```
backend/
├── src/
│   ├── index.ts           # Entry point
│   ├── middleware/        # Express middlewares
│   │   └── jwt.ts         # JWT authentication middleware
│   ├── mongo/             # ส่วนเชื่อมต่อ MongoDB
│   │   ├── initial.ts     # การเชื่อมต่อฐานข้อมูล
│   │   └── model/         # โมเดลฐานข้อมูล
│   │       ├── item.ts    # โมเดลสินค้า
│   │       └── user.ts    # โมเดลผู้ใช้
│   ├── router/            # Express routes
│   │   ├── api.ts         # API routes
│   │   ├── auth.ts        # Authentication routes
│   │   └── item.ts        # Item management routes
│   └── seed/              # ข้อมูลเริ่มต้น
│       └── seedItem.ts    # ข้อมูลสินค้าเริ่มต้น
```