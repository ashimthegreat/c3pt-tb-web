const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Import routes
const pagesRoute = require('./routes/pages');
const supportRoute = require('./routes/support');
const productsRoute = require('./routes/products');
const servicesRoute = require('./routes/services');
const eventsRoute = require('./routes/events');
const contactRoute = require('./routes/contact');
const knowledgeBaseRoute = require('./routes/knowledge_base');

// Use routes
app.use('/api/pages', pagesRoute);
app.use('/api/support', supportRoute);
app.use('/api/products', productsRoute);
app.use('/api/services', servicesRoute);
app.use('/api/events', eventsRoute);
app.use('/api/contact', contactRoute);
app.use('/api/knowledge_base', knowledgeBaseRoute);

app.get('/', (req, res) => res.send('Backend running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

