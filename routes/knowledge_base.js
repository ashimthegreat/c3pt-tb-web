const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET all knowledge base articles
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('knowledge_base').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// GET article by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('knowledge_base').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST new article
router.post('/', async (req, res) => {
  const { title, description, video_url, category } = req.body;
  const { data, error } = await supabase
    .from('knowledge_base')
    .insert([{ title, description, video_url, category }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
