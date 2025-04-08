create folder : frontend and backend
---------- Project Setup Backend ----------
npm intit -y
npm install express mongoose dotenv
npm i nodemon -D
mongoDB u: thanawatchmp p: fIrKIqUf1SwuRLf6

####### change command in package.json
-  "scripts": { "dev": "nodemon backend/server.js" } เพื่อใช้ npm run dev ในการ run server
-  "type": "module", เพื่อสามารถ (import express from "express") แบบ ES module สมัยใหม่ได้ (แบบเก่า const express = require("express"))

### ขั้นตอนการตั้งค่าและสร้าง Backend API ด้วย MERN Stack

#### 1. สร้างโครงสร้างโฟลเดอร์เริ่มต้น
- สร้างโฟลเดอร์เปล่าบนเดสก์ท็อปชื่อ **"Mern Crash Course"**
- เปิดโฟลเดอร์นี้ใน **VS Code**
- วางแผนสร้างสองโฟลเดอร์ย่อย: **frontend** และ **backend** (แต่ในส่วนแรกนี้เน้นที่ backend ก่อน)

#### 2. ตั้งค่าโปรเจกต์ที่ Root
- เปิดเทอร์มินัลใน VS Code (ใช้ Ctrl + J)
- รันคำสั่ง `npm init -y` ที่ **root** (ไม่ต้อง cd เข้า backend) เพื่อสร้างไฟล์ **package.json**
- เหตุผลที่ทำที่ root: เพื่อให้ง่ายต่อการ deploy แอปพลิเคชันในภายหลัง โดยสคริปต์ทั้งหมดจะอยู่ที่นี่

#### 3. ติดตั้งแพ็กเกจที่จำเป็น
- รันคำสั่ง `npm install express mongoose dotenv` เพื่อติดตั้ง:
  - **express**: Web framework สำหรับสร้าง API และจัดการ routing
  - **mongoose**: ใช้เชื่อมต่อและโต้ตอบกับฐานข้อมูล MongoDB
  - **dotenv**: ใช้จัดการตัวแปร environment (เช่น connection string)
- ผลลัพธ์: สร้างโฟลเดอร์ **node_modules** และอัปเดต dependencies ใน **package.json**

#### 4. สร้างไฟล์ Server.js
- สร้างไฟล์ชื่อ **Server.js** (จุดเริ่มต้นของ API)
- เปลี่ยน package.json ให้ใช้ ES Modules:
  - เพิ่มฟิลด์ `"type": "module"` ใน **package.json**
- เขียนโค้ดพื้นฐานใน **Server.js**:
  ```javascript
  import express from 'express';
  const app = express();
  app.listen(5000, () => console.log('server started at localhost:5000'));
  ```
- ทดสอบรันด้วย `node backend/Server.js` (ต้อง cd เข้า backend ก่อน)

#### 5. ปรับปรุงการรันด้วย Nodemon
- เพิ่มสคริปต์ใน **package.json**:
  ```json
  "scripts": {
    "dev": "node backend/Server.js"
  }
  ```
- ติดตั้ง **nodemon** เป็น dev dependency: `npm install nodemon -D`
- แก้สคริปต์ใน **package.json** เป็น:
  ```json
  "scripts": {
    "dev": "nodemon backend/Server.js"
  }
  ```
- รัน `npm run dev` เพื่อให้เซิร์ฟเวอร์รีสตาร์ทอัตโนมัติเมื่อมีการเปลี่ยนแปลงโค้ด

#### 6. สร้าง Route พื้นฐาน
- เพิ่ม route ใน **Server.js**:
  ```javascript
  app.get('/', (req, res) => res.send('Server is ready'));
  ```
- ทดสอบ: รัน `npm run dev` และเข้าไปที่ `localhost:5000` ในเบราว์เซอร์ ควรเห็นข้อความ "Server is ready"

#### 7. ตั้งค่าฐานข้อมูล MongoDB
- ไปที่ **mongodb.com** สร้างบัญชี (ถ้ายังไม่มี) และล็อกอิน
- สร้างโปรเจกต์ใหม่:
  - ตั้งชื่อโปรเจกต์ เช่น **"mern course"**
  - สร้าง cluster ฟรี (ใช้ค่าเริ่มต้น)
- สร้างผู้ใช้และคัดลอกรหัสผ่าน
- คัดลอก **connection string** จาก MongoDB Atlas

#### 8. จัดการ Environment Variables
- สร้างไฟล์ **.env** ใน root
- วาง connection string ในรูปแบบ:
  ```env
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/products?retryWrites=true&w=majority
  ```
  - แทน `<password>` ด้วยรหัสผ่านที่คัดลอกมา
  - กำหนดชื่อฐานข้อมูลเป็น **products**
- ปรับแต่ง **Network Access** ใน MongoDB Atlas:
  - เลือก "Allow Access from Anywhere" เพื่อให้เชื่อมต่อได้ในช่วงพัฒนา

#### 9. เชื่อมต่อ MongoDB กับแอป
- แก้ไข **Server.js** เพื่อใช้ dotenv:
  ```javascript
  import dotenv from 'dotenv';
  dotenv.config();
  ```
- สร้างโฟลเดอร์ **config** และไฟล์ **db.js**:
  ```javascript
  import mongoose from 'mongoose';

  export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    } catch (error) {
      console.log(error.message);
      process.exit(1); // 1 หมายถึง failure
    }
  };
  ```
- เรียกใช้ใน **Server.js**:
  ```javascript
  import { connectDB } from './config/db.js';
  connectDB();
  ```
- รัน `npm run dev` ควรเห็นข้อความ "MongoDB connected" ในเทอร์มินัล

---------------------- Building On API -----------------------

### ขั้นตอนการพัฒนา Backend API สำหรับจัดการสินค้าใน MERN Stack

