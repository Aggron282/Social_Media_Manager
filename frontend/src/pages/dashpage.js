import React from "react";
import Socials from "./../components/dashboard/socials.js";
import SocialMenu from './../components/dashboard/social_menu.js';

class DashPage extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       showSocialMenu: false
     };
   }

   toggleSocialMenu = () => {
     this.setState(prev => ({ showSocialMenu: !prev.showSocialMenu }));
   }

  render(){
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
          <Socials toggleSocialMenu = {this.toggleSocialMenu} />
          {this.state.showSocialMenu && <SocialMenu toggleSocialMenu = {this.toggleSocialMenu} />}
          </div>
        </main>
      </div>
    )
  }
}


export default DashPage;
