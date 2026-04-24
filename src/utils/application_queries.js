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

  const app_id = data[0].id; // ← grab the new app's UUID

  const [{ error: error2 }, { error: error3 }] = await Promise.all([
    supabase.from("ft_dashboard").insert({ app_id: app_id, app_creator_id: app_creator_id }),  // ← replace with real table/column names
    supabase.from("ft_product_input").insert({ app_id: app_id, app_creator_id: app_creator_id }),
  ]);

  if (error2) throw error2;
  if (error3) throw error3;

  return data;
}

export { 
  set_creator_role,
  set_app_editor_role,
  fetchUserApplications,
  createApplication,
}