#### 1. ทำความเข้าใจ MongoDB และโครงสร้างข้อมูล
- **เปรียบเทียบ SQL กับ NoSQL**:  
  - SQL (เช่น MySQL) ใช้ "ตาราง" (tables) มีแถวและคอลัมน์  
  - NoSQL (เช่น MongoDB) ใช้ "คอลเลกชัน" (collections) และในคอลเลกชันมี "เอกสาร" (documents)  
- **ตัวอย่าง**:  
  - คอลเลกชัน "products" มีเอกสาร เช่น "นาฬิกาอัจฉริยะ", "หูฟังไร้สาย", "รองเท้า"  
  - คอลเลกชัน "users" มีเอกสาร เช่น "จอห์น", "เจน", "บ็อบ"  
- **เป้าหมาย**: สร้างคอลเลกชัน "products" เพื่อเก็บข้อมูลสินค้า

#### 2. สร้างโมเดลสำหรับสินค้า
- สร้างโฟลเดอร์ **models** และไฟล์ **product.model.js**  
- เขียนโค้ด:  
  ```javascript
  import mongoose from 'mongoose';
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
  }, { timestamps: true });
  const Product = mongoose.model('Product', productSchema);
  export default Product;
  ```
- **คำอธิบาย**:  
  - กำหนดฟิลด์: `name`, `price`, `image` (ต้องระบุทั้งหมด)  
  - เพิ่ม `timestamps: true` เพื่อให้มี `createdAt` และ `updatedAt` อัตโนมัติ  
  - Mongoose แปลง "Product" เป็น "products" (พหูพจน์, ตัวพิมพ์เล็ก) ในฐานข้อมูล

#### 3. อธิบายแนวคิด API
- **API คืออะไร**:  
  - ย่อมาจาก "Application Programming Interface"  
  - เป็นตัวกลางที่เชื่อมต่อระหว่างไคลเอนต์ (เช่น React) กับเซิร์ฟเวอร์/ฐานข้อมูล  
- **ตัวอย่างเปรียบเทียบ**:  
  - ลูกค้าสั่งอาหาร → พนักงานเสิร์ฟ (API) → ส่งให้เชฟ (ฐานข้อมูล) → ได้อาหารกลับมา  
- **ในแอปนี้**: API จะให้ผู้ใช้สร้าง, ดึง, อัปเดต, หรือลบสินค้า

#### 4. สร้าง Endpoint พื้นฐานใน Server.js
- **POST /api/products** (สร้างสินค้า):  
  ```javascript
  app.use(express.json()); // Middleware เพื่อรับ JSON
  app.post('/api/products', async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }
    try {
      const newProduct = new Product(product);
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error('Error in createProduct', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  ```
- **ทดสอบ**:  
  - ใช้ **Postman**: POST `http://localhost:5000/api/products`  
  - ส่ง JSON เช่น `{"name": "smartwatch", "price": 123.99, "image": "example.com/image"}`  
  - ตรวจสอบใน MongoDB Atlas > คอลเลกชัน "products" มีข้อมูล

#### 5. เพิ่ม Endpoint อื่น ๆ
- **DELETE /api/products/:id** (ลบสินค้า):  
  ```javascript
  app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  });
  ```
- **GET /api/products** (ดึงสินค้าทั้งหมด):  
  ```javascript
  app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error('Error in fetching products', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  ```
- **PUT /api/products/:id** (อัปเดตสินค้า):  
  ```javascript
  app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  ```
- **ทดสอบใน Postman**:  
  - DELETE: วาง ID จาก MongoDB > ส่ง > ตรวจสอบว่าสินค้าหาย  
  - GET: ดึงข้อมูลทั้งหมด > ตรวจสอบรายการ  
  - PUT: วาง ID > อัปเดตบางฟิลด์หรือทั้งหมด > ตรวจสอบใน MongoDB

#### 6. ปรับโครงสร้างโค้ดให้เป็นระเบียบ
- **แยก Routes**:  
  - สร้างโฟลเดอร์ **routes** และไฟล์ **product.route.js**:  
    ```javascript
    import express from 'express';
    const router = express.Router();
    router.get('/', getProducts);
    router.post('/', createProduct);
    router.put('/:id', updateProduct);
    router.delete('/:id', deleteProduct);
    export default router;
    ```
  - อัปเดต **Server.js**:  
    ```javascript
    import productRoutes from './routes/product.route.js';
    app.use('/api/products', productRoutes);
    ```
- **แยก Controllers**:  
  - สร้างโฟลเดอร์ **controllers** และไฟล์ **product.controller.js**:  
    ```javascript
    import mongoose from 'mongoose';
    import Product from '../models/product.model.js';

    export const getProducts = async (req, res) => {...};
    export const createProduct = async (req, res) => {...};
    export const updateProduct = async (req, res) => {...};
    export const deleteProduct = async (req, res) => {...};
    ```
  - อัปเดต **product.route.js** เพื่อนำเข้าฟังก์ชันจาก controllers  
- **ผลลัพธ์**:  
  - โค้ดใน **Server.js** เหลือแค่การกำหนด routes  
  - Routes และ logic แยกไปอยู่ในไฟล์ที่เหมาะสม

#### 7. ทดสอบและสรุป
- ทดสอบทุก endpoint ใน Postman:  
  - GET: ดึงสินค้าทั้งหมด  
  - POST: สร้างสินค้าใหม่  
  - PUT: อัปเดตสินค้า  
  - DELETE: ลบสินค้า  
- **โครงสร้างทั้งหมด**:  
  - **Server.js**: จุดเริ่มต้น, middleware, และกำหนด routes  
  - **routes/product.route.js**: จัดการเส้นทาง API  
  - **controllers/product.controller.js**: ฟังก์ชันสำหรับแต่ละ endpoint  
  - **models/product.model.js**: โมเดลสำหรับสินค้า  
  - **config/db.js**: การเชื่อมต่อ MongoDB  
  - **.env**: เก็บ connection string  
