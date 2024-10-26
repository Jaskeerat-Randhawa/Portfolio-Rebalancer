import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="bg-green-1 h-16 w-full top-0 left-0 content-center flex flex-row border-b-4">
      <div className=" ml-10 mx-auto bg-green-2 w-12 border-solid">
       <Link className="text-beige border border-beige m-auto" to="/UserDashboard">Home</Link>
</div>
<div className="content-center w-full">
<div>
  <Link to="/login">  Login</Link>
</div>

<div>
  <Link className="" to ="/logout">
  Logout
  </Link>
  </div>
</div>

    </div>
  );
}
