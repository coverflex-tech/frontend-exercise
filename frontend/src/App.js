import React, { Component } from 'react';
import "./style.css";
import Signin from './components/Signin';
import Header from "./components/Header";
import Home from "./components/Home";

//import users from './data/UserData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         cartItems: []
      };
   }



   // ### API requests ###
   // GET
   /*componentDidMount() {
      //`GET /api/users/:user_id`
      //returns a single user
      //if user_id doesn't exist, it creates a new user
      //output `{"user": {"user_id": "johndoe", "data": {"balance": 500, "product_ids": [...]}}}`

      //`GET /api/products`
      //returns a list of all products
      //output `{"products": [...] }`

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
   }

   }


   // POST
   // creates a new order
   // input `{"order": {"items": ["product-1", "product-2"], "user_id": "johndoe"}}`
   // output 200 `{"order": {"order_id": "123", "data": {"items": [...], "total": 500}}}`
   // output 400 `{"error": "products_not_found"}`
   // output 400 `{"error": "products_already_purchased"}`
   // output 400 `{"error": "insufficient_balance"}`
   /*onSubmitHandler(event) {
      event.preventDefault()

      const newUser = this.state.user
      fetch('https://reqres.in/api/users', {
         method: 'POST', // Por defeito é GET
         headers: { 'Content-type': 'application/json' },
         body: JSON.stringify(newUser) // Para onde se quer enviar
      })
         .then(answer => answer.json())
         .then(userData => {
            console.log(userData.data)
            //this.setState(object)
            this.state.newUser(userData) // newOrder não existe
            // dentro do new user
            const users = [...this.state.usuários, usuario]
            this.setState({usuário: usuário})
         })
   }*/

   render() {
      return (
         <div className="App">
            <BrowserRouter>
               <Header countCartItems={this.state.cartItems.length}></Header>
               <Routes>
                  <Route path="signin" element={<Signin />} />
                  <Route path="/" element={<Home cartItems={this.state.cartItems} />} />
               </Routes>
            </BrowserRouter>
         </div>
      );
   }
}

export default App;
