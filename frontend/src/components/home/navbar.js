import DashImg from "./../../imgs/dash_img.png"
import { Link } from 'react-router-dom';

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
      <Link to="/login" class="login-link">Login</Link>
      <Link to="/create_account" class="login-link">Create Account</Link>
    </div>
  </nav>
  )
}


export default Navbar;
