import {SUPABASE_URL, SUPABASE_KEY} from './utils/config'

import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

