import React from 'react';
import MetaIcon from "./../../imgs/meta.png";
import Google from "./../../imgs/google.png";
import NextdoorIcon from "./../../imgs/nextdoor.png";
import LinkdenIcon from "./../../imgs/linkden_icon.png"; // Make sure this was missing
import axios from "axios";

class SocialMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socials: [
        { name: "linkedin", icon: LinkdenIcon, isLinked: false },
        { name: "google", icon: Google, isLinked: false },
        { name: "meta", icon: MetaIcon, isLinked: false },
        { name: "nextdoor", icon: NextdoorIcon, isLinked: false },
      ]
    };
  }

  componentDidMount() {
    if (this.props.socialMedia) {
      const updatedSocials = this.state.socials.map((social) => {
        const matched = this.props.socialMedia.find((sm) => {
          if (social.name === "meta") {
            // Treat meta as Facebook (with IG data optionally)
            return sm.platform === "facebook" && sm.meta?.pageToken;
          }
          return sm.platform === social.name;
        });
        return { ...social, isLinked: !!matched };
      });

      this.setState({ socials: updatedSocials });
    }
  }

  handleLogin = async (platformName) => {
    const domain = process.env.REACT_APP_API || "http://localhost:5000/";
    try {
      const { data } = await axios.get(`${domain}api/user`, { withCredentials: true });
      const userId = data.user._id;

      if (!userId) {
        console.error("User ID not found in response");
        return;
      }

      if (platformName === "meta") {
        window.location.href = `${domain}api/auth/meta/userId/`;
      } else {
        window.location.href = `${domain}api/auth/${platformName}/userId/`;
      }
    } catch (error) {
      console.error("Error during social login:", error);
    }
  };

  renderSocialItems = () => {
    return this.state.socials.map((social, index) => (
      <div
        className={`link-item ${social.isLinked ? "link-item--active" : ""}`}
        key={index}
        onClick={() => this.handleLogin(social.name)}
      >
        <img src={social.icon} alt={social.name} />
        <h4>{social.name.charAt(0).toUpperCase() + social.name.slice(1)}</h4>
      </div>
    ));
  };

  render() {
    return (
      <div className="link_wrapper">
        <div className="overlay overlay--active"></div>

        <div className="link_container link_container--active">
          <div className="text-container">
            <h2 className="title">Choose a Platform to Link</h2>
            <p id="exit-link-menu" onClick={this.props.toggleSocialMenu}>X</p>
          </div>

          <div className="link-menu">
            {this.renderSocialItems()}
          </div>
        </div>
      </div>
    );
  }
}

export default SocialMenu;