- **สำเร็จ**: Backend API พร้อมใช้งานสำหรับจัดการสินค้า  
- **ขั้นต่อไป**: พัฒนา frontend ในส่วนถัดไป

### สรุป
เนื้อหานี้ครอบคลุมการสร้าง Backend API ด้วย **Node.js**, **Express**, และ **MongoDB** โดยใช้ **Mongoose** เพื่อจัดการสินค้าในฐานข้อมูล มี CRUD operations (Create, Read, Update, Delete) และปรับโครงสร้างโค้ดให้เป็นระเบียบด้วยการแยก **routes** และ **controllers** เพื่อให้โค้ดสะอาดและ维护ง่ายขึ้น ขั้นตอนนี้เป็นรากฐานสำหรับการพัฒนา frontend ในอนาคต

### สรุปเนื้อหาและขั้นตอนการพัฒนาแอปพลิเคชัน

#### 1. อัปเดตการตั้งค่าพอร์ต (Port) ในฝั่งเซิร์ฟเวอร์
- **เป้าหมาย**: เปลี่ยนจากการกำหนดพอร์ตแบบตายตัว (hard coded) เป็นการดึงค่าจากตัวแปรสภาพแวดล้อม (environment variables)
- **ขั้นตอน**:
  1. แทนที่จะกำหนด `port = 5000` แบบตายตัว เปลี่ยนเป็นดึงจาก `process.env.PORT`
  2. เพิ่มค่า fallback เป็น 5000 หากตัวแปร `PORT` ไม่ถูกกำหนดในไฟล์ `.env`
  3. อัปเดตโค้ดให้ใช้ตัวแปร `port` แทนค่า 5000 เดิม
  4. ทดสอบโดยรัน `npm run dev` และตรวจสอบว่าเซิร์ฟเวอร์รันที่พอร์ต 5000
  5. ลองเปลี่ยนค่าใน `.env` เป็น 5001 เพื่อยืนยันว่าค่าพอร์ตอัปเดตตามไฟล์ `.env`

- **ผลลัพธ์**: เซิร์ฟเวอร์ยังคงทำงานที่พอร์ต 5000 แต่ตอนนี้ยืดหยุ่นขึ้นโดยใช้ตัวแปรสภาพแวดล้อม

---

#### 2. อัปเดตการจัดการข้อผิดพลาดในคอนโทรลเลอร์ (Controllers)
- **เป้าหมาย**: ปรับปรุงการตอบสนองข้อผิดพลาดในฟังก์ชัน `delete product`
- **ขั้นตอน**:
  1. เปลี่ยนสถานะการตอบสนองจาก 404 เป็น 500 เมื่อเกิดข้อผิดพลาดทั่วไป
  2. อัปเดตข้อความเป็น "ข้อผิดพลาดของเซิร์ฟเวอร์" (server error)
  3. เพิ่มการตรวจสอบ ID:
     - หาก ID ไม่ถูกต้อง ส่งกลับสถานะ 404 พร้อมข้อความ "ID ผลิตภัณฑ์ไม่ถูกต้อง" (invalid product ID)
  4. บันทึกการเปลี่ยนแปลง

- **ผลลัพธ์**: การจัดการข้อผิดพลาดดีขึ้น แยกกรณี ID ไม่ถูกต้อง (404) และข้อผิดพลาดเซิร์ฟเวอร์ (500)


---------- Project Setup Frontend ----------

#### 3. เริ่มต้นสร้างแอปพลิเคชันฝั่งหน้าบ้าน (Frontend) ด้วย Vite และ React
- **เป้าหมาย**: ตั้งค่าโปรเจกต์ frontend ด้วย React และ JavaScript
- **ขั้นตอน**:
  1. เปิดเทอร์มินัลใหม่ เข้าไปในโฟลเดอร์ `frontend`
  2. รันคำสั่ง `npm create vite@latest .` เพื่อเริ่มต้นโปรเจกต์ในโฟลเดอร์ปัจจุบัน
  3. เลือก `React` และ `JavaScript` (หรือ TypeScript ถ้าต้องการ แต่เลือก JavaScript เพื่อความง่าย)
  4. รัน `npm install` เพื่อติดตั้ง dependencies

- **ผลลัพธ์**: โปรเจกต์ frontend ถูกสร้างพร้อมโฟลเดอร์ `node_modules`

---

#### 4. ตั้งค่า Chakra UI ในโปรเจกต์ Frontend
- **เป้าหมาย**: ใช้ Chakra UI เป็นไลบรารีคอมโพเนนต์เพื่อเร่งการพัฒนา UI
- **หมายเหตุ**: วิดีโอใช้ Chakra UI เวอร์ชัน 2 แต่ปัจจุบันมีเวอร์ชัน 3 ซึ่งมี breaking changes ดังนั้นต้องเลือกเวอร์ชัน 2
- **ขั้นตอน**:
  1. ไปที่เอกสาร Chakra UI เลือกเวอร์ชัน 2
  2. คัดลอกคำสั่งติดตั้งสำหรับเวอร์ชัน 2 (เช่น `npm i @chakra-ui/react@2 ...`) แล้วรันในเทอร์มินัล
  3. ตั้งค่า `ChakraProvider`:
     - เปิดไฟล์ `main.jsx`
     - ห่อคอมโพเนนต์ `App` ด้วย `<ChakraProvider>`
     - นำเข้า `ChakraProvider` จาก `@chakra-ui/react`
  4. ลบไฟล์ CSS ที่ไม่ใช้ (`index.css` และ `app.css`)
  5. ทดสอบโดยแก้ไข `app.jsx`:
     - ลบโค้ดเดิม
     - นำเข้า `Button` จาก `@chakra-ui/react`
     - เพิ่ม `<Button>Hello</Button>`
  6. รัน `npm run dev` และตรวจสอบว่าเห็นปุ่มในหน้าเว็บ

