import { useUsers, useActions } from "@/store/userStore"
import { useEffect } from "react"
import { NavLink } from "react-router"
import supabase from "@/utils/supabase"


const FetchUsers = () => {

  const actions = useActions();
  const users = useUsers();


  useEffect(()=>{
   async function fetchUsers(){
    const { data, error } = await supabase
    .from("users")
    .select('*, friends(*)')

   if( data ){ actions.setUsers( data ) }
   if( error ){ console.log(error) }
   }

   fetchUsers()
 }, [])



    return (
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p> - - - - - </p>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>

            {/* Display friends */}
            <p>Friends:</p>
            <ul>
              {user.friends && user.friends.length > 0 ? (
                user.friends.map((friend) => (
                  <li key={friend.id}>
                    {friend.name} {/* assuming friends table has a name column */}
                  </li>
                ))
              ) : (
                <li>No friends yet</li>
              )}
            </ul>

            <p> - - - - - </p>
          </div>
        ))}
      </div>
    );

}

export default FetchUsers