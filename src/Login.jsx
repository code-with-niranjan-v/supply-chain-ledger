import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login(){
        const naviagte = useNavigate();
        const URL = "http://localhost:4000"
        const [username,setUsername] = useState("");
        const [password,setPassword] = useState("");
        const handleSubmit = async()=>{
            console.log("clicked")
            if(username&& password){
                const response = await axios.post(URL+"/login",{
                    username,
                    password
                })
                console.log(response.data);
    
                if(response.data.status=='Success'){
                    localStorage.setItem("username",username)
                    
                    naviagte("/home");
                }
            }
            
        }
    return(<>
        <div className="flex w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-100 min-h-screen items-center justify-center">
            <div className="flex flex-col items-center shadow p-4 bg-white rounded-md sm:w-2/4 lg:w-1/4  ">
                <p className="text-purple-500 text-2xl">Login</p>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} className="p-2 m-2 bg-gray-100 rounded-md w-4/5" placeholder="Username"  type="text" />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className="p-2 m-2 bg-gray-100 rounded-md w-4/5" placeholder="Password"  type="text" />
                <button onClick={()=>{handleSubmit()}} className="p-2 m-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md">
                    Submit
                </button>

            </div>
        </div>
    
    </>)
}

export default Login;