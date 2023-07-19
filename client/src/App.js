import Header from "./components/Header"
import { Routes, Route, useLocation } from 'react-router-dom';
import SignIn from "./pages/signIn"

export default function App() {
  const location = useLocation();
  return (
    <div className="w-full">
      {location.pathname!== "/signin" && <Header />  }
      <Routes>
        
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  )
}
