import XIcon from "./../../imgs/x_icon.png";
import LinkdenIcon from "./../../imgs/linkden_icon.png";
import InstaIcon from "./../../imgs/insta_icon.jpg";
import Google from "./../../imgs/google.png";
import NextdoorIcon from "./../../imgs/nextdoor.png";
import FacebookIcon from "./../../imgs/facebook_icon.png";

const SocialMenu = (props) => {
  return(
    <div class="link_wrapper">
    <div class="overlay overlay--active"></div>
    <div class="link_container link_container--active">
      <div class="text-container">
      <h2 class="title"> Choose a Platform to Link </h2>
      <p id="exit-link-menu" onClick = {props.toggleSocialMenu}>X</p>
      </div>
      <div class="link-menu">
        <div class="link-item">
          <img src = {XIcon} />
          <h4> X </h4>
        </div>

        <div class="link-item">
          <img src = {LinkdenIcon} />
          <h4> Linkden </h4>
        </div>

        <div class="link-item">
          <img src = {InstaIcon} />
          <h4> Instagram </h4>
        </div>

        <div class="link-item">
          <img src = {NextdoorIcon} />
          <h4> Nextdoor </h4>
        </div>

        <div class="link-item">
          <img src = {FacebookIcon} />
          <h4> Facebook </h4>
        </div>


        <div class="link-item">
          <img src = {Google} />
          <h4> Gmail </h4>
        </div>
      </div>
    </div>
    </div>

  )
}


export default SocialMenu;
