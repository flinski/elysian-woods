import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://dgoaiowrhgnuzsrovhxr.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnb2Fpb3dyaGdudXpzcm92aHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNjM1MzYsImV4cCI6MjA3MjYzOTUzNn0.ineK0EZ39GGd3xnYuzrPx7r9lHSwLO5taok4hkhwcmY'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
