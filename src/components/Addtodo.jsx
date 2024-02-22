import React, { useState } from 'react'
import { uploadTodo } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addtodo({ setUploadTodoStatus }) {
    const [todoValue, setTodoValue] = useState({
        todoName: '',
        todoDescription: ''
    })
    // console.log(todoValue);
    const handleAdd = async () => {
        const { todoName, todoDescription } = todoValue;
        if (!todoName || !todoDescription) {
            toast.warn("please fill the form completely")
        }
        else {
            const response = await uploadTodo(todoValue);
            
            setUploadTodoStatus(response.data);
            setTodoValue({
                todoName: '',
                todoDescription: ''
            })
            toast.success("successfully inserted");
        }
    }
    return (
        <>
            <div>
                <h3 className='text-success mb-3 mt-5'>TO-DO Application</h3>
                <div>
                    <input type="text" className='form-control  border-success'
                        value={todoValue.todoName}
                        onChange={(e) => setTodoValue({ ...todoValue, todoName: e.target.value })} />
                </div>
                <div>
                    <textarea name="" id="" cols="30" rows="2" className='form-control  border-success mt-3'
                        value={todoValue.todoDescription}
                        onChange={(e) => setTodoValue({ ...todoValue, todoDescription: e.target.value })}></textarea>
                </div>
                <button className='btn w-100 btn-success mt-3'
                    onClick={handleAdd}>ADD TO-DO Item</button>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                theme="light"></ToastContainer>
        </>
    )
}

export default Addtodo