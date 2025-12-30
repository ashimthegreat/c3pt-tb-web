const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET all contact messages (optional, admin)
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('contact_messages').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// GET a specific contact message by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST a new contact message
router.post('/', async (req, res) => {
  const { name, email, message, source_page } = req.body;

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, message, source_page }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
