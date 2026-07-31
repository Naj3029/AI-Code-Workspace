import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";


function App() {

  const [page, setPage] = useState(
    localStorage.getItem("token")
      ? "dashboard"
      : "login"
  );


  function logout() {

    localStorage.removeItem("token");

    setPage("login");

  }



  return (

    <>

      {
        page === "login" && (

          <Login 
            setPage={setPage}
          />

        )
      }



      {
        page === "signup" && (

          <Signup
            setPage={setPage}
          />

        )
      }



      {
        page === "dashboard" && (

          <Dashboard
            setPage={setPage}
            logout={logout}
          />

        )
      }


    </>

  );

}


export default App;