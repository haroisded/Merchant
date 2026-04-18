import { useQuery, useMutation } from '@tanstack/react-query' 
import { fetchUsers, deleteUser } from '@/utils/userData_queries'


export default function UsersList() {
  
  
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
          <p>Name: {user.username}</p>
          <p>Age: {user.phone}</p>
          <p>Email: {user.email}</p>
          
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