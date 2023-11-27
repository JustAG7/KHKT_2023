import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function DialogDefault() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  const handleLeave = () => {
    const ipAddress = window.location.hostname;
    const idEvent = window.location.pathname.split("/")[2];

    //delete member from event with userId and idEvent
    axios
      .delete(`http://${ipAddress}:1991/api/events/${idEvent}/leave`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        data: { id: Cookies.get("id") },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/events");
      })
      .catch((err) => console.log(err));
    navigate("/event");
    setOpen(!open);
  };
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Leave Event
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Warning!.</DialogHeader>
        <DialogBody>
          Are you sure you want to continue with your action?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleLeave}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