- **ผลลัพธ์**: Chakra UI ถูกติดตั้งและใช้งานได้ แสดงปุ่ม "Hello" บนหน้าเว็บ (อาจเป็นโหมดมืดหรือสว่างขึ้นกับการตั้งค่า)

---

#### 5. วางแผนขั้นตอนต่อไป
- **เป้าหมาย**: เริ่มสร้างคอมโพเนนต์ Navbar
- **ขั้นตอน**: 
  1. สร้างคอมโพเนนต์ Navbar เป็นส่วนแรกของ UI
  2. ใช้คอมโพเนนต์จาก Chakra UI เพื่อความรวดเร็ว

- **ผลลัพธ์ที่คาดหวัง**: Navbar จะเป็นจุดเริ่มต้นของการพัฒนา UI ฝั่งหน้าบ้าน

---

### สรุปภาพรวม
- **ฝั่งเซิร์ฟเวอร์**: อัปเดตพอร์ตให้ยืดหยุ่นด้วย `.env` และปรับปรุงการจัดการข้อผิดพลาด
- **ฝั่งหน้าบ้าน**: ตั้งค่าโปรเจกต์ด้วย Vite + React + Chakra UI (เวอร์ชัน 2) และทดสอบการแสดงผลเบื้องต้น
- **ต่อไป**: สร้าง Navbar และพัฒนา UI ต่อ

----------- Navbar and Create Paeg --------------

----- NEW WORD KNOW HOW --------

########## BrowserRouter คือ?	ตัวควบคุมเส้นทางใน React
ใช้ทำอะไร?	=> เปลี่ยนหน้าในเว็บโดยไม่โหลดใหม่ทั้งหน้า
ต้องใช้เมื่อไหร่? => 	เมื่อทำเว็บที่มีหลายหน้า (route)
ทำให้เว็บดูเร็วขึ้นไหม?	=> ใช่ เพราะไม่โหลดหน้าใหม่ทุกครั้ง

########## Routes and Route ต่างกันอย่างไร
Routes	ตัวรวมและจัดการการจับเส้นทาง (เหมือน switch-case)	ต้องห่อ Route
Route	กำหนดว่า URL ไหนจะแสดง component ไหน	อยู่ใน Routes

########## prop in chakra ui on flexDir
base: "column" → ใช้ column (แนวตั้ง) สำหรับหน้าจอขนาดเล็ก
sm: "row" → ใช้ row (แนวนอน) สำหรับหน้าจอที่มีขนาด sm หรือใหญ่กว่า

########## { ...newProduct, image: e.target.value } คืออะไร อธิบายเพิ่มเติม
อันนี้คือการใช้ JavaScript spread syntax.
+ ...newProduct หมายถึง: 
  + เอาทุก property เดิมใน newProduct มาก่อน (เช่น name, price, description ฯลฯ) 
+ แล้ว image: e.target.value จะ: 
  + เพิ่มหรือแก้ไข property ที่ชื่อว่า image ให้เป็นค่าที่ผู้ใช้กรอกใน input
  + e.target.value คือค่าที่อยู่ใน <input> (เช่น URL รูปภาพที่ผู้ใช้พิมพ์)

+ ดังนั้นโค้ดนี้จะ:
  + เอาค่า state newProduct เดิมทั้งหมด
  + แล้วอัปเดต/เพิ่ม field image ให้เป็นค่าที่ผู้ใช้ป้อน

###############################################################################

### สรุปเนื้อหาและขั้นตอนการสร้างแอปพลิเคชัน React ด้วย Navbar และหน้าเพจ

#### เป้าหมาย
สร้างแอปพลิเคชัน React ที่มี Navbar และหลายหน้า (Homepage และ Create Page) โดยใช้ `react-router-dom` สำหรับการนำทาง และ Chakra UI สำหรับการออกแบบ UI รวมถึงเพิ่มฟังก์ชันสลับโหมดสี (Light/Dark Mode) และฟอร์มในหน้าสร้าง

### ขั้นตอนการสร้าง

#### ขั้นตอนที่ 1: ตั้งค่าโครงสร้างพื้นฐาน
1. **ติดตั้งแพ็กเกจที่จำเป็น**
   - เปิดเทอร์มินัลในโฟลเดอร์ `frontend`
   - รันคำสั่ง: `npm install react-router-dom` เพื่อติดตั้งการนำทาง
   - รันคำสั่ง: `npm install react-icons` เพื่อใช้ไอคอนใน UI

2. **ตั้งค่า Router**
   - ไปที่ไฟล์ `main.jsx`
   - ห่อแอปพลิเคชันทั้งหมดด้วย `<BrowserRouter>` จาก `react-router-dom` เพื่อให้สามารถใช้การนำทางได้
   - นำเข้า: `import { BrowserRouter } from 'react-router-dom'`

3. **สร้างโครงสร้างโฟลเดอร์**
   - ลบโฟลเดอร์ `assets` ที่ไม่ใช้
   - สร้างโฟลเดอร์ `src/pages` สำหรับหน้าเพจ
   - สร้างโฟลเดอร์ `src/components` สำหรับคอมโพเนนต์
   - สร้างไฟล์:
     - `Navbar.jsx` ใน `components`
     - `Homepage.jsx` และ `CreatePage.jsx` ใน `pages`

---

