import React from 'react'

import { clear_role_key } from '@/utils/userData_queries';
import { useSession } from '@/stores/authStore'
import { AppWrapper, BottomNav, FilterFeatures } from '@/components'


function ApplicationPage() {

 const this_session = useSession();


  return (
   <>
    <AppWrapper> 
      
      <FilterFeatures />

      <BottomNav/>
    
    <button onClick={() => clear_role_key(this_session?.user?.id)}> Clear Role Key </button>
    </AppWrapper>
   </>
  )
}

export default ApplicationPage