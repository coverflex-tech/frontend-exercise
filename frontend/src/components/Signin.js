import React from 'react';

// ### User component for sign in

function UserComponent() {

  return (
    <div className="center">
      <h1>Sign in</h1>
      <form method="post">
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
        <input type="submit" value="Sign in"></input>
      </form>
    </div>
  );
}

export default UserComponent;