#### ขั้นตอนที่ 2: สร้างระบบนำทางใน `App.jsx`
1. **ตั้งค่าเลย์เอาท์หลัก**
   - ใน `App.jsx`:
     - สร้าง `<Box>` (จาก Chakra UI) ความสูงขั้นต่ำ `100vh` เพื่อครอบคลุมทั้งหน้าจอ = <div>
     - เพิ่ม `<Navbar />` ด้านบนเพื่อให้แสดงในทุกหน้า
     - เพิ่ม `<Routes>` เพื่อกำหนดเส้นทาง

2. **กำหนดเส้นทาง**
   - นำเข้า `Routes` และ `Route` จาก `react-router-dom`
   - เพิ่มเส้นทาง:
     - `<Route path="/" element={<Homepage />} />` สำหรับหน้าแรก 
     - `<Route path="/create" element={<CreatePage />} />` สำหรับหน้าสร้าง
   - นำเข้าคอมโพเนนต์: `Homepage`, `CreatePage`, และ `Navbar`

3. **ทดสอบ**
   - บันทึกและรันแอป ตรวจสอบว่า Navbar ปรากฏในทุกหน้า และสามารถสลับไปมาระหว่างหน้าแรกและหน้าสร้างได้

---

#### ขั้นตอนที่ 3: สร้าง Navbar
1. **ออกแบบเลย์เอาท์**
   - ใน `Navbar.jsx`:
     - ใช้ `<Container>` (Chakra UI) ความกว้างสูงสุด `1140px` และ `paddingX={4}` เพื่อจัดกึ่งกลาง
     - ใช้ `<Flex>` ความสูง `16` เพื่อจัดวางองค์ประกอบซ้าย-ขวา:
       - `alignItems="center"`
       - `justifyContent="space-between"`

2. **เพิ่มองค์ประกอบ**
   - **ด้านซ้าย**: ใช้ `<Text>` แสดงข้อความ "Product Store" พร้อมสไตล์:
     - ใช้การไล่ระดับสี (gradient) จากเอกสาร Chakra UI
     - ขนาดตัวอักษรตอบสนอง: `22` (เล็ก) และ `28` (ใหญ่), ตัวหนา, ตัวพิมพ์ใหญ่
   - **ด้านขวา**: ใช้ `<HStack>` (ระยะห่าง `2`) วางปุ่มสองปุ่ม:
     - ปุ่ม "Create" (ใช้ `<Link>` ไป `/create`) พร้อมไอคอน `PlusSquareIcon` (จาก Chakra UI หรือ `react-icons`)
     - ปุ่มสลับโหมดสี

3. **เพิ่มฟังก์ชันสลับโหมดสี**
   - นำเข้า `useColorMode` และ `toggleColorMode` จาก Chakra UI
   - ใช้เงื่อนไขในปุ่ม:
     - ถ้าโหมดเป็น `light` แสดงไอคอน `IoMoon` (จาก `react-icons`)
     - ถ้าโหมดเป็น `dark` แสดงไอคอน `LuSun`
   - ขนาดไอคอน `20`

4. **ปรับแต่งสีพื้นหลัง**
   - ใช้ `useColorModeValue` ใน `<Box>` (ใน `App.jsx`) เพื่อกำหนดสี:
     - โหมดสว่าง: `red.500`
     - โหมดมืด: ค่าเริ่มต้นหรือกำหนดเอง (เช่น `gray.900`)

5. **ทดสอบ**
   - คลิกปุ่ม "Create" ไปหน้าสร้าง
   - คลิกปุ่มโหมดสี สลับระหว่าง Light/Dark และดูการเปลี่ยนแปลง

---

#### ขั้นตอนที่ 4: สร้างหน้า Create Page
1. **ออกแบบ UI**
   - ใน `CreatePage.jsx`:
     - ใช้ `<Container>` ความกว้างสูงสุด `container.sm`
     - ใช้ `<VStack>` (ระยะห่าง `8`) เป็นเลย์เอาท์หลัก
     - เพิ่ม `<Heading>`: "Create New Product" (`as="h1"`, `size="2xl"`, กึ่งกลาง, `marginBottom={8}`)

2. **สร้างฟอร์ม**
   - ใช้ `<Box>` เป็นกล่องฟอร์ม:
     - `width="full"`, `padding={6}`, `rounded="lg"`, `shadow="md"`
     - สีพื้นหลัง: `useColorModeValue("white", "gray.800")`
   - ใช้ `<VStack>` (ระยะห่าง `4`) ข้างใน `<Box>`
   - เพิ่ม `<Input>` สามช่อง:
     - `placeholder="Product Name"`, `name="name"`, `value={newProduct.name}`
     - `placeholder="Price"`, `name="price"`, `value={newProduct.price}`
     - `placeholder="Image URL"`, `name="image"`, `value={newProduct.image}`
   - เพิ่มปุ่ม `<Button>`: "Add Product"

3. **จัดการสถานะ**
   - นำเข้า `useState` และสร้างสถานะ:
     ```jsx
     const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
     ```
   - อัปเดตสถานะใน `onChange` ของ `<Input>`:
     ```jsx
     onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
     ```
     (ทำเหมือนกันกับ `price` และ `image`)

4. **จัดการการเพิ่มผลิตภัณฑ์**
   - สร้างฟังก์ชัน `handleAddProduct`:
     ```jsx
     const handleAddProduct = () => {
       console.log(newProduct);
     };
     ```
   - ผูกกับปุ่ม: `onClick={handleAddProduct}`

5. **ทดสอบ**
   - กรอกข้อมูล (เช่น "iPhone XR", "200", URL รูปภาพ)
   - คลิก "Add Product" ดูผลลัพธ์ในคอนโซล

---

#### ขั้นตอนที่ 5: แผนสำหรับ Global State (ยังไม่ลงมือทำ)
1. **ปัญหาของสถานะปัจจุบัน**
   - ถ้ามีสถานะใน `App.jsx` และส่งไปยังคอมโพเนนต์ลูกหลายชั้น (props drilling) จะไม่เหมาะสมและไม่มีประสิทธิภาพ
   - การอัปเดตสถานะทำให้ทุกคอมโพเนนต์ถูกรีเรนเดอร์

