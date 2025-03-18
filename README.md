# MathQuizTSMongoDB
# Hướng dẫn cài đặt và khởi tạo dự án với Yarn

## 1. Cài đặt Yarn (nếu chưa có)
Nếu bạn chưa cài đặt Yarn, bạn có thể cài đặt nó bằng npm:
```sh
npm install -g yarn
```

## 2. Khởi tạo dự án với Yarn
Chạy lệnh sau để tạo một dự án mới:
```sh
yarn init -y
```
Lệnh này sẽ tạo một file `package.json` mặc định.

## 3. Cài đặt TypeScript và các công cụ hỗ trợ
Thêm TypeScript và các công cụ cần thiết vào dự án:
```sh
yarn add -D typescript ts-node @types/node express
```
Trong đó:
- `typescript`: Compiler cho TypeScript
- `ts-node`: Cho phép chạy TypeScript trực tiếp mà không cần biên dịch trước
- `@types/node`: Cung cấp kiểu dữ liệu cho Node.js
- `express`: Framework web cho Node.js

## 4. Khởi tạo file cấu hình TypeScript
Chạy lệnh sau để tạo file `tsconfig.json`:
```sh
yarn tsc --init
```
File `tsconfig.json` sẽ chứa các cấu hình cho TypeScript.

## 5. Chạy thử dự án với TypeScript
Bạn có thể tạo một file `index.ts` để kiểm tra:
```ts
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```

Chạy server bằng lệnh:
```sh
ts-node index.ts
```



