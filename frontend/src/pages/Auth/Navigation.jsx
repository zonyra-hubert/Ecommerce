import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice.js";
const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // Call the logout API

      dispatch(logout()); // Clear Redux state
    } catch (error) {
      console.error("Logout failed:", error); // Log any error
    }
  };

  return (
    // <div
    //   style={{ zIndex: 999 }}
    //   className={`${
    //     showSidebar ? "hidden" : "flex"
    //   } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
    //   id="navigation-container"
    // >
    //   <div className="flex flex-col justify-center space-y-4">
    //     <Link
    //       to="/"
    //       className="flex items-center transition-transform transform hover:translate-x-2"
    //     >
    //       <AiOutlineHome className="mr-2-[3rem]" size={26} />
    //       <span className="hidden nav-item-name mt-[3rem] "></span>
    //     </Link>
    //   </div>
    // </div>
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] duration-500 fixed group`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-8">
        <Link
          to="/"
          className="flex items-center space-x-2 transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={26} />
          <span className="hidden group-hover:inline-block nav-item-name transition-opacity duration-300">
            Home
          </span>
          {"  "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center space-x-2 transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={26} />
          <span className="hidden group-hover:inline-block nav-item-name transition-opacity duration-300">
            Shop
          </span>{" "}
        </Link>

        <Link
          to="/cart"
          className="flex items-center space-x-2 transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart size={26} />
          <span className="hidden group-hover:inline-block nav-item-name transition-opacity duration-300">
            Cart
          </span>{" "}
        </Link>
        <Link
          to="/favorite"
          className="flex items-center space-x-2 transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={26} />
          <span className="hidden group-hover:inline-block nav-item-name transition-opacity duration-300">
            Favourite
          </span>{" "}
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-8000 focus:outline-none "
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <span className="text-white">Guest</span>
          )}

          {userInfo && (
            <svg
              xmlns="https://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? " transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0  mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className=" black px-4 py-2 hover:bg-gray-100 "
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist "
                    className=" black px-4 py-2 hover:bg-gray-100 "
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className=" black px-4 py-2 hover:bg-gray-100 "
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className=" black px-4 py-2 hover:bg-gray-100 "
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className=" black px-4 py-2 hover:bg-gray-100 "
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/profile"
                className=" black px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={logoutHandler}
                className=" black px-4 py-2 hover:bg-gray-100 "
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul className="space-y-8">
          <li>
            <Link
              to="/login"
              className="flex items-center space-x-2 transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin size={26} />
              <span className="hidden group-hover:inline-block nav-item-name transition-opacity duration-300">
                Login
              </span>{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center space-x-2 transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={26} />
              <span className="hidden group-hover:inline-block nav-item-name transition-opacity duration-300">
                Register
              </span>{" "}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
