import Header from "./components/Header"
import { Routes, Route, useLocation } from 'react-router-dom';
import SignIn from "./pages/signIn"
import SignUp from "./pages/signUp"
import Home from "./pages/Home"
import Manage from "./pages/Manage";
import Events from "./pages/Events";
import Sidebar from "./components/Sidebar";

export default function App() {
  const location = useLocation();
  return (
    <div className="w-full">
      {(location.pathname === "/home")  && <Header />  }
      {(location.pathname !== "/home") && (location.pathname !== "/signin") && <Sidebar />  } 
      <Routes>
        
        <Route path='/signin' element={<SignIn />} />
        

        <Route path='/home' element={<Home />} />

        <Route path="/event/*">
            <Route path="" element={<Events />} />
            <Route path=":id" element={<Events />} />
        </Route>

        <Route path="/manage/*">

            <Route path="" element={<Manage />} />
            <Route path=":id" element={<Manage />} />
        </Route>

        
      </Routes>
    </div>
  )
}
