const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 3000;

// ✨ ความคิดเห็นในหน่วยความจำ
let comments = [];

app.use(express.static('public'));
app.use(express.json()); // รองรับ JSON ใน POST body

// ✅ API ดึงคอมเมนต์
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// ✅ API เพิ่มคอมเมนต์
app.post('/api/comments', (req, res) => {
  const { username, comment } = req.body;
  if (username && comment) {
    comments.push({ username, comment });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'ข้อมูลไม่ครบ' });
  }
});

// ✅ แชทเรียลไทม์
io.on('connection', socket => {
  console.log('🟢 ผู้ใช้เชื่อมต่อ');

  socket.on('message', msg => {
    io.emit('message', msg); // กระจายให้ทุกคน
  });

  socket.on('disconnect', () => {
    console.log('🔴 ผู้ใช้ตัดการเชื่อมต่อ');
  });
});

// ✅ เริ่มรันเซิร์ฟเวอร์
server.listen(PORT, () => {
  console.log(`🌐 Server started at http://localhost:${PORT}`);
});
