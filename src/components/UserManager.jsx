import React, { useEffect, useState } from "react";
import "./UserManager.scss";
import axios from "axios";
export default function UserManager() {
  const [newTask, setNewtask] = useState({ nameTask: "" });
  const [flag, setFlag] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const [edit, setEdit] = useState(false);

  //get data de render
  const handleGetData = async () => {
    try {
      const res = await axios.get("http://localhost:7000/task");
      setAllTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, [flag]);

  const handleAddTask = async () => {
    try {
      const res = await axios.post("http://localhost:7000/addTask", {
        ...newTask,
        status: false ,
      });
      setFlag(!flag);
      setNewtask({ nameTask: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDel = async (id) => {
    const confim = confirm("Bạn có muốn xóa task này ?");
    if(confim){
      try {
        const res = await axios.delete(`http://localhost:7000/del/${id}`);
        setAllTask(res.data);
      } catch (error) {
        console.log(error);
      }
    }
   
  };

  const handleEdit = async (item) => {
    setEdit(true);
    setNewtask(item);
  };

  const handleSave = async ()=>{
    try {
      const res = await axios.put(`http://localhost:7000/edit/${newTask.id}`, newTask);
      setFlag(!flag);
      setNewtask({ nameTask: "" });
      setEdit(false);
      
    } catch (error) {
      console.log(error)
    }
  }
 
  const handleChangeStatus =(id,status)=>{
    try {
      const res = axios.put(`http://localhost:7000/changStatus/${id}`,{status : status});
      setFlag(!flag);
    } catch (error) {
      console.log(error)
    }
  }
  return (  
    <>
      <div className="bg-rose-50 h-[100vh] pt-7">
        <div className="bg-blue-200 w-[500px] m-auto h-[500px]  ">
          <h1 className="text-3xl text-center"> User Manager </h1>
          <div className="input-container mt-6 ">
            <input
              placeholder="Add your task"
              name="nameTask"
              value={newTask.nameTask}
              type="text"
              onChange={(e) =>
                setNewtask({ ...newTask, [e.target.name]: e.target.value })
              }
            />
            <button
              class="invite-btn"
              type="button"
              onClick={edit ? handleSave : handleAddTask}
            >
              {edit ? <span>Save</span> : <span>Add</span>}
            </button>
          </div>

          {allTask.map((item, index) => {
            return (
              <div key={index} className="pt-5 leading-10 flex">
                <div className="bg-white w-[350px] ml-7 h-[40px] rounded-[3px] pl-4 cursor-pointer flex justify-between ">
                  {" "}
                  <p> {item.nameTask}</p>
                  <div className="mr-2" onClick={()=>handleChangeStatus(item.id,item.status)} > {item.status ? "Done" : "Not Done"} </div>
                </div>
                <div className=" ml-4 flex justify-between ">
                  <button
                    className="bg-sky-200 w-[40px] rounded-[3px]"
                    onClick={() => handleDel(item.id)}
                  >
                    Del
                  </button>
                  <button
                    className="bg-green-400 w-[40px] ml-2 rounded-[3px]"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
