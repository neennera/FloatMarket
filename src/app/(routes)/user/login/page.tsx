"use client";
import React, { useState } from "react";

export default function Page() {
  const [loginError, setLoginError] = useState("");
  return (
    <section className="w-full h-full flex flex-col items-center justify-center space-y-3 p-10">
      <h1 className="text-2xl">Login to Your Account</h1>
      <form className="flex flex-col space-y-5">
        <fieldset className="flex space-x-3">
          <label>username :</label>
          <input
            className="text-black px-2"
            type="text"
            name="username"
            required
          />
        </fieldset>
        <fieldset className="flex space-x-3">
          <label>password :</label>
          <input
            className="text-black px-2"
            type="text"
            name="password"
            required
          />
        </fieldset>
        <div className="flex flex-row justify-between">
          <input
            className="bg-blue-700 font-bold w-[120px] h-[35px] rounded-lg hover:bg-blue-900 cursor-pointer"
            type="submit"
            value="login"
          />
          <input
            className="border-2 border-blue-700 font-bold w-[120px] h-[35px] rounded-lg hover:border-blue-900 cursor-pointer"
            type="submit"
            value="signin"
          />
        </div>
      </form>

      {loginError != "" && (
        <div
          className="w-[22vw] h-[40px] flex items-center text-black px-5 bg-red-400 mx-5 rounded-md"
          id="loginErrorMessage"
        >
          {loginError}
        </div>
      )}
    </section>
  );
}
