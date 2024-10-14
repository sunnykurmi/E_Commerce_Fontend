import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../partials/Button";
import { useDispatch } from "react-redux";
import { loginuser } from "../../store/actions/userAction";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added state for showPassword

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = { email, password };

      const data = await dispatch(loginuser(userInfo));
      
      if (data.response) {
        // Display error toast if registration fails
        toast.error(data.response.data.message, );
      } else {
        // Display success toast and navigate to home on successful registration
        toast.success(data.message, );
        data.user.isSeller ? navigate('/account') : navigate('/home')
      }
      
    } catch (error) {
      // Log error for debugging purposes
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute top-0 h-screen w-full px-5 md:px-0 bg-gradient-to-br from-[#f1f8ee] to-[#fff] backdrop-blur-lg flex items-center justify-center">

      <div className="randomBg blur-sm absolute opacity-30 top-0 left-0 w-full md:h-[100vh] h-[60vh] aspect-square object-cover">
                    <i className="absolute ri-shopping-bag-fill text-5xl" style={{ top: `40%`, left: `90%` }}></i>
                    <i className="absolute ri-shopping-cart-2-fill text-3xl" style={{ top: `20%`, left: `70%` }}></i>
                    <i className="absolute ri-money-rupee-circle-fill text-6xl" style={{ top: `60%`, left: `20%` }}></i>
                    <i className="absolute ri-heart-3-fill text-5xl" style={{ top: `30%`, left: `10%` }}></i>
                </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center md:py-14 p-8 md:w-[32vw] md:px-10 border border-[#344e41] backdrop-blur-sm"
        >
          <div className="text-center w-full">
            <h1 className="text-5xl font-bold mb-5">Shoppy</h1>
            <h1 className="text-3xl font-bold mb-5">Log In</h1>
          </div>
          <h1 className="font-medium text-zinc-700 ">Email</h1>
          <input
            type="email"
            value={email}
            maxLength={45}
            minLength={4}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 py-1 bg-transparent border-b border-[#344e41] outline-none w-full"
          />
          <h1 className="font-medium text-zinc-700 mt-2">Password</h1>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              maxLength={20}
              minLength={4}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 py-1 bg-transparent border-b border-[#344e41] outline-none w-full"
            />
            <button
              type="button"
              className="absolute top-0 right-0 p-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-close-line"></i>}
            </button>
          </div>
          <div className="w-full flex items-end mt-2 justify-between">
            <Button text={"Login"} type={"fill"} />
            <div className="w-[15%]">
              <div className="flex items-center gap-2">
                <hr className="border-zinc-400 my-5 w-full" />
                OR
                <hr className="border-zinc-400 my-5 w-full" />
              </div>
            </div>
            <Button
              btnType={'button'}
              text={"Login with Google"}
              img={"https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"}
            />
          </div>
          <p className='mx-auto mt-8 text-[1rem]'>Don't have an account ? <Link to={"/register"}> <span className='text-[#344e41] transition-all duration-300 border-b hover:border-b border-transparent hover:border-[#344e41]  text-sm'>Create account</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
