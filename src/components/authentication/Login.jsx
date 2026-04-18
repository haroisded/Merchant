import { handleGoogleSignIn, signInWithEmail } from '@/utils/userData_queries'
import { useAuthActions } from '@/stores/authStore'
import { useMutation } from '@tanstack/react-query'
import Input from "@/utils/Input"

function Login() {
    const { setIsMutating } = useAuthActions()

    // Email Login Mutation
    const { mutate, isPending, error } = useMutation({
        mutationFn: signInWithEmail,
        onMutate: () => setIsMutating(true),
        onSettled: () => setIsMutating(false),
        onError: (err) => console.error("Login error:", err.message)
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)

        mutate({
            email: formData.get("email"),
            password: formData.get("password"),
        })
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Login</h1>

            <form onSubmit={handleSubmit}>
                <Input name="email" placeholder="Enter your Email" label="Email" type="email" />
                <Input name="password" placeholder="Enter your Password" label="Password" type="password" />
                <button 
                    className="btn btn-primary rounded-full mt-5" 
                    disabled={isPending}
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>

            {error && <p className="text-red-500 mt-2">{error.message}</p>}

            <button 
                onClick={handleGoogleSignIn} 
                className="btn btn-outline rounded-full mt-3"
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default Login