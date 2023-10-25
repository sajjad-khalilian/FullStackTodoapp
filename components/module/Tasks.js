import {RiMastodonLine} from "react-icons/ri"

function Tasks({data , back , next , fetchTodos}) {
    
    const changeHandler = async(id , status) => {
        const res = await fetch("/api/todos" , {
            method: "PATCH",
            body: JSON.stringify({id , status}),
            headers: {"Content-Type" : "application/json"}
        })
        const data = await res.json()
        if(data.status === "success") fetchTodos();
    }
    return (
        <div className="tasks">
            {data?.map(item => (
                <div key={item._id} className="tasks__card">
                    <span className={item.status}></span>
                    <RiMastodonLine/>
                    <h4>{item.title}</h4>
                    <div>
                        {back ? <button onClick={() => changeHandler(item._id , back)} className="button-back">Back</button> : null}
                        {next ? <button onClick={() => changeHandler(item._id , next)} className="button-next">Next</button> : null}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks
