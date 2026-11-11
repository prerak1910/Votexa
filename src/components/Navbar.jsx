function Navbar({ title, buttonText }) {

    return (
        <nav>
            <h2>{title}</h2>
            <button>{buttonText}</button>
        </nav>
    );

}

export default Navbar;