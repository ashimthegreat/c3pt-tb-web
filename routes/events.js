const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET all events
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// GET a single event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST a new event (for admin)
router.post('/', async (req, res) => {
  const { title, description, date, location, registration_deadline, is_active } = req.body;

  const { data, error } = await supabase
    .from('events')
    .insert([{ title, description, date, location, registration_deadline, is_active }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
