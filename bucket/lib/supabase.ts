
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// --- CONFIGURATION ---
// The Supabase URL and Key are now read from environment variables for security.
//
// You need to set up environment variables for your project. For local
// development, you can create a `.env` file in the project root with the
// following content:
//
// SUPABASE_URL=YOUR_SUPABASE_URL
// SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
//
// You can find these values in your Supabase project dashboard under:
// Project Settings > API
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;


// This check warns the developer if the environment variables are not set.
// If they are missing, we throw an error to prevent the app from running
// with an invalid configuration, as it would be unusable.
if (!supabaseUrl || !supabaseAnonKey) {
  // We log a detailed warning for the developer.
  console.warn(`
    --------------------------------------------------------------------
    CRITICAL: Supabase environment variables are not set!
    --------------------------------------------------------------------
    Your application cannot connect to the database.

    Please ensure you have set the SUPABASE_URL and
    SUPABASE_ANON_KEY environment variables.

    For local development, create a '.env' file in the project root.
    --------------------------------------------------------------------
  `);
  // We also throw an error to halt execution, because the app is unusable
  // without a database connection.
  throw new Error('Supabase URL and Anon Key are not set in environment variables.');
}


// By providing the Database type definition to the client, we get
// type-safety and auto-completion for our database queries.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);