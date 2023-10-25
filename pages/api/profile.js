import User from "@/models/User"
import { verifyPassword } from "@/utils/auth"
import connectDB from "@/utils/connectDB"
import { getSession } from "next-auth/react"

async function handler(req , res){
    try{    
        await connectDB()
    }catch(err){
        res.status(500).json({status: "failed" , message: "Error in Connecting To DB"})
    }


    const session = await getSession({req})
    if(!session){
        res.status(401).json({status: "failed" , message: "You are not Loggedin!"})
    }


    const user = await User.findOne({email : session.user.email})
    if(!user){
        res.status(401).json({status: "failed" , message: "User doesnt exist!"})
    }


    if(req.method === "POST"){
        const {name , lastName , password} = req.body

        const isValid = await verifyPassword(password, user.password)
        if(!isValid){
            res.status(422).json({status: "failed" , message: "Password is incorrect"})
        }

        user.name = name,
        user.lastName = lastName,
        user.save()

        res.status(201).json({status: "success" , data: {name , lastName, email: session.user.email}})
    }else if(req.method === "GET"){
        res.status(201).json({status: "success" , data: {name: user.name , lastName: user.lastName , email: user.email}})
    }
}
export default handler