2. **แนวคิด Global State**
   - สร้างสถานะส่วนกลางนอกคอมโพเนนต์
   - คอมโพเนนต์ใดๆ สามารถเข้าถึงและอัปเดตได้โดยตรง
   - เฉพาะคอมโพเนนต์ที่ใช้สถานะจะถูกรีเรนเดอร์

3. **วิธีการในอนาคต**
   - ใช้ `fetch` หรือเครื่องมือจัดการสถานะ (เช่น Context API หรือ Redux) เพื่อบันทึกข้อมูลไปยังฐานข้อมูล

---

### ผลลัพธ์
- **Navbar**: แสดงในทุกหน้า มีปุ่ม "Create" และปุ่มสลับโหมดสี
- **Homepage**: หน้าเริ่มต้น (ยังว่าง)
- **Create Page**: ฟอร์มสำหรับเพิ่มผลิตภัณฑ์ (ชื่อ, ราคา, รูปภาพ) พร้อมบันทึกข้อมูลในสถานะ
- **โหมดสี**: สลับ Light/Dark ได้ทั่วทั้งแอป


---------------- Zustand (lib make Global State) Store & Create Page Implementation ----------------------------

---------------- NEW WORD KNOW HOW ----------------

การเขียนแบบ { ... } = ... เรียกว่าอะไร?
👉 เรียกว่า Destructuring Assignment
(ภาษาไทย: การแยกค่าออกจาก object หรือ array)

มันคือ syntax ที่ช่วยให้เรา "แยกค่า" ออกจาก object หรือ array แล้วเก็บไว้ในตัวแปรแบบสั้น ๆ

ex. const { createProduct } = useProductStore();
หมายความว่า:
useProductStore() return object ที่มี property หลายตัว (เช่น { createProduct, products, setProducts, ... })
เรา ดึงเฉพาะตัว createProduct มาเก็บไว้ใช้แบบตรง ๆ

Syntax	               เรียกว่า	              ใช้ทำอะไร
{ key } = obj	    Object Destructuring	    ดึงค่าออกจาก object
[a, b] = arr	    Array Destructuring	      ดึงค่าตามลำดับจาก Array

----------------------------------------------------

### สรุปเนื้อหาและขั้นตอนการใช้งาน Zustand เพื่อจัดการสถานะแบบ Global

#### ขั้นตอนที่ 1: ติดตั้ง Zustand
- เริ่มต้นด้วยการติดตั้งแพ็กเกจ `zustand` โดยใช้คำสั่ง:
  ```
  npm install zustand
  ```
- นี่เป็นเครื่องมือที่ช่วยจัดการสถานะแบบ global ในแอปพลิเคชัน React

#### ขั้นตอนที่ 2: สร้างโฟลเดอร์และไฟล์สำหรับ Store
- สร้างโฟลเดอร์ชื่อ `store` ภายใต้โฟลเดอร์ `source`
- ภายในโฟลเดอร์ `store` สร้างไฟล์ชื่อ `product.js`
- ไฟล์นี้จะใช้เก็บสถานะ global และฟังก์ชันที่เกี่ยวข้อง

#### ขั้นตอนที่ 3: สร้าง Hook ด้วย Zustand
- ในไฟล์ `product.js`:
  - นำเข้า `create` จาก `zustand`:
    ```javascript
    import { create } from 'zustand';
    ```
  - สร้างและ export hook ชื่อ `useProductStore`:
    ```javascript
    export const useProductStore = create((set) => ({
      products: [],
      setProducts: (products) => set({ products })
    }));
    ```
  - อธิบาย:
    - `products` เป็น array ว่างเริ่มต้นสำหรับเก็บข้อมูลสินค้า
    - `setProducts` เป็นฟังก์ชันที่ใช้ตั้งค่าสถานะ `products` ใหม่
    - นี่คือสถานะ global ที่สามารถใช้ได้ทุกที่ในแอปพลิเคชัน

#### ขั้นตอนที่ 4: เพิ่มฟังก์ชันสร้าง Product
- ใน `product.js` เพิ่มฟังก์ชัน `createProduct` แบบ async:
  ```javascript
  export const useProductStore = create((set) => ({
    products: [],
    createProduct: async (newProduct) => {
      if (!newProduct.name || !newProduct.image || !newProduct.price) {
        return { success: false, message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง.' };
      }
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      set((state) => ({
        products: [...state.products, data.data],
      }));
      return { success: true, message: 'สร้าง product สำเร็จ' };
    },
  }));
  ```
- อธิบาย:
  - ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่ (`name`, `image`, `price`)
  - ถ้าขาด return `success: false` พร้อมข้อความแจ้งเตือน
  - ถ้าครบ ส่ง request ไปที่ `/api/products` เพื่อสร้าง product
  - อัปเดตสถานะ `products` โดยเพิ่ม product ใหม่
  - return `success: true` เมื่อสำเร็จ

#### ขั้นตอนที่ 5: ตั้งค่า Proxy ใน Config
- เพื่อหลีกเลี่ยงการพิมพ์ URL เต็มทุกครั้ง:
  - ในไฟล์ `config.js`:
    ```javascript
    module.exports = {
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
          },
        },
      },
    };
    ```
- ทำให้สามารถใช้ `/api/products` แทน `http://localhost:5000/api/products`

