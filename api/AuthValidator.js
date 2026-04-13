// pages/api/check-user.js  (or app/api/check-user/route.js)
import { createClient } from '@supabase/supabase-js';


// Initialize Supabase admin client with service_role key (keep this secret!)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // never expose this to the client
  { auth: { autoRefreshToken: false, persistSession: false } }
);


export default async function handler(req, res) {
  // Only allow POST or GET with a secure token (you should add authentication)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }


  const { email } = req.body;
  if (!email) { return res.status(400).json({ error: 'Email is required' }); }


  try {
    // Query auth.users directly (service_role bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('auth.users')
      .select('email, phone')
      .eq('email', email)
      .single();

    if (error) throw error;

    // Check if phone is missing or null
    const hasPhone = data.phone && data.phone.trim() !== '';

    if (!hasPhone) {
      // OPTIONAL: Store the email temporarily in a custom table (e.g., "failed_logins")
      await supabaseAdmin
        .from('temp_failed_auth')
        .insert({ email: data.email, reason: 'missing_phone', created_at: new Date() });

      // Return a flag that tells the client to sign out
      return res.status(200).json({
        valid: false,
        message: 'User missing phone number - session will be terminated',
      });
    }


    // All good – nothing happens
    return res.status(200).json({ valid: true });
   } catch (err) {
     console.error('Auth check failed:', err);
     return res.status(500).json({ error: 'Internal server error' });
   }
}