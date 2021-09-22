import React from 'react'

const LoginForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      username
        <input
        type="text"
        value={props.usernameValue}
        name="Username"
        onChange={props.onUsernameChange}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={props.passwordValue}
        name="Password"
        onChange={props.onPasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)


export default LoginForm