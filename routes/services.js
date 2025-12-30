const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET all services
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('services').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// GET service by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('services').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST new service
router.post('/', async (req, res) => {
  const { title, description, features, use_cases, status } = req.body;
  const { data, error } = await supabase
    .from('services')
    .insert([{ title, description, features, use_cases, status }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
