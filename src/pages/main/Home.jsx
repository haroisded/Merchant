import { HomeHeader, HomePagination, FilterApps, AppCard, ProfileModal } from '@/components';
import { Links } from '@/components';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/CreateApplicationPage');
  };

  return (
    <div className="bg-brand-light min-h-screen text-brand-dark">
      <HomeHeader />
      <ProfileModal />
      <main className="max-w-7xl mx-auto px-12 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-brand-dark tracking-tight">Your Merchant Applications</h1>
          <p className="text-brand-dark/60 mt-2 font-medium">Create, Manage and View your Merchant Applications</p>
        </div>

        <FilterApps />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Start of App Creation Card */}
            <div 
              onClick={handleCreateClick}
              className="bg-white rounded-[40px] overflow-hidden border-2 border-dashed border-brand-secondary/40 hover:border-brand-secondary cursor-pointer transition-all group"
            >
              
              <div className="h-48 bg-brand-secondary/5 flex items-center justify-center">
                <div className="w-14 h-14 bg-brand-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                  <FaPlus />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-black text-brand-dark text-xl uppercase">Create New System</h3>
                <p className="text-brand-dark/40 text-sm mt-1 font-medium">Make your own point-of-sale system.</p>

                {/* ← matches the button row in AppCard */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-brand-secondary text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors">
                    <FaPlus size={14} /> <span>Create</span>
                  </button>
                </div>

              </div>
            </div>
          {/* End of App Creation Card */}



          {/* App Display Cards */}
          <AppCard />
          <AppCard />
          <AppCard />
          <AppCard />
          <AppCard />
          {/* End of App Creation Card */}
		  
        </div>
      </main>
      
      <HomePagination />
    </div>
  );
};

export default Home;