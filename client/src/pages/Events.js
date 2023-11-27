import EventCard from "../components/EventCard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AddEvent from "../components/AddEventDialog";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const ipAddress = window.location.hostname;
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/signin");
    }
  });

  useEffect(() => {
    axios
      .get(`http://${ipAddress}:1991/api/events/`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        setEvents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <div>
      {Cookies.get("role") !== "member" && (
        <div className="w-max space-x-4">
          <br></br> <br></br>
        </div>
      )}

      <div className="flex space-x-10">
        {events.map((event) => (
          <EventCard
            key={event._id}
            name={event.name}
            description={event.description}
            date={event.date}
            password={event.password}
            id={event._id}
            isAccepted={event.participants.includes(Cookies.get("id"))}
          />
        ))}
      </div>
    </div>
  );
}
