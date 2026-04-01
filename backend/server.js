require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const leaveRoutes = require('./routes/leave');

const app = express();

// Dynamic port for Railway/Render
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────

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
