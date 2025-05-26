import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_BUCKET;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadCSV(buffer, filename) {
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .upload(filename, buffer, { upsert: true, contentType: 'text/csv' });
  if (error) throw error;
  return data.path;
}

export async function listCSVs() {
  const { data, error } = await supabase.storage.from(bucket).list('', { sortBy: { column: 'name', order: 'desc' } });
  if (error) throw error;
  return data.filter(f => f.name.endsWith('.csv')).sort((a, b) => b.name.localeCompare(a.name));
}

export async function downloadCSV(filename) {
  const { data, error } = await supabase.storage.from(bucket).download(filename);
  if (error) throw error;
  return await data.arrayBuffer();
}
