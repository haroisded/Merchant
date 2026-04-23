import supabase from './supabase';

// FUNCTION: Set creator role 
async function set_creator_role(userId) {
    const { data, error } = await supabase.rpc('set_creator_role_rpc', { auth_user_uuid: userId })
    if (error) throw error

    await supabase.auth.refreshSession()

    return data
}

// FUNCTION: Fetch authenticated user's applications with related profiles
async function fetchUserApplications(userId) {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      id,
      app_name,
      app_type
    `)                              // ← removed trailing comma after last field
    .eq("app_creator_id", userId);

  if (error) throw error;

  return data;
}

export { 
  set_creator_role,
  fetchUserApplications,
}