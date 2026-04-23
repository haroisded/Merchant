import React from 'react'

import { clear_role_key } from '@/utils/userData_queries';
import { useSession } from '@/stores/authStore'


function ApplicationPage() {

 const this_session = useSession();


  return (
   <>
    <div>You're in ApplicationPage</div>

    <button onClick={() => clear_role_key(this_session?.user?.id)}> Clear Role Key </button>
   </>
  )
}

export default ApplicationPage