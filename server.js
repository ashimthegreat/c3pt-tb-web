require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Routes
app.use('/api/pages', require('./routes/pages'));
app.use('/api/products', require('./routes/products'));
app.use('/api/services', require('./routes/services'));
app.use('/api/events', require('./routes/events'));
app.use('/api/support', require('./routes/support'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/knowledge_base', require('./routes/knowledge_base'));

// Root endpoint
app.get('/', (req, res) => res.send('Backend running!'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
