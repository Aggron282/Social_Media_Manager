import React from "react";
import LandingImg from "./../imgs/landing_img.png"
import DashImg from "./../imgs/dash_img.png"
import Dropdown from "./../components/home/dropdown.js"
class Homepage extends React.Component{

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
      return (
        <div class="page">

        <nav class="navbar">
          <div class="navbar-left">
            <img src={DashImg} alt="Hootsuite" class="logo" />
          </div>

          <ul class="navbar-menu">
            <li><a href="#">Top features</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">Industries</a></li>
            <li><a href="#">Resources</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Enterprise</a></li>
          </ul>

          <div class="navbar-right">
            <a href="#" class="login-link">Log in</a>
            <a href="#" class="btn-primary">Start your free trial</a>
          </div>
        </nav>

          <section class="landing-section">

              <div class="img-container">
                <img src = {LandingImg} />
              </div>

              <div class="text-container">
                  <h1>
                    Save time and get real results on social media
                    <br/>
                    <strong>EchoPost Makes it Simple!</strong>
                  </h1>

                <div class="btn-container">
                  <button class="signup btn"> Start Now! </button>
                  <button class="learn btn"> Learn More! </button>
                </div>

              </div>

          </section>

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

          <section class="why-container">

            <h1 class="title">We will Echo your message! </h1>

            <div class="why-grid">
              <div class="why-item">
                <h1 class="why-strong">
                  80%
                </h1>
                <p class="description">
                Reduction in workload using Hootsuite’s chatbot capabilities
                </p>
              </div>
              <div class="why-item">
                <h1 class="why-strong">
                  500%
                </h1>
                <p class="description">
                Growth across all social channels using Hootsuite Enterprise
                </p>
              </div>
              <div class="why-item">
                <h1 class="why-strong">
                  10%
                </h1>
                <p class="description">
                New followers on social media using Hootsuite Enterprise
                </p>
              </div>

            </div>

          </section>

      <section class="info-section">


          <div class="detail-container">

            <div class="img-container">
              <img src = {DashImg} />
            </div>

            <div class='text-container'>
              <h2 class="title">Boost engagement, reach, and follower count with less effort</h2>
              <p class='description'>
                See the content that brings in the most engagement and revenue and measure how you’re performing against your competitors.
                Plus, get personalized suggestions for
                how to win in your industry.
                And, with reports that show you the best time to post for every network, you can say goodbye to hop-scotching between network tabs for good.
              </p>
              <button class="btn learn-more">
                Learn More
              </button>
            </div>

          </div>

          <div class="detail-container">



            <div class='text-container'>
              <h2 class="title">Boost engagement, reach, and follower count with less effort</h2>
              <p class='description'>
                See the content that brings in the most engagement and revenue and measure how you’re performing against your competitors.
                Plus, get personalized suggestions for
                how to win in your industry.
                And, with reports that show you the best time to post for every network, you can say goodbye to hop-scotching between network tabs for good.
              </p>

            </div>

            <div class="img-container">
              <img src = {DashImg} />
            </div>

          </div>


          <div class="detail-container">

            <div class="img-container">
              <img src = {DashImg} />
            </div>

            <div class='text-container'>
              <h2 class="title">Boost engagement, reach, and follower count with less effort</h2>
              <p class='description'>
                See the content that brings in the most engagement and revenue and measure how you’re performing against your competitors.
                Plus, get personalized suggestions for
                how to win in your industry.
                And, with reports that show you the best time to post for every network, you can say goodbye to hop-scotching between network tabs for good.
              </p>
            
            </div>

          </div>

      </section>
      </div>

      )
  }

}

export default Homepage;
