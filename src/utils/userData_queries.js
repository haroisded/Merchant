import supabase from './supabase';


// Separate function for the Auth step
async function signUpAuth({ email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  return data;
}



// Separate function for inserting the user profile
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



// Orchestrator function
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



const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`
    }
  })
  if (error) console.error('Google sign in error:', error)
}



const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Sign out error:', error)
}



async function fetchUsers() {
  const { data, error } = await supabase
    .from("users")
    .select('*');

  if (error) throw new Error(error.message);
  return data;
};



async function deleteUser(userId) {
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (error) throw new Error(error.message);
};


export { fetchUsers, deleteUser, signUpAndCreateUser, handleGoogleSignIn, handleSignOut };