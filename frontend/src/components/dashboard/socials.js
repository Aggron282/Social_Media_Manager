import React from 'react';
import LinkdenIcon from "./../../imgs/linkden_icon.png";
import InstaIcon from "./../../imgs/insta_icon.jpg";
import Google from "./../../imgs/google.png";
import NextdoorIcon from "./../../imgs/nextdoor.png";
import FacebookIcon from "./../../imgs/facebook_icon.png";

class Socials extends React.Component{

    constructor(props){
      super(props);
      this.state = {socials:[
        {
          name:"linkedin",
          icon:LinkdenIcon
        },
        {
          name:"google",
          icon:Google
        },
        {
          name:"instagram",
          icon:InstaIcon
        },
        {
          name:"nextdoor",
          icon:NextdoorIcon
        },
        {
          name:"facebook",
          icon:FacebookIcon
        }
      ]}
    }

    RenderSocials = () => {
      if(!this.props.socialMedia){
        return <div ></div>
      }
      return this.state.socials.map((social)=>{

        for(var i =0; i < this.props.socialMedia.length;i++){
            var sm = this.props.socialMedia[i];
            if(sm.platform == social.name){
              return (
                <div class="link-item">
                  <img src = {social.icon} />
                  <h4> {social.name} </h4>
                </div>
              )
            }
        }

      });
    }

    render(){
      console.log(this.props,this.state)
      return(
        <div class="socials_container">
          <div class="social-grid">
            <div class="add-social" onClick = {this.props.toggleSocialMenu}>
              + Social
            </div>
            {this.RenderSocials()}
          </div>
        </div>

      )
  }

}


export default Socials;
