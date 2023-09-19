import Header from "./components/Header";
import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./pages/signIn";
import Event from "./pages/Event";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Events from "./pages/Events";
import Sidebar from "./components/Sidebar";

export default function App() {
  const location = useLocation();
  return (
    <div className="w-full">
      {(location.pathname === "/") &&  <MainPage />}
      {(location.pathname === "/signin") && <SignIn />}
      {(location.pathname !== "/signin" ) && (location.pathname !== "/") && 
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            
            <Route path="/event/*">
              <Route path="" element={<Events />} />
              <Route path=":id" element={<Event />} />
            </Route>
            <Route path="/setting/*">
              <Route path="" element={<Setting />} />
              <Route path=":id" element={<Setting />} />
            </Route>
            
          </Routes>
        </div>
      </div>
      }
    </div>
  );
}
