import supabase from "@/utils/supabase"
import Input from "@/components/Input";
import { NavLink } from "react-router"
import Compressor from 'compressorjs';


const InsertUsers = () => {


  async function InsertFriends(passed_user_id){
   const { error } = await supabase
   .from("friends")
   .insert({user_id: passed_user_id})

   if(error){ console.log(error); }
  }



  async function HandleImage(Image_File){
      if (!Image_File && Image_File.size === 0){ return null; }

      
      // Wrap Compressor.js in a Promise
      const compressedFile = await new Promise((resolve, reject) => {
        new Compressor(Image_File, {
          mimeType: 'image/jpeg',     // Convert to JPEG/webp format
          quality: 0.9,
          retainExif: false,          // Remove EXIF metadata (default)
          maxWidth: 180,
          success(result) { resolve(result); }, // result is a Blob (or File) with the compressed image
          error(err) { reject(err); },
        });
      });


      const fileName = `${Date.now()}_image.jpg`;


      const { data: storageData, error: storageError } = await supabase
        .storage
        .from("images")        
        .upload(fileName, compressedFile, {
          contentType: 'image/jpeg',   // Ensure correct MIME type
          cacheControl: '300',   // 24 hours (60 sec × 60 min × 24 hr)
          upsert: true,
        });

      if (storageError) { console.log(storageError); return; }


      const { data: urlData } = await supabase
        .storage
        .from("images")
        .getPublicUrl(storageData.path);


      return urlData.publicUrl;
    }



   async function CreateUsers(event){
    event.preventDefault();

    // Form Handle
    const formData = new FormData(event.target)
    const formDataObject = Object.fromEntries(formData)


    // Image Handle 
    const imageFile = formData.get("image");
    delete formDataObject.image;
    
    const user_image_URL = await HandleImage(imageFile);


    // Number Parser
    formDataObject.age = parseInt(formDataObject.age) || 0;
    formDataObject.quantity = parseInt(formDataObject.quantity) || 0;

    
    const { data, error } = await supabase
     .from("users")
     .insert({ ...formDataObject, user_image_url: user_image_URL })
     .select('id, quantity')
     .single(); 


    if(error){ console.log(error) }
    if(data){ for(let index = 0; index < data.quantity; index++){ await InsertFriends(data.id) } }

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


   <Input
     label="Image"
     type="file"
     name="image"
     accept="image/*"
     defaultValue={null}
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