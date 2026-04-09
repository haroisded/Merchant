import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'  // ← add useQueryClient
import supabase from '@/utils/supabase'

// Fetch function (unchanged)
const fetchUsers = async () => {
  const { data, error } = await supabase.from("users").select('*')
  if (error) throw new Error(error.message)
  return data
}



// Delete function
const deleteUser = async (userId) => {
  const { error } = await supabase
  .from("users")
  .delete()
  .eq("id", userId)

  if (error) throw new Error(error.message)
}



export default function UsersList() {
  const queryClient = useQueryClient()  // ← for invalidating cache

  // Read users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })



  // Delete mutation
  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // After successful delete, refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => { alert(error.message)},
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>



  return (
    <>
      {users?.map((user) => (
        <div key={user.id}>
          {user.user_image_url && (
            <div className="w-[400px] h-[300px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              <img src={user.user_image_url} alt="Product" className="max-w-full max-h-full object-contain" />
            </div>
          )}
          <p> - - - - - </p>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Email: {user.country}</p>
          
          {/* Add delete button */}
          <button 
            onClick={() => mutate(user.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
          
          <p> - - - - - </p>
        </div>
      ))}
    </>
  )
}