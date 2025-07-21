import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Sun } from "lucide-react";


const Navbar = () => {
  const navigate = useNavigate();

  return (


    <div className="flex pl-10 pt-10 pr-10 items-center justify-between px-4 py-3 bg-[#0a0a0a] shadow-md">
      <Link
        to="/"
        className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md font-semibold text-2xl flex items-center gap-2"
      >
        PRODUCT STORE <ShoppingCart className="w-4 h-4" />
      </Link>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/create")}
          className="p-2 border rounded hover:bg-gray-800 transition"
        >
          <Plus />
        </button>

        <button className="p-2 rounded  border hover:bg-gray-800 transition">
          <Sun  />
        </button>
        
      </div>
    </div>
  );
};

export default Navbar;
