import TabEvent from "../components/TabEvent";
import EventCard from "../components/EventCard";
import { Button } from "@material-tailwind/react";
import cookie from "cookie";

export default function Events() {
  const cookies = cookie.parse(document.cookie);
  return (
    <div>
      {cookies.role !== "member" &&
        <div className="w-max space-x-4">
          
          <Button variant="gradient" color="indigo">Add Event</Button>
          
          <br></br> <br></br>
        </div>
      }

      <div className="flex space-x-10">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
}
