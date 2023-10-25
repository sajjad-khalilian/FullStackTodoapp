import {GrAddCircle} from "react-icons/gr"
import {BsAlignStart} from "react-icons/bs"
import {FiSettings} from "react-icons/fi"
import {AiOutlineSearch} from "react-icons/ai"
import {MdDoneAll} from "react-icons/md"
import { useState } from "react"
import RadioButton from "../element/RadioButton"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTodoPage() {


    const [title , setTitle] = useState("")
    const [status , setStatus] = useState("todo")

    const addHandler = async () => {
        const res = await fetch("/api/todos" , {
            method: "POST",
            body: JSON.stringify({title , status}),
            headers: {"Content-Type" : "application/json"}
        })
        const data = await res.json()
        if(data.status === "success"){
            setTitle("");
            setStatus("todo");
            toast.success("Todo Added");
        }
    }

    return (
        <div className="add-form">
            <h2>
                <GrAddCircle/>  
                Add New Todo
            </h2>
            <div className="add-form__input">
                <div className="add-form__input--first">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="add-form__input--second">
                    <RadioButton status={status} setStatus={setStatus} value="todo" title="todo">
                        <BsAlignStart/>
                    </RadioButton>
                    <RadioButton status={status} setStatus={setStatus} value="inProgress" title="In Progress">
                        <FiSettings/>
                    </RadioButton>
                    <RadioButton status={status} setStatus={setStatus} value="review" title="Review">
                        <AiOutlineSearch/>
                    </RadioButton>
                    <RadioButton status={status} setStatus={setStatus} value="done" title="Done">
                        <MdDoneAll/>
                    </RadioButton>
                </div>
                <button onClick={addHandler}>Add Todo</button>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default AddTodoPage
