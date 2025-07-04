
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://snemndiojxghptbghnrs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZW1uZGlvanhnaHB0YmdobnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMDM4ODUsImV4cCI6MjA2Mzc3OTg4NX0.iCL9N1U23ZjgbuzN_E00HuACSJBqKJzPxzdz_fQrN_0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: localStorage,
      flowType: 'pkce'
    }
  }
);
