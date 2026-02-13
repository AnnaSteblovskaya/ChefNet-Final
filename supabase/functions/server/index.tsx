import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase clients
// Service role client for admin operations
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Anon client for user token verification
const supabaseAnon = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

// Log environment variables (only on startup)
console.log('=== SERVER STARTUP ===');
console.log('SUPABASE_URL:', Deno.env.get('SUPABASE_URL'));
console.log('SUPABASE_ANON_KEY exists:', !!Deno.env.get('SUPABASE_ANON_KEY'));
console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-820140cb/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint
app.post("/make-server-820140cb/auth/signup", async (c) => {
  try {
    const { email, password, firstName, lastName } = await c.req.json();

    console.log('Signup attempt for email:', email);

    if (!email || !password || !firstName || !lastName) {
      console.error('Missing required fields');
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        firstName, 
        lastName 
      },
      email_confirm: true,
    });

    if (error) {
      console.error('Supabase signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    console.log('User created successfully:', data.user.id);

    // Store user profile in KV store
    const profile = {
      id: data.user.id,
      email: data.user.email,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`user:${data.user.id}`, profile);

    console.log('Profile stored in KV for user:', data.user.id);

    return c.json({ 
      user: profile
    });
  } catch (error) {
    console.error('Signup error (caught exception):', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-820140cb/user/profile", async (c) => {
  // Log to stderr to ensure it appears
  Deno.stderr.writeSync(new TextEncoder().encode('>>> PROFILE ENDPOINT HIT <<<\n'));
  console.error('>>> PROFILE ENDPOINT CALLED <<<');
  
  try {
    const authHeader = c.req.header('Authorization');
    console.error('=== PROFILE REQUEST START ===');
    console.error('Full Authorization header:', authHeader);
    
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      console.error('No access token provided');
      return c.json({ code: 401, message: 'Unauthorized: Missing token' }, 401);
    }

    console.error('Token received (first 30 chars):', accessToken.substring(0, 30) + '...');
    console.error('Attempting to verify token with ANON client...');;
    
    // Use the anon client and pass the access token
    const { data: { user }, error } = await supabaseAnon.auth.getUser(accessToken);

    console.error('Supabase getUser response - user:', user ? `User ID: ${user.id}` : 'null');
    console.error('Supabase getUser response - error:', error);

    if (error) {
      console.error('=== AUTH ERROR ===');
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error status:', error.status);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      return c.json({ code: 401, message: 'Invalid JWT', details: error.message }, 401);
    }

    if (!user) {
      console.error('No user returned from Supabase');
      return c.json({ code: 401, message: 'Invalid JWT: No user' }, 401);
    }

    console.error('=== USER AUTHENTICATED ===');
    console.error('User ID:', user.id);
    console.error('User email:', user.email);

    // Get user profile from KV store
    let profile = await kv.get(`user:${user.id}`);

    // If profile doesn't exist in KV, create it from user metadata
    if (!profile) {
      console.error('Profile not found in KV, creating from metadata for user:', user.id);
      
      const firstName = user.user_metadata?.firstName || 'User';
      const lastName = user.user_metadata?.lastName || '';
      
      profile = {
        id: user.id,
        email: user.email,
        firstName,
        lastName,
        createdAt: user.created_at || new Date().toISOString(),
      };
      
      // Save the profile to KV store
      await kv.set(`user:${user.id}`, profile);
      console.error('Profile created and saved to KV for user:', user.id);
    }

    console.error('=== RETURNING PROFILE ===');
    console.error('Profile:', profile);
    return c.json(profile);
  } catch (error) {
    console.error('=== EXCEPTION IN PROFILE ENDPOINT ===');
    console.error('Exception:', error);
    console.error('Exception message:', error?.message);
    console.error('Exception stack:', error?.stack);
    return c.json({ code: 500, message: 'Internal server error while fetching profile', details: error?.message }, 500);
  }
});

// Create user profile endpoint
app.post("/make-server-820140cb/user/profile/create", async (c) => {
  try {
    const { userId, email, firstName, lastName } = await c.req.json();
    
    console.log('Creating profile for user:', userId);

    if (!userId || !email || !firstName || !lastName) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const profile = {
      id: userId,
      email,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`user:${userId}`, profile);
    console.log('Profile created for user:', userId);

    return c.json({ success: true, profile });
  } catch (error) {
    console.error('Error creating profile:', error);
    return c.json({ error: 'Failed to create profile' }, 500);
  }
});

Deno.serve(app.fetch);