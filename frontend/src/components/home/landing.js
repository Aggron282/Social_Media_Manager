import LandingImg from "./../../imgs/landing_img.png"

function Landing(){
  return(
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

  )
}

export default Landing;
