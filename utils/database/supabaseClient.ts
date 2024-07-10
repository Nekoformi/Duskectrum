import 'dotenv/load.ts';

import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.44.2';

function createSupabaseClient() {
    return createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_ANON_KEY') || '');
}

let supabaseClient: SupabaseClient | undefined;

export default function getSupabaseClient() {
    if (!supabaseClient) supabaseClient = createSupabaseClient();

    return supabaseClient;
}
