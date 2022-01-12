import React, { Component } from 'react';

class Signin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user_id: '',
    }
    this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
    this.saveUserId = this.saveUserId.bind(this);
  }

  changeUserIdHandler = (event) => {
    this.setState({ user_id: event.target.value });
  }

  saveUserId = (e) => {
    e.preventDefault();
    let newUser = this.state.user_id;
    this.getUser(newUser)
  }

  getUser(user) {
    fetch(`http://localhost:4000/api/users/${user}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ user: data.user });
        localStorage.setItem('myUser', data.user.user_id);
      })
  }

  render() {
    return (
      <div className="signin">
        <div className="box-container">
          <h2>Sign in</h2>
          <form method="post">
            <div className="txt_field">
              <input
                name="user_id"
                className="form-control"
                value={this.state.user_id}
                onChange={this.changeUserIdHandler}
                autoComplete="off"
                required
                type="text"
              />
              <span></span>
              <label>Username</label>
            </div>
            <div className="txt_field">
              <input type="password" required></input>
              <span></span>
              <label>Password</label>
            </div>
            <div className="btn-container">
              <button className="primary-btn" onClick={this.saveUserId}>Save</button>
            </div>
          </form>
        </div >
      </div >
    )
  }
}

export default Signin;