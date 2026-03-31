import supabase from "@/utils/supabase"
import Input from "@/components/Input";


const InsertUsers = () => {

   async function CreateUsers(event){
    const formData = new FormData(event.target)
    const formDataObject = Object.fromEntries(formData)


    const { error } = await supabase
    .from("users")
    .insert(formDataObject)

    if(error){ console.log(error) }
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
     placeholder="Enter Name"
     name="age"
     type="number"
   />

   <Input
     label="Email"
     placeholder="Enter Name"
     name="email"
     type="text"
   />

   <button type="submit">Submit</button>
   </form>
  </div >

 );
};



export default InsertUsers;