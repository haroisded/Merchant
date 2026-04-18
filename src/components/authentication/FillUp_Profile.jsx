import { handleSignOut, fillUpProfile } from '@/utils/userData_queries'
import { useAuthActions, useSession } from '@/stores/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query' 
import Input from "@/utils/Input"


const Login = () => {
    const { setIsMutating } = useAuthActions()
    const this_session = useSession()
    const queryClient = useQueryClient()

    
    const { mutate } = useMutation({
        mutationFn: fillUpProfile,
        onMutate: () => setIsMutating(true),
        onSettled: () => {
            setIsMutating(false)
            queryClient.invalidateQueries({ queryKey: ['user', this_session?.user?.id] })
        },
        onError: (err) => { console.error("FillUp error:", err.message) },
    })


    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        
        mutate({
            userId: this_session?.user?.id,    // ← from session
            email: this_session?.user?.email,  // ← from session
            username: formData.get("username"),
            phone: formData.get("phone"),
        })
    }


    return (
    <div>
      <h1 className="text-xl font-bold">Fill-Up Profile Data</h1>
      <form onSubmit={handleSubmit}>
          <Input name="username" placeholder="Enter Name" label="Username" type="text" />
          <Input name="phone" placeholder="Enter your Phone Number" label="Phone Number" type="text" />
          <button className="btn btn-primary rounded-full mt-5">Fill-Up</button>
      </form>
    </div>
    );
};

export default Login;