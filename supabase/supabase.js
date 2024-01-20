const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = "https://hfzglkgfxrazcllmozpq.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmemdsa2dmeHJhemNsbG1venBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNjg5OTcsImV4cCI6MjAxODc0NDk5N30.uk85lioGtiZL60szhfyJOc1qTgq3L4WhClIPlXR1hRA";

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // In Node.js, you may not need to specify a storage option, or you can implement your own
    // autoRefreshToken, persistSession, and detectSessionInUrl can be set according to your needs
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

module.exports = supabase;