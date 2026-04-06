import { useUsers, useActions } from "@/store/userStore"
import { useEffect } from "react"
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import supabase from "@/utils/supabase"


const FetchUsers = () => {

  const actions = useActions();
  const users = useUsers();


  // Fetch User Function ( not invoked )
   const fetchUsers = async () => {
    const { data, error } = await supabase
    .from("users")
    .select('*')
    // .select('*, friends(*)')

   if( data ){ actions.setUsers( data ) }
   if( error ){ console.log(error) }

   return data;
   }



   export function UsersList() {
    const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>





  return (
  <>
    {users?.map((user) => (
      <div key={user.id}>

        {/* container with fixed size */}
      {user.user_image_url && (
        <div className="w-[400px] h-[300px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
          <img 
            src={user.user_image_url} 
            alt="Product" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}


        <p> - - - - - </p>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Email: {user.country}</p>


{/*     
        <p>Friends:</p>
        <ul>
          {user.friends && user.friends.length > 0 ? (
            user.friends.map((friend) => (
              <li key={friend.id}>
                {friend.name}
              </li>
            ))
          ) : (
            <li>No friends yet</li>
          )}
        </ul>
*/}

        <p> - - - - - </p>
      </div>
    ))}

  </>
  );

}

export default UsersList