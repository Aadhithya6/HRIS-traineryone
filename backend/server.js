require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const leaveRoutes = require('./routes/leave');

const app = express();

// Dynamic port for Railway/Render
const PORT = process.env.PORT || 5000;

// ✅ Allow ALL origins (for testing)
app.use(cors({
origin: true,
credentials: true,
}));

app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/auth', authRoutes);
app.use('/leave', leaveRoutes);

// Health check
app.get('/health', (_req, res) => {
res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// One-time seed route — hit this URL once to seed the DB, then remove it
app.get('/seed-db-once', async (_req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const pool   = require('./config/db');
    const fs     = require('fs');
    const path   = require('path');
    const client = await pool.connect();
    const schema = fs.readFileSync(path.join(__dirname, 'models/schema.sql'), 'utf8');
    await client.query(schema);
    const hash = (pw) => bcrypt.hashSync(pw, 10);
    const hr      = await client.query(`INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id`, ['Aisha Nair','hr@test.com',hash('123456'),'hr']);
    const manager = await client.query(`INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id`, ['Arjun Kumar','manager@test.com',hash('123456'),'manager']);
    const emp1    = await client.query(`INSERT INTO users (name,email,password,role,manager_id) VALUES ($1,$2,$3,$4,$5) RETURNING id`, ['Rahul Sharma','employee@test.com',hash('123456'),'employee',manager.rows[0].id]);
    const emp2    = await client.query(`INSERT INTO users (name,email,password,role,manager_id) VALUES ($1,$2,$3,$4,$5) RETURNING id`, ['Priya Mehta','priya@test.com',hash('123456'),'employee',manager.rows[0].id]);
    const emp3    = await client.query(`INSERT INTO users (name,email,password,role,manager_id) VALUES ($1,$2,$3,$4,$5) RETURNING id`, ['Neha Patel','neha@test.com',hash('123456'),'employee',manager.rows[0].id]);
    await client.query(`INSERT INTO leave_requests (employee_id,leave_type,start_date,end_date,reason,status) VALUES ($1,'sick','2026-04-01','2026-04-02','Fever','pending_manager')`, [emp1.rows[0].id]);
    await client.query(`INSERT INTO leave_requests (employee_id,leave_type,start_date,end_date,reason,status) VALUES ($1,'casual','2026-04-03','2026-04-03','Personal','pending_manager')`, [emp2.rows[0].id]);
    client.release();
    res.json({ success: true, message: 'DB seeded! employee@test.com / manager@test.com / hr@test.com — all password: 123456' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root route
app.get('/', (_req, res) => {
res.send('🚀 HRIS Backend is running');
});

// 404 handler
app.use((_req, res) => {
res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
console.error('🔥 Error:', err.message);
res.status(500).json({ error: err.message || 'Something went wrong' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

// IMPORTANT: required for Railway
app.listen(PORT, '0.0.0.0', () => {
console.log(`🚀 Server running on port ${PORT}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
