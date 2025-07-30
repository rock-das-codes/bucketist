
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =import.meta.env.VITE_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseAnonKey) {

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
