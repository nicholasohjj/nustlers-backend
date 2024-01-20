const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.URL; 
const supabaseAnonKey = process.env.anonKey;

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