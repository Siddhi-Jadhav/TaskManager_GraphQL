import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../services/user.service'

const SignupPage = (props) => {
  // keep email
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // for navigation
  const navigate = useNavigate()

  const onSignup = async () => {
    if (username.length === 0) {
      alert('please enter username')
    } else if (password.length === 0) {
      alert('please enter password')
    } else {
        const result = await signup(username, password)
        if (result.errors && result.errors.length > 0) {
          const error = result.errors[0].message
          alert(error)
        } else {
        if (result.data) {
          // redirect to task list
          navigate('/signin')
        }
      }
    }     
  }

  return (
    <div>
      <h1 className="header">Signup</h1>
      <div className="form">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <div>
            Already have an account ? Signin <Link to="/signin">here</Link>
          </div>
          <button onClick={onSignup} className="btn btn-success">
            Signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
