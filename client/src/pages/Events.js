import TabEvent from "../components/TabEvent";
import EventCard from "../components/EventCard";
import { Button } from "@material-tailwind/react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import AddEvent from "../components/AddEventDialog";
import { useEffect } from "react";

export default function Events() {
  const navigate = useNavigate();
  useEffect(() => {
    if(!Cookies.get('token')){
      navigate('/signin')
    }
  })
  return (
    <div>
      {Cookies.get('role') !== "member" &&
        <div className="w-max space-x-4">
          
          <AddEvent />
          <br></br> <br></br>
        </div>
      }

      <div className="flex space-x-10">
        
      </div>
    </div>
  );
}
