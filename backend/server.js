require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const leaveRoutes = require('./routes/leave');

const app = express();

// Use dynamic PORT (important for Railway/Render)
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────

// Allow both local dev + deployed frontend (Vercel)
const allowedOrigins = [
'http://localhost:5173',
'http://localhost:5174',
'http://localhost:5175',
'http://localhost:3000',
'http://127.0.0.1:5500',
'null',
process.env.FRONTEND_URL // your deployed frontend (Vercel)
];

app.use(cors({
origin: function (origin, callback) {
// allow requests with no origin (like mobile apps, curl, Postman)
if (!origin) return callback(null, true);

```
if (allowedOrigins.includes(origin)) {
  return callback(null, true);
} else {
  return callback(new Error('Not allowed by CORS'));
}
```

},
credentials: true,
}));

app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/auth', authRoutes);
app.use('/leave', leaveRoutes);

// Health check (for deployment testing)
app.get('/health', (_req, res) => {
res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
console.error(err.stack);
res.status(500).json({ error: err.message || 'Something went wrong' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

// IMPORTANT: bind to 0.0.0.0 for Railway/Render
app.listen(PORT, '0.0.0.0', () => {
console.log(`🚀 Server running on port ${PORT}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
