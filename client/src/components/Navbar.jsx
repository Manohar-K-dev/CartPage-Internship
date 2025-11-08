import { useContext } from "react";
import { Link } from "react-router-dom";
// Context
import MainContext from "../context/MainContext";
// Icons
import { LuShoppingCart, LuUser, LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const { getCartItemsCount, user, logout } = useContext(MainContext);
  // const navigate = useNavigate();
  const cartQuantity = getCartItemsCount();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex gap-4 justify-end text-white text-sm md:text-xl w-full md:px-4">
      <Link
        to={"/cart"}
        title="Cart"
        className="relative group bg-gray-600 md:hover:bg-green-400 p-4 rounded-full cursor-pointer"
      >
        <LuShoppingCart />
        <span
          className={`h-4 w-4 md:h-5 md:w-5 text-[10px] md:text-xs flex items-center justify-center bg-red-400 md:group-hover:bg-gray-600 absolute top-0 right-2 rounded-full ${
            cartQuantity <= 0 && "hidden"
          }`}
        >
          {cartQuantity > 9 ? "9+" : cartQuantity}
        </span>
      </Link>
      {user ? (
        <>
          <Link
            to={"/profile"}
            title="Profile"
            className="bg-gray-600 md:hover:bg-green-400 p-4 rounded-full cursor-pointer"
          >
            <LuUser />
          </Link>
          <button
            onClick={handleLogout}
            title="Logout"
            className="bg-gray-600 md:hover:bg-green-400 p-4 rounded-full cursor-pointer"
          >
            <LuLogOut />
          </button>
        </>
      ) : (
        <Link
          to={"/registration"}
          title="Login"
          className="bg-gray-600 md:hover:bg-green-400 p-4 rounded-full cursor-pointer"
        >
          <LuUser />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
