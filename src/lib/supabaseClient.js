import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hcxiduhajqbgdcrounzu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeGlkdWhhanFiZ2Rjcm91bnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODk4MzAsImV4cCI6MjA2MzA2NTgzMH0.duQAVjGGuLKGIMUQn3h5Mz5ep4fbpTrCsNXuAtHZTr0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}; 