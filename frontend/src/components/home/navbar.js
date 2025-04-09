import DashImg from "./../../imgs/dash_img.png"

function Navbar(){
  return(<nav class="navbar">
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
  )
}


export default Navbar;
