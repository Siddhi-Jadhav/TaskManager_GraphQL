import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../services/user.service'

const SigninPage = (props) => {
  // state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSignin = async () => {
    if (username.length === 0) {
      alert('set username')
    } else if (password.length === 0) {
      alert('set password')
    } else {
      const result = await signin(username, password)
      if (result.errors && result.errors.length > 0) {
        const error = result.errors[0].message
        alert(error)
      } else {
        if (result.data) {
          const token = result.data.signin.token
          console.log(token)
          // sessionStorage
          sessionStorage['token'] = token

          // redirect to task list
          navigate('/task-list')
        }
      }
    }
  }

  return (
    <div>
      <h1 className="header">Signin</h1>
      <div className="form">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            type="text"
            className="form-control"
          />{' '}
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
            Don't have an account ? Signup <Link to="/signup">here</Link>
          </div>
          <button onClick={onSignin} className="btn btn-success">
            Signin
          </button>
        </div>
      </div>
    </div>
  )
}

export default SigninPage
