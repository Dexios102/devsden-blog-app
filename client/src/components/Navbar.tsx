import devlogo from "@/assets/dev.svg";

const Navbar = () => {
  const loggedIn = false;
  return (
    <nav className="flex justify-between items-center">
      <button className="flex items-center gap-2">
        <img src={devlogo} alt="dev_logo" className="w-10" />
        <h1 className="text-2xl font-bold gradient-text">DevsDen</h1>
      </button>
      <div className="flex gap-4 text-lg font-medium text-gray-700">
        <button>Home</button>
        <button>About</button>
        <button>Projects</button>
      </div>
      <div className="flex items-center">
        <h1>DarkMode</h1>
        {loggedIn ? (
          <img src="" alt="avatar" />
        ) : (
          <div>
            <button>Login</button>
            <button>Register</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
