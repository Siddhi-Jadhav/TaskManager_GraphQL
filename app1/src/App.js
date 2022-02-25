import SignupPage from './pages/signup.page'
import SigninPage from './pages/signin.page'
import ProfilePage from './pages/profile.page'
import CreateTaskPage from './pages/task.create.page'
import TaskListPage from './pages/task.list.page'
import TaskDetailsPage from './pages/task.details.page'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        {/* <h1 className="header">Task Manager</h1> */}
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="task-list" element={<TaskListPage />} />
          <Route path="task-details" element={<TaskDetailsPage />} />
          <Route path="task-create" element={<CreateTaskPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
