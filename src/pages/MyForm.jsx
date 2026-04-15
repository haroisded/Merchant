const Input = ({ label, type, placeholder, name }) => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{label}</legend>
            <input name={name} type={type} placeholder={placeholder} />
        </fieldset>
    );
};

const MyForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Grab all the form fields by their `name` attributes
        const formData = new FormData(e.target);

        const UserData = {
            username: formData.get('username'),
            email:    formData.get('email'),
            phone:    formData.get('phone'),
            password: formData.get('password'),
        };

        // Send it to the serverless function
        const response = await fetch('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UserData),
        });

        const result = await response.json();

        console.log(result.user); // 👈 your data echoed back
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input name="username" placeholder="Enter Name"              label="Username"     type="text"     />
            <Input name="email"    placeholder="Enter your Email"        label="Email"        type="email"    />
            <Input name="phone"    placeholder="Enter your Phone Number" label="Phone Number" type="text"     />
            <Input name="password" placeholder="Enter your Password"     label="Password"     type="password" />
            <button className="btn btn-primary rounded-full mt-5">Submit</button>
        </form>
    );
};

export default MyForm;