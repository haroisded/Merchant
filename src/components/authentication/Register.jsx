import { signUpAndCreateProfile, handleGoogleSignIn, handleSignOut } from '@/utils/userData_queries'
import { useAuthActions, useSession } from '@/stores/authStore'
import { useMutation } from '@tanstack/react-query' 
import Input from "@/utils/Input"


const Register = () => {
    const { setProfile, setIsMutating } = useAuthActions()
    const this_session = useSession()


    // Mutate Function
    const { mutate } = useMutation({
      mutationFn: signUpAndCreateProfile,
      onMutate: () => setIsMutating(true),   // ← disable TanStack
      onSettled: () => setIsMutating(false), // ← re-enable after done
      onError: (err) => { console.error("Signup error:", err.message); },
    });



    // Mutate Caller
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      
      mutate({
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
        phone: formData.get("phone"), 
      });
    };



    return (
    <div>
      <h1 className="text-xl font-bold">Register</h1>
      <form onSubmit={handleSubmit}>
          <Input name="username" placeholder="Enter Name" label="Username" type="text" />
          <Input name="email" placeholder="Enter your Email" label="Email" type="email"/>
          <Input name="phone" placeholder="Enter your Phone Number" label="Phone Number" type="text" />
          <Input name="password" placeholder="Enter your Password" label="Password" type="password" />
          <button className="btn btn-primary rounded-full mt-5">Submit</button>
      </form>


      <button onClick={handleGoogleSignIn} className="btn btn-outline rounded-full mt-3">
          Sign in with Google
      </button>


      {this_session && (
          <button onClick={handleSignOut} className="btn btn-error rounded-full mt-3">
              Sign Out
          </button>
      )}
    </div>
    );
};

export default Register;