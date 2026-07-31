import { useState } from "react";

function Login({ setPage }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  async function login() {

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );


      const data = await response.json();


      if(response.ok){

        localStorage.setItem(
          "token",
          data.token
        );

        alert("Login successful");

        setPage("dashboard");

      }
      else{

        alert(data.message);

      }


    } catch(error){

      console.log(error);

    }

  }



  return (

    <div>

      <h1>
        Login
      </h1>


      <input

        placeholder="Email"

        value={email}

        onChange={(e)=>setEmail(e.target.value)}

      />


      <br/>


      <input

        placeholder="Password"

        type="password"

        value={password}

        onChange={(e)=>setPassword(e.target.value)}

      />


      <br/>


      <button onClick={login}>
        Login
      </button>


      <p>

        New user?

        <button onClick={()=>setPage("signup")}>

          Signup

        </button>

      </p>


    </div>

  );

}


export default Login;