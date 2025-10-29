const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://yykulehsdovqmshnzsvz.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5a3VsZWhzZG92cW1zaG56c3Z6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTAzNzc1OCwiZXhwIjoyMDc2NjEzNzU4fQ.PnYPz7Odh_TGq4mUzGGAQ32T3ZbUdI4z-JoQ7gd87F0'
const JWT_SECRET = process.env.JWT_SECRET || 'iFWsTjr6jq6oUrJbsLpCqkn/lkMxQs/Rfe5xEVrn7woI9QNqdRJZ4IFB7QWyzvyxQVN2/bQzS+jFHBMNDDh9Sw=='

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {} )

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: { user: '9a389a001@smtp-brevo.com', pass: 'xsmtpsib-d0df62ca3e09b88d75e39a1fc865c373efcca8b93c561c395c8971b3120f10ce-qszspvFaCkBo3R6C' }
})

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body
  if (email === process.env.ADMIN_EMAIL || email === 'jlpweds001@gmail.com') {
    if (password === process.env.ADMIN_PASS || password === 'prajapati5647') {
      const token = jwt.sign({ role: 'admin', email }, JWT_SECRET, { expiresIn: '7d' })
      return res.json({ ok: true, token })
    }
  }
  return res.status(401).json({ error: 'invalid admin credentials' })
})

app.post('/api/auth/register', async (req, res) => {
  const { email, password, business_name } = req.body
  if (!email || !password) return res.status(400).json({ error: 'missing fields' })
  const password_hash = await bcrypt.hash(password, 10)
  const slug = business_name ? business_name.toLowerCase().replace(/[^a-z0-9]+/g,'-') : email.split('@')[0]
  const { data, error } = await supabase.from('vendors').insert([{ email, password_hash, business_name, slug, status:'pending' }])
  if (error) return res.status(500).json({ error })
  return res.json({ ok: true, vendor: data[0] })
})

app.get('/api/vendors', async (req, res) => {
  const { data, error } = await supabase.from('vendors').select('*').eq('status','approved')
  if (error) return res.status(500).json({ error })
  res.json(data)
})

app.get('/api/vendor/:slug', async (req, res) => {
  const slug = req.params.slug
  const { data, error } = await supabase.from('vendors').select('*').eq('slug', slug).limit(1).single()
  if (error) return res.status(404).json({ error: 'not found' })
  res.json(data)
})

app.get('/api/admin/vendors', async (req, res) => {
  const { data, error } = await supabase.from('vendors').select('*').order('created_at', { ascending: false })
  if (error) return res.status(500).json({ error })
  res.json(data)
})

app.post('/api/admin/vendors/:id/approve', async (req, res) => {
  const id = req.params.id
  const { status } = req.body
  const { data, error } = await supabase.from('vendors').update({ status }).eq('id', id).select().single()
  if (error) return res.status(500).json({ error })
  res.json(data)
})

app.post('/api/admin/vendors/:id/verify', async (req, res) => {
  const id = req.params.id
  const { verified } = req.body
  const { data, error } = await supabase.from('vendors').update({ verified }).eq('id', id).select().single()
  if (error) return res.status(500).json({ error })
  res.json(data)
})

const PORT = process.env.BACKEND_PORT || 3000
app.listen(PORT, ()=> console.log('Server listening on', PORT))
