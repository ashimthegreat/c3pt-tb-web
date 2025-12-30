const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET page by slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST new page (admin)
router.post('/', async (req, res) => {
  const { slug, title, content, video_url, seo_title, seo_description } = req.body;
  const { data, error } = await supabase
    .from('pages')
    .insert([{ slug, title, content, video_url, seo_title, seo_description }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;
