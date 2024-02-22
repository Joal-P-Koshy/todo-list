import { commonApi } from "./commonApi";


// 1) upload video
const serverURL='http://localhost:5000' 

export const uploadTodo = async(reqBody)=>{
    return await commonApi('POST', `${serverURL}/todolist`, reqBody)
}

// 2) get all videos    

export const getAllTodos = async()=>{
    return await commonApi('GET', `${serverURL}/todolist`,"")
}

// 3) delete video

export const deleteTodo = async(id)=>{
    return await commonApi('DELETE', `${serverURL}/todolist/${id}`,{})
}

// 4) to get details of a specific task by its id

export const getTodoDetailsbyId = async(id)=>{
    return await commonApi('GET', `${serverURL}/todolist/${id}`,'')
}

// 5) to update the changing value

export const updateTodoById = async(id, reqBody)=>{
    return await commonApi('PUT', `${serverURL}/todolist/${id}`,reqBody)
}