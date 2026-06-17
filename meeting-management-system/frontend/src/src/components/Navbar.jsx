import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">D-Grow</h1>

      <div className="relative group">
        <div className="cursor-pointer font-medium">Welcome, {user?.name}</div>

        {/* Dropdown */}
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-4 border-b">
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500 break-all">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
