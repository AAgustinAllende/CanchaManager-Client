import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";


export default function LoginForm() {

  const navigate = useNavigate()




  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="body-style">
      
      <div className="lg:col-span-2 w-full p-8 max-w-lg max-md:max-w-lg mx-auto">
        <form onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem('loginData', JSON.stringify({ email, password }))
          navigate("/home")
        }}
        >
          <div className="space-y-6">
            <div>
              <label className="text-slate-900 text-[15px] font-medium mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="text"
                  required className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3.5 rounded-md border border-gray-200 focus:border-blue-600 outline-none" placeholder="Enter email" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div>
              <label className="text-slate-900 text-[15px] font-medium mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  required className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3.5 rounded-md border border-gray-200 focus:border-blue-600 outline-none"  />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" Name="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-md" />
                <label for="remember-me" className="ml-3 block text-[15px] text-slate-900">
                  Remember me
                </label>
              </div>
              <div>
                <a href="jajvascript:void(0);" className="text-blue-600 font-medium text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button type="submit" className="w-full py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
              Sign in
            </button>
          </div>

          <div className="my-4 flex items-center gap-4">
            <hr className="w-full border-slate-300" />
            <p className="text-sm text-slate-900 text-center">or</p>
            <hr className="w-full border-slate-300" />
          </div>
          <Login />

        </form>
      </div>
    </div>

    
  );
}
