import { useUsers, useActions } from "@/store/userStore"
import { useEffect } from "react"
import supabase from "@/utils/supabase"


const FetchUsers = () => {

  const actions = useActions();
  const users = useUsers();


  useEffect(()=>{
   async function fetchUsers(){
    const { data, error } = await supabase
    .from("users")
    .select()

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
         <p> - - - - - </p>
       </div>
     ))}
   </div>
  )

}

export default FetchUsers