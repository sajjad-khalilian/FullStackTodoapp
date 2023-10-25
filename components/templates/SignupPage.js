import Link from "next/link"
import { useState } from "react"

function SignupPage() {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const signupHandler = async () => {
        const res = await fetch("/api/auth/signup" , {
            method: "POST",
            body: JSON.stringify({email , password}),
            headers: {"Content-Type" : "application/json"}
        })
        const data = await res.json()
        console.log(data)
    }
    return (
        <div className="signin-form">
            <h3>Registration Form</h3>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={signupHandler}>Sign Up</button>
            <div>
                <p>Have an Account?</p>
                <Link href="/login">Login</Link>
            </div>
        </div>
    )
}

export default SignupPage
