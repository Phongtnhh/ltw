const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require("./database/db")
const Routeclient = require("./routes/client/index");
const RouteAdmin = require("./routes/admin/index.route");
const app = express();
const PORT = 3000;

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));

app.use(express.json());

// Serve static files từ thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Kết nối database
connectDB();

// Routes
Routeclient(app);
RouteAdmin(app);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
