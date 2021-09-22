import React from 'react'

const LoginForm = ({
  handleSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange
}) => {
  return (
    <div>
      <h2>Login</h2>
    

    <form onSubmit={handleSubmit}>
      <div>
        username 
          <input
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div>
        password 
          <input
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>   

  </div> 
  )
} 


export default LoginForm