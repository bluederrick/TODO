
import express from 'express'
import { createTaskService, getAllTaskServices } from '../Services/taskServices.js';



export const taskControllers = async (req,res)=>{

    const {task,selectedPriority,descriptionTask,titleTask,deadlineTask} = req.body;

console.log(selectedPriority)

// if (selectedPriority) {
//   selectedPriority = selectedPriority.charAt(0).toUpperCase() + selectedPriority.slice(1).toLowerCase();
//   // console.log(selectedPriority)
// } else {
//   selectedPriority = "Low"; // Provide a default priority if required
// }

    const taskAdded = await createTaskService( {task,selectedPriority,descriptionTask,titleTask,deadlineTask} )
    // console.log(taskAdded)
    if(taskAdded){
     return   res.status(201).json({
             message: 'Task created successfully',
             data:taskAdded.data});

    }
     return res.status(404).json({
        message:'Task was not added',
        data:taskAdded
     })

}


export const updateTaskController =async (req,res)=>{
    try {
      const taskId = req.params.id;
      const taskData = req.body;
  
      const updatedTask = await updateTask(taskId, taskData);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  export const getAllTaskController = async (req,res)=>{
   const Tasks = getAllTaskServices() ;
   if(Tasks )
   return res.status(200).json({
    data: (await Tasks).data ,
    messgae :`success retrieving all task `
   })
else{
  return res.status(404).json({
    message:'could not retrievec task',
    data: Tasks 
 })
}
  }
 
  