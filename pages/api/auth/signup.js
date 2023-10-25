import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

async function handler(req , res){
    if(req.method !== "POST") return;

    try{
        await connectDB()
    }catch(err){
        console.log(err)
        res.status(500).json({status: "failed" , message: "Error in Connecting To DB"})
    }



    const {email , password} = req.body

    if(!email || !password){
        res.status(422).json({status: "failed" , message: "Invalid Data"})
    }


    const existinguser = await User.findOne({email : email})
    if(existinguser){
        res.status(422).json({status: "failed" , message: "User existing already!"})
    }


    const hashedPassword = await hashPassword(password)

    const newuser = await User.create({email : email , password: hashedPassword})
    console.log(newuser)

    res.status(201).json({status: "success" , message: "User Created!"})
}
export default handler