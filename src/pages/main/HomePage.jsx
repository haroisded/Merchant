import { HomeHeader, HomePagination, FilterApps, AppCard, ProfileModal } from '@/components';
import { useAuthActions, useSession, useProfile, useIsProfileMutating } from "@/stores/authStore";
import { useIsAppMutating, useApplications, useIsAppLoading, useAppActions } from "@/stores/applicationStore";
import { set_creator_role, fetchUserApplications } from "@/utils/application_queries"
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from 'react-icons/fa';
import { useEffect } from 'react';
import supabase from "@/utils/supabase"


const Home = () => {

  const { setAppLoading, setApplications } = useAppActions();
  const this_AppMutation = useIsAppMutating(); 
  const this_Applications = useApplications();
  const this_AppLoading = useIsAppLoading();

  const this_session = useSession();
  const this_profile = useProfile();

  console.log("applications", this_Applications);

  
  // Fetch Application Handler
  const { data: fetchApplicationData, error: fetchApplicationProfileError, 
          isLoading: fetchApplicationLoading, isFetching: fetchApplicationFetching } = useQuery({
    queryKey: ['user', this_session?.user?.id, 'applications'],
    queryFn: () => fetchUserApplications(this_profile?.id),  // ← profile PK, not auth UUID,

    enabled: !!this_session?.user?.id && !!this_profile && !this_AppMutation,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    retry: 0,
  })

  if(fetchApplicationLoading){ console.log("Is Loading( Application )...") }
  if(fetchApplicationFetching){ console.log("Is Fetching( Application )...") }



  // Application -> zustand
  useEffect(() => {

    if(fetchApplicationData === undefined && !fetchApplicationProfileError) return;

    if(Array.isArray(fetchApplicationData)) setApplications(fetchApplicationData) // ← handles both [] and [...], was missing empty array case
    else if(fetchApplicationData === null) setApplications(null)

    if(fetchApplicationProfileError) console.log("Error Fetching Fails")

    setAppLoading(false)  

  }, [fetchApplicationData, fetchApplicationProfileError])


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
              onClick={ () => set_creator_role(this_session?.user?.id) }
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

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-brand-secondary text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors">
                    <FaPlus size={14} /> <span>Create</span>
                  </button>
                </div>

              </div>
            </div>
          {/* End of App Creation Card */}


        {/* App Display Cards */}
        {Array.isArray(this_Applications) && this_Applications.map((app) => (
          <AppCard 
            key={app.id} 
            app={app}  // ← pass the entire app object
          />
        ))}
        {/* End of App Display Cards */}

		  
        </div>
      </main>
      
      <HomePagination />
    </div>
  );
};

export default Home;