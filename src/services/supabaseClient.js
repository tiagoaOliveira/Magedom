import { createClient } from '@supabase/supabase-js';

// Cria uma única instância do Supabase para ser compartilhada em todo o app
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;