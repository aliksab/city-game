const Button = ({ toggleButton, children }) => {
    return (
        <button
            className="py-2 px-4 bg-violet-600 rounded text-white w-max-content mx-auto"
            onClick={toggleButton}
        >
            {children}
        </button>
    );
};

export default Button;
