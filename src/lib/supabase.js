
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bufkymcumlubiallxcxv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Zmt5bWN1bWx1YmlhbGx4Y3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NTI3OTksImV4cCI6MjA2MTUyODc5OX0.rbMJtfsHiiFcOqRA_q9DagpyRkayAQO8NKM9q1QEnWs"

export const supabase = createClient(supabaseUrl, supabaseKey);

