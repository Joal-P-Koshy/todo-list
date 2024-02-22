import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { deleteTodo, getAllTodos, getTodoDetailsbyId, updateTodoById } from '../services/allApi';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Listtodo({ uploadTodoStatus }) {

  const [eachTaskValue, setEachTaskValue] = useState({
    todoName: '',
    todoDescription: ''
  })

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [allTodo, setAllTodos] = useState([]);
  const getAllTodoItem = async () => {
    const response = await getAllTodos();
    const { data } = response;
    setAllTodos(data);
  }
  useEffect(() => {
    getAllTodoItem()
  }, [uploadTodoStatus])
  // console.log(allTodo);

  const removeTodo = async (id) => {
    const response = await deleteTodo(id);
    toast.success("successfully removed")
    getAllTodoItem();
  }

  const getTodoDetails = async (id) => {
    handleShow();
    const res = await getTodoDetailsbyId(id)
    const { data } = res;
    // console.log(data);
    setEachTaskValue(data);
  }

  const updateTodo = async () => {
    handleClose();
    // console.log(eachTaskValue);
    await updateTodoById(eachTaskValue.id, eachTaskValue);
    toast.success("Task updated successfully");
    getAllTodoItem();
  }
  return (
    <>
      <div className='mt-5'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              allTodo?.length > 0 ?
                allTodo.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.todoName}</td>
                    <td>{item.todoDescription}</td>
                    <td>
                      <Button className='me-3' onClick={() => getTodoDetails(item.id)} variant='success'><i class="fa-solid fa-pen-to-square"></i></Button>
                      <Button onClick={() => removeTodo(item.id)} variant='danger'><i class="fa-solid fa-trash"></i></Button>
                    </td>
                  </tr>
                )) :
                <p>Nothing to display</p>
            }

          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" className='form-control  border-success'
              value={eachTaskValue.todoName}
              onChange={(e) => setEachTaskValue({ ...eachTaskValue, todoName: e.target.value })} />
          </div>
          <div>
            <textarea name="" id="" cols="30" rows="2" className='form-control border-success mt-3'
              value={eachTaskValue.todoDescription}
              onChange={(e) => setEachTaskValue({ ...eachTaskValue, todoDescription: e.target.value })}>
            </textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateTodo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="light"></ToastContainer>
    </>
  )
}

export default Listtodo