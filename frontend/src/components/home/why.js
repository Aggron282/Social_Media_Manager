import DashImg from "./../../imgs/dash_img.png"
import { useScrollAnimation } from "./../animator.js";

function Why(){


 const ref = useScrollAnimation("fade-in-up", 500);

  return (
    <section class="why-container" ref = {ref}>

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
  )
}

export default Why;
