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


    var domain = process.env.DOMAIN || "http://localhost:5000";
    console.log(`${domain}/user/`);
    axios
      .get(`${domain}/user/`, {
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

   render() {

  const { user, loading, showSocialMenu } = this.state;
  console.log(user)
  if (loading) return <div>...Loading</div>;

  if (!user) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        Failed to load user. Please check if the user ID is valid.
      </div>
    );
  }

  return (
    <div className="sm_dashboard-wrapper">
      <nav className="sm_dashboard-navbar">
        <div className="sm_dashboard-logo">MyLogo</div>
        <div>
          <button className="sm_dashboard-avatar-button" onClick={this.toggleDropdown}>
            <div className="sm_dashboard-avatar">
              <img src="https://via.placeholder.com/40" alt="Profile" />
            </div>
          </button>
          <div id="dropdownMenu" className="sm_dashboard-dropdown-content">
            <button>Profile</button>
            <button>Settings</button>
            <button>Logout</button>
          </div>
        </div>
      </nav>

      <main className="sm_dashboard-container">
        <div className="sm_dashboard-content">
          <Socials toggleSocialMenu={this.toggleSocialMenu} socialMedia={user.socialMedia} />
          {showSocialMenu && (
            <SocialMenu socialMedia={user.socialMedia} toggleSocialMenu={this.toggleSocialMenu} />
          )}
        </div>
      </main>
    </div>
  );
}

}


export default DashPage;