#### ขั้นตอนที่ 6: เรียกใช้งานในหน้า Create
- ในหน้า `Create` เรียกใช้ `createProduct` เมื่อกดปุ่ม:
  ```javascript
  import { useProductStore } from '../store/product';
  const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  }

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Erorr",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

- อธิบาย:
  - ดึง `createProduct` จาก `useProductStore`
  - เรียกฟังก์ชันเมื่อคลิกปุ่ม และรีเซ็ตฟอร์มเมื่อสำเร็จ

#### ขั้นตอนที่ 7: เพิ่มการแจ้งเตือนด้วย Toast
- ใช้ `toast` จาก Chakra UI เพื่อแจ้งผลลัพธ์:
  ```javascript
  import { useToast } from '@chakra-ui/react';
  import { useProductStore } from '../store/product';

  const CreatePage = () => {
    const toast = useToast();
    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
      const { success, message } = await createProduct(newProduct);
      if (success) {
        toast({
          title: 'สำเร็จ',
          description: message,
          status: 'success',
          isClosable: true,
        });
      } else {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: message,
          status: 'error',
          isClosable: true,
        });
      }
    };
  };
  ```
- อธิบาย:
  - แสดง `toast` แจ้งเตือนเมื่อสำเร็จหรือล้มเหลว


### สรุปสั้นๆ
- **Zustand** ช่วยจัดการสถานะ global ได้ง่ายๆ โดยไม่ต้องใช้ Redux
- สร้าง store ด้วย `create` และกำหนดสถานะ/ฟังก์ชัน
- ใช้ hook `useProductStore` เพื่อเข้าถึงสถานะหรือฟังก์ชันในทุก component
- เพิ่มฟังก์ชันเช่น `createProduct` เพื่อโต้ตอบกับ backend
- ใช้ `proxy` เพื่อลดความซับซ้อนของ URL
- เพิ่ม UI เช่น `toast` เพื่อแจ้งเตือนผู้ใช้

----------- Homepage ---------------------------------

---------- NEW WORD KNOW HOW ---------------------------








---------------------------------------------------------

#### ภาพรวม
เนื้อหานี้เป็นการพัฒนาหน้าแสดงผลิตภัณฑ์ (Homepage) ในแอปพลิเคชัน โดยใช้ React, Chakra UI, และ React Router Dom เพื่อสร้าง UI ที่สามารถดู แก้ไข ลบ และอัปเดตผลิตภัณฑ์ได้อย่างสะดวกและตอบสนองต่อขนาดหน้าจอ (Responsive) มีฟังก์ชันการดึงข้อมูลจาก
 API และการจัดการสถานะด้วย Zustand (useProductStore) รวมถึงการแสดงผลแบบเรียลไทม์โดยไม่ต้องรีเฟรชหน้า

---

### ขั้นตอนการพัฒนา

#### 1. การตั้งค่าโครงสร้างพื้นฐานของหน้าหลัก (Homepage)
- **เป้าหมาย**: สร้างโครงสร้างพื้นฐานสำหรับหน้าแสดงผลิตภัณฑ์
- **การดำเนินการ**:
  - ใช้ `<Container>` จาก Chakra UI เพื่อกำหนดขอบเขตเนื้อหา (มี `maxWidth` และ `padding`)
  - เพิ่ม `<VStack>` (Vertical Stack) เพื่อจัดเรียงเนื้อหาในแนวตั้ง ระยะห่าง (`spacing`) = 8
  - ใส่ข้อความหัวเรื่อง ("ผลิตภัณฑ์ปัจจุบัน") แบบไล่ระดับสี (gradient text)
- **ผลลัพธ์**: ได้โครงสร้างพื้นฐานที่มีหัวเรื่องและคอนเทนเนอร์สำหรับแสดงผล

#### 2. การจัดการกรณีไม่มีผลิตภัณฑ์
- **เป้าหมาย**: แสดงข้อความเมื่อไม่มีผลิตภัณฑ์ในระบบ
- **การดำเนินการ**:
  - เพิ่มข้อความ "ไม่มีผลิตภัณฑ์" (ขนาด `x-large`, จัดกึ่งกลาง, มีอิโมจิ)
  - ใส่ลิงก์ `<Link>` ไปยังหน้าสร้างผลิตภัณฑ์ (`/create`) โดยใช้ React Router Dom (แก้จาก Chakra UI ที่ไม่ทำงาน)
  - ใช้เงื่อนไข `if (products.length === 0)` เพื่อแสดงข้อความนี้เฉพาะเมื่อไม่มีผลิตภัณฑ์
- **ผลลัพธ์**: เมื่อไม่มีผลิตภัณฑ์ ผู้ใช้จะเห็นข้อความและลิงก์ไปหน้าสร้าง

#### 3. การดึงข้อมูลผลิตภัณฑ์จาก API
- **เป้าหมาย**: ดึงรายการผลิตภัณฑ์จาก backend เพื่อแสดงผล
- **การดำเนินการ**:
  - สร้างฟังก์ชัน `fetchProducts` (async) ใน `useProductStore` เพื่อเรียก API (`/api/products`)
  - ใช้ `useEffect` ในหน้าหลักเพื่อเรียก `fetchProducts` เมื่อโหลดหน้า
  - อัปเดต state ด้วยข้อมูลที่ได้ (`setProducts(data.data)`)
  - ทดสอบโดย `console.log(products)` เพื่อดูข้อมูล (เช่น รองเท้า, หูฟัง, iPhone XR)
- **ผลลัพธ์**: ได้รายการผลิตภัณฑ์จากฐานข้อมูลแสดงในคอนโซล

#### 4. การแสดงผลิตภัณฑ์ในรูปแบบการ์ด
- **เป้าหมาย**: แสดงผลิตภัณฑ์ใน UI เป็นการ์ดแบบ responsive
- **การดำเนินการ**:
  - ใช้ `<SimpleGrid>` จาก Chakra UI เพื่อจัดเรียงการ์ด (คอลัมน์: 1 บนหน้าจอเล็ก, 2 บนกลาง, 3 บนใหญ่, ระยะห่าง = 10)
  - Map ผ่าน `products` และเรนเดอร์ `<ProductCard>` สำหรับแต่ละผลิตภัณฑ์ (ส่ง `key` และ `product` เป็น props)
  - สร้างคอมโพเนนต์ `ProductCard.jsx`:
    - ใช้ `<Box>` เป็นคอนเทนเนอร์ (มีเงา, มุมโค้ง, hover effect เลื่อนขึ้น)
    - เพิ่ม `<Image>` สำหรับรูปภาพ (`src={product.image}`, `alt={product.name}`)
    - ใช้ `<Box>` อีกอันสำหรับชื่อ (`<Heading>`), ราคา (`<Text>`), และปุ่มแก้ไข/ลบ (`<HStack>` + `<IconButton>`)
    - กำหนดสีและพื้นหลังให้รองรับ light/dark mode ด้วย `useColorModeValue`
- **ผลลัพธ์**: ผลิตภัณฑ์แสดงเป็นการ์ดสวยงาม ปรับตามขนาดหน้าจอ

#### 5. การลบผลิตภัณฑ์
- **เป้าหมาย**: เพิ่มฟังก์ชันลบผลิตภัณฑ์และอัปเดต UI ทันที
- **การดำเนินการ**:
  - สร้างฟังก์ชัน `deleteProduct` (async) ใน `useProductStore`:
    - เรียก API (`/api/products/${productId}`, method: DELETE)
    - อัปเดต state โดยกรองผลิตภัณฑ์ที่ถูกลบออก (`setProducts(products.filter(...))`)
    - คืนค่า `{ success: true, message: "ลบสำเร็จ" }`
  - ใน `ProductCard` เพิ่ม `onClick` ที่ปุ่มลบเพื่อเรียก `handleDeleteProduct`:
    - เรียก `deleteProduct(product._id)` และแสดง `toast` (ข้อความสำเร็จ/ผิดพลาด)
- **ผลลัพธ์**: คลิกปุ่มลบแล้วผลิตภัณฑ์หายไปจาก UI ทันที พร้อมแจ้งเตือน

#### 6. การอัปเดตผลิตภัณฑ์ด้วย Modal
- **เป้าหมาย**: เพิ่มฟังก์ชันแก้ไขผลิตภัณฑ์ผ่าน modal
- **การดำเนินการ**:
  - ใน `ProductCard`:
    - ใช้ `useDisclosure` เพื่อควบคุมการเปิด/ปิด modal (`isOpen`, `onOpen`, `onClose`)
    - เพิ่ม `<Modal>` (จาก Chakra UI) พร้อม `<ModalOverlay>`, `<ModalContent>`, `<ModalHeader>`, `<ModalCloseButton>`, `<ModalBody>`, `<ModalFooter>`
    - ใน `<ModalBody>` ใส่ `<VStack>` กับ `<Input>` สำหรับชื่อ, ราคา, รูปภาพ (ค่าเริ่มต้นจาก `product`)
    - ใช้ `useState` เพื่อเก็บข้อมูลที่อัปเดต (`updatedProduct`)
    - ปุ่มแก้ไขเรียก `onOpen` เพื่อเปิด modal
  - สร้างฟังก์ชัน `updateProduct` (async) ใน `useProductStore`:
    - เรียก API (`/api/products/${productId}`, method: PUT, body: JSON.stringify(updatedProduct)`)
    - อัปเดต state โดย map ผ่านผลิตภัณฑ์และแทนที่อันที่แก้ไข
    - คืนค่า `{ success: true, message: "อัปเดตสำเร็จ" }`
  - ใน `ProductCard` เพิ่ม `handleUpdateProduct`:
    - เรียก `updateProduct(productId, updatedProduct)` ปิด modal และแสดง `toast`
