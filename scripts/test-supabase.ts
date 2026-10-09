import { createClient } from "@supabase/supabase-js";

async function testSupabase() {
  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

  console.log("=== Supabase Connection Test ===");
  if (!url || !anonKey) {
    console.error("❌ SUPABASE_URL or SUPABASE_ANON_KEY is missing in .env");
    process.exit(1);
  }

  console.log(`📡 URL: ${url}`);
  console.log(`🔑 Anon Key: Present (${anonKey.length} chars)`);

  const client = createClient(url, anonKey);

  // 1. Test Auth service
  try {
    const { data: authData, error: authError } = await client.auth.getSession();
    if (authError) {
      console.error(`❌ Auth service test failed: ${authError.message}`);
    } else {
      console.log(`✅ Auth service reachable! Active session: ${authData.session ? "Yes" : "None (expected for anonymous client)"}`);
    }
  } catch (err) {
    console.error(`❌ Auth service network error:`, err);
  }

  // 2. Test Database / REST API
  try {
    const { data, error, status, statusText } = await client
      .from("quiz_stats")
      .select("user_id")
      .limit(1);

    if (error) {
      if (error.code === "42P01") {
        console.warn(`⚠️ Connected to database, but table 'quiz_stats' does not exist yet.`);
        console.warn(`   Run the SQL in supabase/schema.sql in your Supabase SQL editor to create it.`);
      } else if (error.code === "PGRST301" || error.code === "PGRST116") {
        console.log(`ℹ️ PostgREST responded: ${error.message}`);
      } else {
        console.log(`⚠️ Query response code: ${error.code} (${error.message})`);
      }
    } else {
      console.log(`✅ Database table 'quiz_stats' is accessible and reachable! (HTTP ${status})`);
    }
  } catch (err) {
    console.error(`❌ Database request failed:`, err);
  }

  console.log("================================");
}

testSupabase();
