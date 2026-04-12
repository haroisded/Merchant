import { signUpAndCreateUser, handleGoogleSignIn, handleSignOut } from '@/utils/userData_queries'
import { useActions, useSession } from '@/utils/dataStore'
import { useMutation } from '@tanstack/react-query' 
import { useNavigate } from "react-router"
import Input from "../Input"


const Register = () => {
    const { setUser } = useActions()
    const session = useSession()
    const navigate = useNavigate();



    const { mutate } = useMutation({
      mutationFn: signUpAndCreateUser,

      onSuccess: (data) => {
        setUser(data);
        const redirectPath = localStorage.getItem("redirectPath") || "/Home";
        localStorage.removeItem("redirectPath");
        navigate(redirectPath);
      },

      onError: (err) => {
        console.error("Signup error:", err.message);
      },
    });



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
    <h1 className="text-xl font-bold">Log In</h1>
    <form onSubmit={handleSubmit}>
        <Input name="username" placeholder="Enter Name" label="Username" type="text" />
        <Input name="email" placeholder="Enter your Email" label="Email" type="email"
          value={session?.user?.email || ''}  // ← pre-filled from OAuth
        />
        <Input name="phone" placeholder="Enter your Phone Number" label="Phone Number" type="text" />
        <Input name="password" placeholder="Enter your Password" label="Password" type="password" />
        <button className="btn btn-primary rounded-full mt-5">Submit</button>
    </form>

    <button onClick={handleGoogleSignIn} className="btn btn-outline rounded-full mt-3">
        Sign in with Google
    </button>

    {session && (
        <button onClick={handleSignOut} className="btn btn-error rounded-full mt-3">
            Sign Out
        </button>
    )}
    </div>
    );
};

export default Register;