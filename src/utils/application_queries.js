import supabase from './supabase';

// FUNCTION: Set creator role 
async function set_creator_role(userId) {
    const { data, error } = await supabase.rpc('set_creator_role_rpc', { auth_user_uuid: userId })
    if (error) throw error

    await supabase.auth.refreshSession()

    return data
}


// FUNCTION: Set app editor role 
async function set_app_editor_role(userId) {
    const { data, error } = await supabase.rpc('set_app_editor_role_rpc', { auth_user_uuid: userId })
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
    `)
    .eq("app_creator_id", userId);

  if (error) throw error;

  return data;
}


// FUNCTION: Create a new application
async function createApplication({ 
  app_name, 
  app_description, 
  app_type, 
  app_password, 
  app_secret, 
  app_creator_id,       // ← uuid from useSession / useProfile
  application_imageURL 
}) {
  const { data, error } = await supabase
    .from("applications")
    .insert({ 
      app_name, 
      app_description, 
      app_type, 
      app_password, 
      app_secret, 
      app_creator_id, 
      application_imageURL 
    })
    .select()

  if (error) throw error;

  return data;
}

export { 
  set_creator_role,
  set_app_editor_role,
  fetchUserApplications,
  createApplication,
}