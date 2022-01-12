import React, { Component } from 'react';
import "./style.css";
import Signin from './components/Signin';
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         cartItems: []
      };
   }

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