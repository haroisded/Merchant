import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import Input from "../components/Input";
import { useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router";



const SignIn = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setFormData({ ...formData, [inputName]: inputValue });
    };

    const handleSubmit = async () => {
        try {
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
               email: formData.email,
               password: formData.password
            })

            if (signInError) throw signInError;
            console.log(signInData);
            navigate('/');

        } catch (error) {
            alert(error);
        }
    };

    const [session, setSession] = useState(null);


    return (
        <PageWrapper>
            <Header />
            <Main className="flex justify-center">
                <div className="flex items-center">
                    {!session ? (
                        <Card>
                            <h1 className="text-xl font-bold">Sign Up</h1>

                            <Input
                                label="Email"
                                name="email"
                                type="text"
                                placeholder="Enter your Email"
                                className="w-full"
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                className="w-full mb-5"
                                onChange={handleInputChange}
                            />

                            <button
                                className="btn btn-primary rounded-full"
                                onClick={handleSubmit}
                            >
                                Signup
                            </button>
                        </Card>
                    ) : (
                        <Card>You are already signed in</Card>
                    )}
                </div>
            </Main>
            <Footer />
        </PageWrapper>
    );
};

export default SignIn;
