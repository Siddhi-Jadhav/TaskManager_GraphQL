import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Task from '../components/task.component'
import { changeTaskStatus, getTasks } from '../services/task.service'

const TaskListPage = (props) => {
  // state
  const [tasksOpen, setTasksOpen] = useState([])
  const [tasksInProgress, setTasksInProgress] = useState([])
  const [tasksDone, setTasksDone] = useState([])
  const navigate = useNavigate()

  // this function is called as soon as the page loads
  useEffect(() => {
    reloadTasks()
  }, [])

  const reloadTasks = () => {
    loadTasks('OPEN', setTasksOpen)
    loadTasks('IN_PROGRESS', setTasksInProgress)
    loadTasks('DONE', setTasksDone)
  }

  // load tasks by calling the get api
  const loadTasks = async (status, func) => {
    const result = await getTasks(status)
    if (result.errors && result.errors.length > 0) {
      const error = result.errors[0].message
      alert(error)
    } else {
      if (result.data) {
        func(result.data.getTasks)
      }
    }
  }

  // change the status
  const changeStatus = async (id, status) => {
    const result = await changeTaskStatus(id, status)
    if (result.errors && result.errors.length > 0) {
      const error = result.errors[0].message
      alert(error)
    } else {
      if (result.data) {
        reloadTasks()
      }
    }
  }

  // logout
  const logout = () => {
    // remove the token and username from sessionStorage
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')

    // redirect to signin
    navigate('/signin')
  }

  return (
    <div>
      <button
        onClick={logout}
        style={{ float: 'right' }}
        className="btn btn-warning"
      >
        Logout
      </button>
      <h1 className="header">Task List</h1>

      <Link to="/task-create">Create new task</Link>
      <div className="row">
        <div className="col">
          <h4 className="header">Open</h4>
          {tasksOpen.length > 0 &&
            tasksOpen.map((task) => {
              const { id, title, status, description } = task
              return (
                <Task
                  key={id}
                  id={id}
                  title={title}
                  status={status}
                  description={description}
                  changeStatus={changeStatus}
                />
              )
            })}
          {tasksOpen.length === 0 && <div>No OPEN tasks</div>}
        </div>
        <div
          className="col"
          style={{
            borderLeft: 'dotted 5px black',
            borderRight: 'dotted 5px black',
          }}
        >
          <h4 className="header">In Progress</h4>
          {tasksInProgress.length > 0 &&
            tasksInProgress.map((task) => {
              const { id, status, title, description } = task
              return (
                <Task
                  key={id}
                  id={id}
                  status={status}
                  title={title}
                  description={description}
                  changeStatus={changeStatus}
                />
              )
            })}
          {tasksInProgress.length === 0 && <div>No IN_PROGRESS tasks</div>}
        </div>
        <div className="col">
          <h4 className="header">Done</h4>
          {tasksDone.length > 0 &&
            tasksDone.map((task) => {
              const { id, title, status, description } = task

              return (
                <Task
                  key={id}
                  id={id}
                  status={status}
                  title={title}
                  description={description}
                  changeStatus={changeStatus}
                />
              )
            })}

          {tasksDone.length === 0 && <div>No DONE tasks</div>}
        </div>
      </div>
    </div>
  )
}

export default TaskListPage
