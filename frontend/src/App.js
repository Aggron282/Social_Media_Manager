
import Homepage  from "./pages/home.js";
import Login  from "./pages/login.js";
import DashPage  from "./pages/dashpage.js";
import CreateAccount  from "./pages/create_account.js";
import { BrowserRouter as Router,Routes,  Route, Switch, Link } from 'react-router-dom';
function App() {


  return (
  <Router>
   <div>

     <Routes>

       <Route path="/" element={<Homepage />} />
       <Route path="/login" element={<Login />} />
       <Route path="/create_account" element={<CreateAccount />} />
       <Route path="/dashboard/:id" element={<DashPage />} />

     </Routes>
   </div>
 </Router>
  )

}

export default App;
