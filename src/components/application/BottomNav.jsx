import { MdInventory2, MdGroup, MdPerson } from "react-icons/md";
import { RiEqualizerLine } from "react-icons/ri";
import { useUIActions } from '@/stores/uiStore';
import { ProfileModal } from '@/components';


const BottomNav = () => {
  const { openModal } = useUIActions();


  return (
    <>
      <ProfileModal />
      
      <nav className="bg-white border-t border-brand-accent py-3 px-6 mt-auto">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-gray-400">

          <button className="flex flex-col items-center gap-1 hover:text-gray-600 w-20">
            <MdInventory2 className="text-3xl" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Inventory</span>
          </button>


          <button className="flex flex-col items-center gap-1 hover:text-gray-600 w-20">
            <RiEqualizerLine className="text-3xl" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Filters</span>
          </button>

          <button className="flex flex-col items-center gap-1 hover:text-gray-600 w-20">
            <MdGroup className="text-3xl" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Users</span>
          </button>

          <button 
            className="flex flex-col items-center gap-1 hover:text-gray-600 w-20" 
            onClick={() => openModal('viewProfile')}
          >  
            <MdPerson className="text-3xl" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Profile</span>
          </button>

        </div>
      </nav>
    </>
  );
};

export default BottomNav;