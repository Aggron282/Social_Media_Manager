import DashImg from "./../../imgs/dash_img.png"
import { useScrollAnimation } from "./../animator.js";

function Info(){
  const ref2 = useScrollAnimation("fade-in-up", 1000);
  const ref3 = useScrollAnimation("fade-in-up", 1200);
  const ref = useScrollAnimation("fade-in-up", 1200);
  return(
    <section class="info-section" >

        <div class="detail-container" ref ={ref}>

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

        <div class="detail-container" ref={ref2}>



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


        <div class="detail-container" ref={ref3}>

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
  )
}

export default Info;
