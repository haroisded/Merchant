import supabase from './supabase';

// SEPARATE FUNCTION: Auth step
async function signUpAuth({ email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  return data;
}



// SEPARATE FUNCTION: inserting the user profile
async function createUserProfile({ userId, email, username, phone }) {
  const { error } = await supabase
    .from("users")
    .insert({
      auth_user_id: userId,
      email,
      username,
      phone,
    });
  if (error) throw new Error(error.message);
}



// FUNCTION: SignUp and Create User
async function signUpAndCreateUser({ email, password, username, phone }) {
  
  // Step 1: Sign up
  const authData = await signUpAuth({ email, password });
  const userId = authData.user?.id;
  if (!userId) throw new Error("User ID not found after signup.");

  // Step 2: Create profile
  await createUserProfile({ userId, email, username, phone });

  // Return auth data for the onSuccess handler
  return authData;
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



// FUNCTION: fetchUsers
async function fetchUsers() {
  const { data, error } = await supabase
    .from("users")
    .select('*');

  if (error) throw new Error(error.message);
  return data;
};



// FUNCTION: deteUser
async function deleteUser(userId) {
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (error) throw new Error(error.message);
};


export { fetchUsers, deleteUser, signUpAndCreateUser, handleGoogleSignIn, handleSignOut };