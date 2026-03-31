const Input = ({ label, type, placeholder, name, }) => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{label}</legend>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
            />
        </fieldset>
    );
};

export default Input;