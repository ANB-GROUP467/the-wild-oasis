import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cvdlszitjrshuyrokawq.supabase.co//";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZGxzeml0anJzaHV5cm9rYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMDI4NzMsImV4cCI6MjA4Mzc3ODg3M30.Uvp94WKIcClSUhny3VBCIIRsewpc_esGuwW7tsQSxcQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
