const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET all support tickets
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('support_tickets').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// GET ticket by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('support_tickets').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST new support ticket
router.post('/', async (req, res) => {
  const { name, email, subject, message, video_url, status, priority } = req.body;
  const ticket_number = 'TCKT-' + uuidv4().slice(0, 8); // generate short unique ticket number

  const { data, error } = await supabase
    .from('support_tickets')
    .insert([{ ticket_number, name, email, subject, message, video_url, status, priority }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
