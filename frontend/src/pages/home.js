import React from "react";
import Info from "./../components/home/info.js"
import Landing from "./../components/home/landing.js"
import What from "./../components/home/what.js"
import Navbar from "./../components/home/navbar.js"
import Why from "./../components/home/why.js"

class Homepage extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
      return (
        <div class="page">

          <Navbar />
          <Landing />
          <What />
          <Why />
          <Info />

        </div>

      )
   }

}

export default Homepage;
