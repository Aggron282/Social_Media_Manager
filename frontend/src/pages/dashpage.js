import React from "react";
import Socials from "./../components/dashboard/socials.js";
import SocialMenu from './../components/dashboard/social_menu.js';
import PostMenu from './../components/dashboard/post_menu.js';

import axios from "axios";

class DashPage extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
      showSocialMenu: false,
      user: null,
      loading: true,
    };
  }

  componentDidMount = async ()=>{

    const path = window.location.pathname;
    const segments = path.split("/");

    var userId = segments[2];

    userId = userId.replace(":", "");
    var domain = process.env.DOMAIN || "http://localhost:5000";
    axios
      .get(`${domain}/user/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        this.setState({ user: res.data.user, loading: false });
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        this.setState({ loading: false, user:null });
      });

  }

   toggleSocialMenu = () => {
     this.setState(prev => ({ showSocialMenu: !prev.showSocialMenu }));
   }

  render(){
    if(this.state.user == null){
      return <div> ....Loading </div>
    }
    console.log(this.state.user);
    return(
      <div class="sm_dashboard-wrapper">
        <nav class="sm_dashboard-navbar">
          <div class="sm_dashboard-logo">MyLogo</div>
          <div>
            <button class="sm_dashboard-avatar-button" onclick="toggleDropdown()">
              <div class="sm_dashboard-avatar">
                <img src="https://via.placeholder.com/40" alt="Profile" />
              </div>
            </button>
            <div id="dropdownMenu" class="sm_dashboard-dropdown-content">
              <button>Profile</button>
              <button>Settings</button>
              <button>Logout</button>
            </div>
          </div>
        </nav>

        <main class="sm_dashboard-container">
          <div class="sm_dashboard-content">
          <Socials toggleSocialMenu = {this.toggleSocialMenu} socialMedia = {this.state.user.socialMedia} />
          {this.state.showSocialMenu && <SocialMenu  socialMedia = {this.state.user.socialMedia} toggleSocialMenu = {this.toggleSocialMenu} />}
          </div>
        </main>
      </div>
    )
  }
}


export default DashPage;
