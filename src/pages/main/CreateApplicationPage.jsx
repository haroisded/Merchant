import CreationStep1 from '@/components/ModalSnippets/CreationStep1';
import CreationStep2 from '@/components/ModalSnippets/CreationStep2';
import { usePageSwitch } from '@/stores/applicationStore';



const CreateApplicationPage = () => {
  
  const this_PageSwitch = usePageSwitch();

  return (

  <form className="bg-brand-light min-h-screen" >
   {this_PageSwitch ? <CreationStep1 /> : <CreationStep2 />}
  </form>

  );
};

export default CreateApplicationPage;