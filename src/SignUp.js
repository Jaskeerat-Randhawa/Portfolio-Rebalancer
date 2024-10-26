
import React , {useState} from 'react';

import { useNavigate} from 'react-router-dom';
import TopBar from './Components/TopBar.js'    
const SignUp = () =>{ 

const [password, setPassword] = useState("");
const [name, setName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [email, setEmail] = useState("")


  const navigate = useNavigate();
const SubmitForm = ()=>{

  console.log(name)
  try{
  fetch('http://localhost:8080/signup',{
    method : 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',

    },
    
body: JSON.stringify({
   name: name,
   password: password,
   email: email,
   phoneNumber: phoneNumber,
})

    })

navigate('/login')

}catch{

}

}
const handleChangeEmail = (e) =>{

  setEmail(e.target.value)
}

const handlePhoneNumber = (e) =>{


  setPhoneNumber(e.target.value);
}
const handleChangeName = (e) =>{

  setName(e.target.value)
}
const handleChangePassword = (e) =>{
setPassword(e.target.value)
}

  return(


<div>
<TopBar/>


<div className="flex justify-around mt-10">
  <div className="w-1/2"> 
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Full Name  
        </label>
        <input
          value={name}
          onChange={(e) => handleChangeName(e)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Full Name"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => handleChangePassword(e)}
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />
        <p className="text-red-500 text-xs italic">Please choose a password.</p>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
email
        </label>
        <input
          value={email}
          onChange={(e) => handleChangeEmail(e)}
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="email"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
         Phone Number 
        </label>
        <input
          value={phoneNumber}
          onChange={(e) => handlePhoneNumber(e)}
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="phonenumber"
          type="phonenumber"
          placeholder="Phone Number"
        />
      </div>
 
      <div className="flex items-center justify-between">

        <button
          onClick={()=> SubmitForm()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign Up
        </button>
      </div>

    </form>
    <p className="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>

  <h1>hello</h1>
</div>



<h1>hello</h1>
</div>
)


}


export default SignUp;
