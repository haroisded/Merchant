import CreationStep1 from '@/components/ModalSnippets/CreationStep1';
import CreationStep2 from '@/components/ModalSnippets/CreationStep2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApplication } from '@/utils/application_queries';
import { useAppActions } from '@/stores/applicationStore';
import { clear_role_key } from '@/utils/userData_queries';
import { usePageSwitch } from '@/stores/applicationStore';
import { useSession, useProfile } from '@/stores/authStore';
import { useUIActions } from '@/stores/uiStore'; // ← for clearing global loader
import { useState, useEffect } from 'react';

const CreateApplicationPage = () => {
  const this_profile = useProfile();
  const session = useSession();
  const { setIsAppMutating, setPageSwitch } = useAppActions();
  const { setGlobalLoading } = useUIActions();
  const pageSwitch = usePageSwitch();
  const queryClient = useQueryClient();

  useEffect(() => { setGlobalLoading(false); }, []); // ← card set it true; we're here now, clear it

  // ← Form state lives here
  const [formData, setFormData] = useState({
    app_name: '',
    app_description: '',
    app_type: null, // "purchasable" | "serviceable" | "both"
    app_password: '',
    app_secret: '',
    admin_name: '',
  });


  // ← Mutation chain
  const mutation = useMutation({
    mutationFn: async () => {
      return createApplication({
        app_name: formData.app_name,
        app_description: formData.app_description,
        app_type: formData.app_type,
        app_password: formData.app_password,
        app_secret: formData.app_secret,
        app_creator_id: this_profile?.id,
        application_imageURL: null, // ← handle uploads later
      });
    },

    onMutate: () => setIsAppMutating(true), 

    onSuccess: async () => {
      // ← Reset form state before role clear
      setFormData({
        app_name: '',
        app_description: '',
        app_type: null,
        app_password: '',
        app_secret: '',
        admin_name: '',
      });

      await clear_role_key(session?.user?.id);
      queryClient.invalidateQueries({ queryKey: ['user', session?.user?.id, 'applications'] });
    },

    onError: (err) => { console.error('App creation failed:', err); },
    
    onSettled: () => setIsAppMutating(false),
  });

  return (
    <div>
      {pageSwitch ? (
        <CreationStep1 
          formData={formData}
          setFormData={setFormData}
          onNext={() => setPageSwitch(false)} // ← toggles to Step2
          clear_role_key={clear_role_key}
          this_session={session}
        />
      ) : (
        <CreationStep2
          formData={formData}
          setFormData={setFormData}
          onBack={() => setPageSwitch(true)}
          onSubmit={() => mutation.mutate()} // ← fires mutation
          isSubmitting={mutation.isPending}
        />
      )}
    </div>
  );
};

export default CreateApplicationPage;