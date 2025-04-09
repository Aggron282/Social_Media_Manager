import DashImg from "./../../imgs/dash_img.png"
import Dropdown from "./dropdown.js"
import React from "react"
class What extends React.Component{
  constructor(props){
      super(props);
        this.state = {
          dashboard:[
            {
              title:"Analyze social media performance",
              description:`
              Track hundreds of social media metrics and grow faster on social with these features:
              Best time to post by network and goal
              Industry and competitor benchmarking
              Custom reports and report templates
              Report scheduling and exporting
              Paid and organic performance reporting
              … and so much more
              `
            },
            {
              title:"Schedule posts and create content",
              description:`
              Schedule or publish social media posts across social media networks, plus:
              AI caption writer and hashtag generator
              AI content ideas generator
              Drag-and-drop social content calendar
              Canva templates and stock photo library
              Bulk post 350 posts at once
              Link in bio and automated link tracking
              … and so much more
              `
            },
            {
              title:"Respond to messages and comments",
              description:`
              Stay on top of what people are saying and how they feel with these features:
              Brand mention and keyword search
              Trending topics by interest
              AI content creation by trends
              AI sentiment analysis
              Easy-to-read data summaries
              Content monitoring streams
              … and so much more
              `
            },
            {
              title:"Track mentions, keywords, and trends",
              description:`
              A single inbox for private and public messaging, plus these features to simplify engagement:
              Reply to DMs and comments
              Saved and suggested replies
              Automated Instagram DMs
              Team inbox assignments
              Inbox analytics and productivity reports
              Automated tagging and assigning
              Generative AI Chatbot (add-on)
              ... and so much more
              `
            }
          ]
        }

        this.RenderDropdownMenu = this.RenderDropdownMenu.bind(this);

    }


  RenderDropdownMenu(){

    return this.state.dashboard.map((item,index)=>{
        return <Dropdown key = {index} title = {item.title} content = {item.description} />
    });

  }

  render(){
    return(
    <section class="what-section">

      <div class="title-container">
        <h4> Explore EchoPost: What are the features? </h4>
        <p>Schedule, post to multiple platforms, auto follow/unfollow, and use AI to curate posts!  </p>
      </div>

      <div class="dashboard-grid">

          <div class="dropdown-container">
            {
              this.RenderDropdownMenu()
            }

          </div>

          <div class="img-container">
            <img src = {DashImg}/>
          </div>

      </div>

    </section>
  )
  }
}


export default What;
