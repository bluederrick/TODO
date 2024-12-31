import { Task } from "../schema/model.js";
import DTOValidator from "../utils/validator.js";



export const createTaskService = async({...obj})=>{
try{

      const validObj= await DTOValidator(Task)(obj);
      console.log(validObj,"validate")
      if(!validObj){ 
        return `kindly checked your input ${validated}`
      }
// const {task,selectedPriority,titleTask,descriptionTask,deadlineTask} = validObj
    //   destructure the taskData
    const {data} = validObj
      // Create and save task
      // const newTask = {
      //   //  task:task,priority:priority,titleTask:titleTask,descriptionTask:descriptionTask,deadlineTask:deadlineTask
      //   data// Automatically set the current date
      //     };

          console.log("saved")
      const Tasks = new Task(data)
      
      await Tasks.save().then((res)=>{
         console.log(res, 'the task has been saved')
      }).catch((error)=>{
         console.log(error)
      });

      return { success: true, message: 'task  successfully saved ' };

    } catch (error) {
      return { success: false, message: error.message };
  }
}

      // return new Error(error.message || 'Failed to create task');


//  service to update the Taskmanager

 export const updateTaskService = async (taskId ,taskData)=>{

    
        try {
          // Validate priority level if present
          if (taskData.priority && !Object.values(PriorityLevels).includes(taskData.priority)) {
            throw new Error(
              `Invalid priority level. Allowed values are: ${Object.values(PriorityLevels).join(', ')}`
            );
          }
      
          // Find the task by ID and update it
          const updatedTask = await Task.findByIdAndUpdate(
            taskId,               // ID of the task to update
            { $set: taskData },   // Fields to update
            { new: true, runValidators: true } // Options: return updated document, apply validation
          );
      
          // Check if the task exists
          if (!updatedTask) {
            throw new Error('Task not found');
          }
      
          return updatedTask;
        } catch (error) {
          throw new Error(`Failed to update task: ${error.message}`);
        }
      };
      

 export const getAllTaskServices  =async()=>{

  try {
    const tasks = await Task.find({}); // Fetch all tasks
    console.log(tasks)
    return {
      data: tasks,
      message:`all task were retrived successfully ` ,
      success: true
    }
    
    
  } catch (error) {
    return {
      message: `error retrieving all task ${error}`,
      success: false
    }
  }

 }