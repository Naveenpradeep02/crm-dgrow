import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">D-Grow </h1>

      <div>Welcome, {user?.name}</div>
    </div>
  );
};

export default Navbar;
