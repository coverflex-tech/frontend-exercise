import React, { useState } from 'react';

// ### User component for sign in

function Signin() {

  const [userId, serUserId] = useState('')

  const onSubmitHandler = event => {

    event.preventDefault()
    const user = { userId }

    // API POST
    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/jsom' },
      body: JSON.stringify(user)
    })
      .then(answer => {
        if (answer.ok) {
          serUserId('')
          alert('Usuário criado')
        }
      })
  }

  // API GET
  /*componentDidMount() {
    //`GET /api/users/:user_id`
    //returns a single user
    //if user_id doesn't exist, it creates a new user
    //output `{"user": {"user_id": "johndoe", "data": {"balance": 500, "product_ids": [...]}}}`

    fetch('https://reqres.in/api/users')
      .then(answer => answer.json())
      .then(userData => {
        //console.log(userData.data)
        //Convert data to an object
        const users = userData.data.map(user => ({
          id: user.id,
          name: user.first_name,
          lastname: user.last_name,
          email: user.email
        }))
        //console.log(users)
        //this.setState({users: users})
      })
  }*/

  return (
    <div className="signin">
      <div className="center">
        <h1>Sign in</h1>
        <form method="post" onSubmit={onSubmitHandler}>
          <div className="txt_field">
            <input type="text" required></input>
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input type="password" required></input>
            <span></span>
            <label>Password</label>
          </div>
          <div className="div-btn">
            <button className="primary-btn" type="submit" value="Sign in">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;