- **ผลลัพธ์**: คลิกแก้ไข เปิด modal กรอกข้อมูลใหม่ อัปเดตสำเร็จ UI อัปเดตทันที

#### 7. การทดสอบและปรับปรุง
- **เป้าหมาย**: ตรวจสอบการทำงานและเพิ่มความสะดวก
- **การดำเนินการ**:
  - ทดสอบการเปลี่ยนโหมด (light/dark) และการตอบสนองของ UI
  - ตรวจสอบว่าการลบและอัปเดตอัปเดต UI โดยไม่ต้องรีเฟรช (ถ้าลบส่วนอัปเดต state จะต้องรีเฟรช)
  - เพิ่มข้อความแจ้งเตือนจาก backend (เช่น "อัปเดตสำเร็จ") ใน API controller
- **ผลลัพธ์**: UI ทำงานสมบูรณ์ ลบ/อัปเดตเรียลไทม์ มีแจ้งเตือนชัดเจน

#### 8. ขั้นตอนต่อไป
- **เป้าหมาย**: เตรียม deploy แอปพลิเคชัน
- **การดำเนินการ**: วางแผนการนำโค้ดขึ้นสู่ production (ไม่ได้ลงรายละเอียดใน transcript)

---

### สรุปผลลัพธ์
- **หน้าหลัก**: แสดงผลิตภัณฑ์เป็นการ์ด หากไม่มีจะมีลิงก์ไปหน้าสร้าง
- **ฟังก์ชัน**: ดึงข้อมูล, ลบ, อัปเดตผลิตภัณฑ์ได้ทันทีผ่าน UI
- **UI**: Responsive, รองรับ light/dark mode, มีการแจ้งเตือน
- **เทคโนโลยี**: React, Chakra UI, React Router Dom, Zustand, Fetch API

---

หวังว่าการสรุปนี้จะช่วยให้เข้าใจขั้นตอนและเป้าหมายของการพัฒนาได้ชัดเจนยิ่งขึ้น!