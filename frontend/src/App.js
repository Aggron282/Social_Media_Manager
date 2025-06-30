
import Homepage  from "./pages/home.js";
import Login  from "./pages/login.js";
import DashPage  from "./pages/dashpage.js";
import CreateAccount  from "./pages/create_account.js";
import PrivatePolicy  from "./pages/private_policy.js";
import TermsOfService  from "./pages/terms_of_service.js";

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
       <Route path="/private-policy" element={<PrivatePolicy />} />
       <Route path="/terms-of-service" element={<TermsOfService />} />

     </Routes>
   </div>
 </Router>
  )

}

export default App;
