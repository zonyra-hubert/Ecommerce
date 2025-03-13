import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Check if the data is valid, otherwise clear it
    if (
      !storedUserInfo ||
      !storedUserInfo.data ||
      !storedUserInfo.data.username
    ) {
      localStorage.removeItem("userInfo");
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      if (res && res.data) {
        dispatch(setCredentials(res.data));

        toast.success("Login successful!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      // Handle the error
      console.error("Login failed:", error);

      // Clear local storage if invalid data was stored
      localStorage.removeItem("userInfo");

      toast.error(
        error?.response?.data?.message || error.message || "An error occurred"
      );
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={submitHandler} className="container w-[30rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium ">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                autoComplete="on"
                className="mt-2 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium ">
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="on"
                className="mt-2 p-2 border rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded  cursor-pointer my-[1rem] "
            >
              {" "}
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p>
              New Customer?{" "}
              <Link
                to={`/register?redirect=${redirect}`}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 ">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
            alt="Login Visual"
            className="w-full h-[37rem] object-cover  border rounded "
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
