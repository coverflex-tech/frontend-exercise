import React, { Component } from 'react';

// ### User component for sign in

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
    //console.log('newUser=>' + JSON.stringify(newUser));
  }

  getUser(user) {
    fetch(`http://localhost:4000/api/users/${user}`)//
      .then(response => response.json())
      .then(data => {
        this.setState({ user: data.user });
      })
  }

  render() {
    return (
      <div className="signin">
        <div className="signin-container">
          <div className="signin-row">
            <h2>Sign in</h2>
            <form>
              <div className="">
                <label>First Name:</label>
                <input placeholder="First Name" name="user_id" className="form-control"
                  value={this.state.user_id} onChange={this.changeUserIdHandler}/>
              </div>
              <button className="btn btn-success" onClick={this.saveUserId}>Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signin;