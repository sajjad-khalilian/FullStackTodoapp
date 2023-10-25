import User from "@/models/User";
import { sortTodos } from "@/utils/sortTodos";

const { default: connectDB } = require("@/utils/connectDB");
const { getSession } = require("next-auth/react");

async function handler(req , res){

    try{
        await connectDB()
    }catch(err){
        res.status(500).json({status: "failed" , message: "Error in Connecting To DB"})
    }

    const session = await getSession({req})
    if(!session){
        res.status(422).json({status: "failed" , message: "You are not autorized!"})
    }

    const user = await User.findOne({email : session.user.email})
    if(!user){
        res.status(401).json({status: "failed" , message: "You are not loggedin!"})
    }

    if(req.method === "POST"){
        const {title , status} = req.body

        if(!title || !status){
            res.status(422).json({status: "failed" , message: "Invalid Data!"})
        }

        user.todos.push({status , title})
        user.save()
        res.status(201).json({status: "success" , message: "User Created!"})


    }else if(req.method === "GET"){
        const sortedTodos = sortTodos(user.todos);
        res.status(201).json({status: "success" , data: {todos: sortedTodos}})
    }else if(req.method === "PATCH"){
        const {id , status} = req.body


        if(!id || !status){
            res.status(422).json({status: "failed" , message: "Invalid Data"})
        }


        const result = await User.updateOne({"todos._id" : id} , {$set: {"todos.$.status": status}})
        console.log(result)
        res.status(200).json({status: "success"})
    }
}
export default handler