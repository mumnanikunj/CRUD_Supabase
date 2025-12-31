import { supabase } from '../lib/supabase';

export const safeGetUser = async () => {
  try {
    return await supabase.auth.getUser();
  } catch {
    return { data: { user: null }, error: null };
  }
};