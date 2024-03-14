const config = require('./utils/config')

const { createClient } = require('@supabase/supabase-js')

const supabaseClient = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_KEY
)

module.exports = { supabaseClient }
