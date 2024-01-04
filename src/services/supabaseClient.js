import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tcedlsgyblezrccibpfr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZWRsc2d5YmxlenJjY2licGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTY0MTUsImV4cCI6MjAxNjg5MjQxNX0.j79SRxZeVzINvkE4O8ExUY44--C2gv34YJXQSOBGtfY";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
