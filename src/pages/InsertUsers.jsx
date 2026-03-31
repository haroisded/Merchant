import supabase from "@/utils/supabase"
import Input from "@/components/Input";
import { NavLink } from "react-router"


const InsertUsers = () => {


  async function InsertFriends(passed_user_id, passed_friend_quantity){
   const { error } = await supabase.rpc('user_friends', {
    new_user_id: passed_user_id,
    friend_quantity: passed_friend_quantity,
   });

   if(error){ console.log(error); }
  }



   async function CreateUsers(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const formDataObject = Object.fromEntries(formData)


    const { data, error } = await supabase
    .from("users")
    .insert(formDataObject)
    .select('id, quantity')
    .single(); 


    if(error){ console.log(error) }
    if(data){ await InsertFriends(data.id, data.quantity) }


    event.target.reset();  // clears all form fields
  }



 return ( 
  <div>
   <form onSubmit={CreateUsers}>

   <Input
     label="Name"
     placeholder="Enter Name"
     name="name"
     type="text"
   />


   <Input
     label="Age"
     placeholder="Enter Age"
     name="age"
     type="number"
   />


   <Input
     label="Email"
     placeholder="Enter Email"
     name="email"
     type="text"
   />


  <Input
     label="Quantity of Friends"
     placeholder="Enter Quantity of Friends"
     name="quantity"
     type="number"
   />

   <button type="submit">Submit</button>

   <NavLink to="/">
	  <button type="button">Back Home</button>
	 </NavLink>
   </form>
  </div >
 );
};



export default InsertUsers;