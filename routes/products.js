const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET all products
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// GET product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST new product
router.post('/', async (req, res) => {
  const { name, description, specifications, category, images, status } = req.body;
  const { data, error } = await supabase
    .from('products')
    .insert([{ name, description, specifications, category, images, status }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
