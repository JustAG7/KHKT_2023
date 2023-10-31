import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Dialog, Input } from "@material-tailwind/react";

import CountDown from "./Countdown";

export default function EventCard(props) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(props.isAccepted);
  const ipAddress = window.location.hostname;
  const handleOpen = () => {
    if (open) {
      setOpen(false);
      setPassword("");
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://${ipAddress}:1991/api/events/${props.id}`,
        {
          password: password,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      )
      .then((res) => {
        axios.put(`http://${ipAddress}:1991/api/events/${props.id}`, {
          id: Cookies.get("id"),
        },{
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
        );
        setIsValidPassword(true);
        
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="ui/ux review check"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {props.name}
          </Typography>
        </div>
        <Typography color="gray">{props.description}</Typography>
        <Typography color="gray">Date: {props.date}</Typography>
        <CountDown date={props.date} />
      </CardBody>
      <CardFooter className="pt-3">
        {isValidPassword ? (
          <Link to={`/event/${props.id}`  }
            className=" text-white bg-gradient-to-tr from-green-800 to-green-900 hover:from-light-blue-600 hover:to-light-blue-700 px-4 py-2 rounded"
          >Go to Event Details</Link>
        ) : (
          <div>
            <Button onClick={handleOpen}>Join</Button>
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full max-w-[24rem]">
                <CardBody className="flex flex-col gap-4">
                  <form onSubmit={handleSubmit}>
                    <Input
                      label="Password"
                      size="lg"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="submit"
                      className="mt-10"
                      variant="gradient"
                      onClick={handleOpen}
                      fullWidth
                    >
                      Join
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Dialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
