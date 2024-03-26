import React, { createContext, useEffect, useState } from 'react'
import Header from './component/Header'
import Footer from './component/Footer'
import AddTask from './component/AddTask'
import TaskList from './component/TaskList'

export const DeleteHandlerContext=createContext();
export const EditHandlerContext=createContext();

function App() {
  const [tasks,setTasks]=useState([])
  const [loading,setLoading]=useState(true)
  const [error, setError]=useState('')
  const [editText,setEditText]=useState('')
  const [toggleEditMode,setToggleEditMode]=useState(true)


  useEffect(()=>{
    fetchingData()
  },[])

  const fetchingData=async()=>{
    try{
      const res=await fetch("https://languid-weak-pufferfish.glitch.me/tasks");
    if(!res.ok){
      throw new Error("Something went wrong")
    }
    const data=await res.json();
    setTasks(data);
    setLoading(false);
    }
    catch(err){
      setError(err.message)
    }
  }

  const handleDelete=(id)=>{
    deleteData(id);

    setTasks(
      tasks.filter((task)=>id !==task.id)
    )
  }

  const deleteData=async(id)=>{
    // server-delete
    await fetch(`https://languid-weak-pufferfish.glitch.me/tasks/${id}`,{
      method:'DELETE',
      headers:{
        "content-type":"application/json"
      }
    })
  }

  // editing event
  const handleEdit=(id)=>{
    const [editableTarget]= tasks.filter(task=>id === task.id)
    editableTarget.isEditable=true;
    setEditText(editableTarget.text)

    setTasks([...tasks]);
    toggleEditMode(false);

    // re-arrange
    tasks.filter(task=>id !==task.id).map(targetedEl => targetedEl.isEditable=false);
  }

    // editing task from handler
    const handleEditSubmit=(e,id)=>{
      e.preventDefault()
      setToggleEditMode(!toggleEditMode)
      const editPersist={
        text:editText,
        id:id
      }

      //put request
      PuttingRequest(id,editPersist);

      //real time update
      const [editableTarget]= tasks.filter(task=>id === task.id)
      editableTarget.isEditable=false;
      editableTarget.text=editPersist.text;

      setTasks([...tasks])

    }

    const PuttingRequest=async(id,newData)=>{
      await fetch(`https://languid-weak-pufferfish.glitch.me/tasks/${id}`,{
      method:'PUT',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(newData)
    })
    }


  return (
    <div className='wrapper bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10'>
      <DeleteHandlerContext.Provider value={handleDelete}>
      <EditHandlerContext.Provider value={handleEdit}>
      <Header />
      <AddTask tasks={tasks} setTasks={setTasks}/>
      <TaskList tasks={tasks} error={error} loading={loading} handleEditSubmit={handleEditSubmit} editText={editText} setEditText={setEditText}/>
      <Footer/>
      </EditHandlerContext.Provider>
      </DeleteHandlerContext.Provider>
    </div>
  )
}

export default App