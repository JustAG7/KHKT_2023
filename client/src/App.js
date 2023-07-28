import Header from "./components/Header"
import { Routes, Route, useLocation } from 'react-router-dom';
import SignIn from "./pages/signIn"
import SignUp from "./pages/signUp"
import Home from "./pages/Home"

export default function App() {
  const location = useLocation();
  return (
    <div className="w-full">
      {location.pathname!== "/signin" && <Header />  }
      <Routes>
        
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/home' element={<Home />} />

        {/* this is for Project page */}
        {/* <Route path="/projects/*">
            <Route path="" element={<Projects />} />
            <Route path=":id" element={<Project />} />
        </Route> */}
        

        {/* this is for Task page 
          The Tasks will contains all tasks from all project assigned to all users in the team
          Only admin or team manager can see this page

          The Task (idk if it's more likely a component or a page) will contains all tasks from a project assigned to all users in the team
          
        */}
        {/* <Route path="/tasks/*">

            <Route path="" element={<Tasks />} />
            <Route path=":id" element={<Task />} />
        </Route> */}
      </Routes>
    </div>
  )
}
