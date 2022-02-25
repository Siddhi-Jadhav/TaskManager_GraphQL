import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createTask } from '../services/task.service'

const CreateTaskPage = (props) => {
  // state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  const onCreateTask = async () => {
    if (title.length === 0) {
      alert('set title')
    } else if (description.length === 0) {
      alert('set description')
    } else {
      const result = await createTask(title, description)
      console.log(result)
      if (result.errors && result.errors.length > 0) {
        const error = result.errors[0].message
        alert(error)
      } else {
        if (result.data) {
          // redirect to task list
          navigate('/task-list')
        }
      }
    }
  }

  return (
    <div>
      <h1 className="header">Create Task</h1>
      <div className="form">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            type="text"
            className="form-control"
          />{' '}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            rows={5}
            type="password"
            className="form-control"
          ></textarea>
        </div>

        <div className="mb-3">
          <button onClick={onCreateTask} className="btn btn-success">
            Save
          </button>
          <Link
            to="/task-list"
            style={{ marginLeft: '10px' }}
            className="btn btn-danger"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskPage
