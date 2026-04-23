import supabase from './supabase';

// SEPARATE FUNCTION: Auth Sign-Up
async function signUpAuth({ email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}



// SEPARATE FUNCTION: inserting the user profile
async function createUserProfile({ userId, email, username, phone }) {
  const { error } = await supabase
    .from("profiles")
    .insert({
      auth_user_id: userId,
      email,
      username,
      phone,
    });
  if (error) throw error;
}



// FUNCTION: SignUp and Create Profile
// 1st Phase: Creates Authenticated Profile
// 2nd Phase: Creates User Profile
async function signUpAndCreateProfile({ email, password, username, phone }) {
  
  // Step 1: Sign-Up
  const authData = await signUpAuth({ email, password });
  const userId = authData.user?.id;
  if (!userId) throw new Error("User ID not found after signup.");

  // Step 2: Create profile
  await createUserProfile({ userId, email, username, phone });

   // Step 3: RefreshSession to apply Role Updates
  await supabase.auth.refreshSession() 
  return authData;
}



// FUNCTION: Fill Up Profile
async function fillUpProfile({ userId, email, username, phone }) {
    const { error } = await supabase
        .from("profiles")
        .insert({
            auth_user_id: userId,
            email,
            username,
            phone,
        });
    if (error) throw error;

    // Clear the unregistered claim
    await supabase.rpc('clear_role_key_rpc', { auth_user_uuid: userId })

    // Refresh session so new JWT reflects cleared role
    await supabase.auth.refreshSession()
}



// FUNCTION: Simple Sign-in
async function signInWithEmail({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    
    return data
}



// FUNCTION: Handle Google Sign in 
const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/` /* vercel: 'https://merchant-cyan.vercel.app, vercel-dev: `${window.location.origin}/` */
    }
  })
  if (error) console.error('Google sign in error:', error)
}



// FUNCTION: handleSignOut 
const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Sign out error:', error)
}



// FUNCTION: fetchProfile
async function fetchProfile(userId) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from("profiles")
    .select("*")  // get full profile, not just id
    .eq("auth_user_id", user.id)
    .maybeSingle()  // ← returns null instead of error if no rows
  
  if (error) throw error;

  if(data === null) { await supabase.auth.refreshSession() }

  return data;
}



// FUNCTION: fetchUsers
async function fetchUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select('*');

  if (error) throw error;
  return data;
};



// FUNCTION: deleteUser
async function deleteUser(userId) {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (error) throw error;
};



// FUNCTION: clear role key
async function clear_role_key(userId) {
    const { error } = await supabase.rpc('clear_role_key_rpc', { auth_user_uuid: userId })
    if (error) throw error

    await supabase.auth.refreshSession() // ← JWT now reflects cleared role
}


export { 
  fetchProfile, 
  fetchUsers, 
  deleteUser, 
  signUpAndCreateProfile, 
  handleGoogleSignIn, 
  handleSignOut, 
  fillUpProfile,
  signInWithEmail,
  clear_role_key,
};