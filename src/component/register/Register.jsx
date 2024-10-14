import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../partials/Button";
import { registeruser } from "../../store/actions/userAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSeller, setIsSeller] = useState(false); // Added state for isSeller checkbox
  const navigate = useNavigate();
  const dispatch = useDispatch();

//   console.log(isSeller);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userInfo = { name, email, password,isSeller };
        const data = await dispatch(registeruser(userInfo));
        // console.log(data)
        if (data.response) {
          // Display error toast if registration fails
          toast.error(data.response.data.message);
        } else {
          // Display success toast and navigate to home on successful registration
          toast.success(data.message);
          if(isSeller){
            navigate('/account')
            return
          }
          navigate('/home');
        }
      } catch (error) {
        // Log error for debugging purposes
        console.error("Registration error:", error);
      }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute top-0 h-screen w-full px-5 md:px-0  bg-gradient-to-br from-[#f1f8ee] to-[#fff] backdrop-blur-lg flex items-center justify-center">
        <div className="randomBg blur-sm absolute opacity-30 top-0 left-0 w-full md:h-[100vh] h-[60vh] aspect-square object-cover">
          <i
            class="absolute ri-shopping-bag-fill text-5xl"
            style={{ top: `40%`, left: `90%` }}
          ></i>
          <i
            class="absolute ri-shopping-cart-2-fill text-3xl"
            style={{ top: `20%`, left: `70%` }}
          ></i>
          <i
            class="absolute ri-money-rupee-circle-fill text-6xl"
            style={{ top: `60%`, left: `20%` }}
          ></i>
          <i
            class="absolute ri-heart-3-fill text-5xl"
            style={{ top: `30%`, left: `10%` }}
          ></i>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center mt-2 md:py-14 p-8 md:w-[32vw]  md:px-10 border border-[#344e41] backdrop-blur-sm"
        >
          <div className="text-center w-full">
            <h1 className="text-5xl font-bold mb-5">Shoppy</h1>
            <h1 className="text-3xl font-bold mb-5">Register</h1>
          </div>
          <h1 className="font-medium text-zinc-700 ">Name</h1>
          <input
            type="text"
            value={name}
            maxLength={30}
            minLength={4}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-2 py-1 bg-transparent border-b border-[#344e41] outline-none w-full"
          />
          <h1 className="font-medium text-zinc-700 ">Email</h1>
          <input
            type="email"
            value={email}
            maxLength={45}
            minLength={4}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-2 py-1 bg-transparent border-b border-[#344e41] outline-none w-full"
          />
          <h1 className="font-medium text-zinc-700  mt-2">Password</h1>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              maxLength={20}
              minLength={4}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-4 py-1 bg-transparent border-b border-[#344e41] outline-none w-full"
            />
            <button
              type="button"
              className="absolute top-0 right-0 p-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="ri-eye-line"></i>
              ) : (
                <i className="ri-eye-close-line"></i>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 my-3">
            <div className="relative ">
              <div className="relative pl-8">
                <label
                  class="relative text-[#333333] flex cursor-pointer items-center justify-center gap-[1em]"
                  for="tick"
                >
                  <input
                    class="peer appearance-none"
                    id="tick"
                    name="tick"
                    type="checkbox"
                    onChange={(e) => setIsSeller(e.target.checked)}
                  />
                  <span class="absolute left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 rounded-[0.25em] border-[2px] border-[#333333]"></span>
                  <svg
                    viewBox="0 0 69 89"
                    class="absolute left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
                    fill="none"
                    height="89"
                    width="69"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1"
                      stroke-width="6px"
                      stroke="#333333"
                      pathLength="100"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
            <label htmlFor="isSeller" className="font-medium text-zinc-700 ">
              Are you a seller ?
            </label>
          </div>

          <div className="w-full mt-2 flex items-end justify-between">
            <Button text={"Register"} type={"fill"} />
            <div className="w-[15%]">
              <div className="flex items-center gap-2">
                <hr className="border-zinc-400 my-5 w-full" />
                OR
                <hr className="border-zinc-400 my-5 w-full" />
              </div>
            </div>
            <Button
            text={'Login with Google'}
              btnType={"button"}
              img={
                "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              }
            />
          </div>
          <p className="mx-auto mt-8 text-[1rem]">
            Already have an account?{" "}
            <Link to={"/"}>
              {" "}
              <span className="text-[#344e41] transition-all duration-300 border-b hover:border-b border-transparent hover:border-[#344e41] text-sm">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
