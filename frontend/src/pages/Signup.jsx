import { useState } from "react";


function Signup({ setPage }) {


  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  async function signup() {


    try {


      const response = await fetch(

        "http://localhost:5000/api/auth/signup",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            name,

            email,

            password

          })

        }

      );



      const data = await response.json();



      console.log(data);



      if (response.ok) {


        alert("Account created successfully");


        setPage("login");


      } else {


        alert(data.message);


      }



    } catch (error) {


      console.log(error);


      alert(
        "Cannot connect to backend server"
      );


    }


  }




  return (


    <div>


      <h1>
        Signup
      </h1>



      <input

        placeholder="Name"

        value={name}

        onChange={(e) =>
          setName(e.target.value)
        }

      />



      <br /><br />



      <input

        placeholder="Email"

        type="email"

        value={email}

        onChange={(e) =>
          setEmail(e.target.value)
        }

      />



      <br /><br />



      <input

        placeholder="Password"

        type="password"

        value={password}

        onChange={(e) =>
          setPassword(e.target.value)
        }

      />



      <br /><br />



      <button onClick={signup}>

        Create Account

      </button>




      <p>


        Already have an account?


        <button

          onClick={() =>
            setPage("login")
          }

        >

          Login

        </button>


      </p>



    </div>


  );


}


export default Signup;