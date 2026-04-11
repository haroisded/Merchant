import supabase from './supabase';


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


export {
  fetchUsers,
  deleteUser
};