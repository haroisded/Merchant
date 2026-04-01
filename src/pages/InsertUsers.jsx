import supabase from "@/utils/supabase"
import Input from "@/components/Input";
import { NavLink } from "react-router"


const InsertUsers = () => {


  async function InsertFriends(passed_user_id){
   const { error } = await supabase
   .from("friends")
   .insert({user_id: passed_user_id})

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
    if(data){ 
      for(let index = 0; index < data.quantity; index++){ await InsertFriends(data.id) }
    }


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