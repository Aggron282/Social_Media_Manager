import LandingImg from "./../../imgs/landing_img.png"
import { Link } from 'react-router-dom';
import { useScrollAnimation } from "./../animator.js";

function Landing(){
  const ref = useScrollAnimation("fade-in-up", 300);


  return(
    <section class="landing-section" ref = {ref}>

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
            <Link to = "/login">
            <button class="signup btn"> Start Now! </button>
            </Link>
            <Link to ="/create_account"><button class="learn btn"> Learn More! </button>
            </Link>
          </div>

        </div>

    </section>

  )
}

export default Landing;
