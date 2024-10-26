import TopBar from "./TopBar";
import photo from "../pictures/2011745.png"
import { useState } from "react";

import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";


export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();


    const validateLogin = async (event) => {
        event.preventDefault();
        if (email == null) {
        }
        if (password === null) {
        }
      console.log(password, email)
        try {
            const validLogin = await fetch(`http://localhost:8080/login/${email}/${password}`)
            const data = await validLogin.json();
            if (data.valid === true) {
                setCookie("Token", data)
                setCookie("UserId", data.userID)
                navigate('/userdashboard')
            }
            if (data.valid != true) {
                setErrorMessage("password or email are incorect ")
            }
        }
        catch {

        }
    }

    return (
        <div className="bg-gray-200 min-h-screen">
            <TopBar />
            <div className="flex flex-row p-16 align-middle gap-x-16">
                <form onSubmit={validateLogin} className="m-auto w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="font-extrabold text-4xl"> Welcome Back</h1>
                    <label className="block mb-4 text-lg font-medium text-gray-900 dark:text-black">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-orange-50 border border-orange-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John@gmail.ca"

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="block mb-4 text-lg font-medium text-gray-900 dark:text-black">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-orange-50 border border-orange-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="*******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <h2 className="text-red-700">{errorMessage} </h2>
                    <button className=" m-4 py-4 px-8 w-1/2 mx-auto bg-slate-700 rounded-xl text-orange-500 text-xl font-extrabold  " > Enter</button>
                </form>
                <div className="w-1/2">
                    <img src={photo} alt="description" />
                </div>
            </div>
        </div>
    )

}


