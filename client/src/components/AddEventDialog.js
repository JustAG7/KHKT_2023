import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import Datepicker from "react-tailwindcss-datepicker";
 
export default function DialogWithForm() {
    const [open, setOpen] = React.useState(false);
    const [eventName, setEventName] = React.useState("");
    const [eventDescription, setEventDescription] = React.useState("");
    const [date,setDate] = React.useState(null);
    const [eventPassword, setEventPassword] = React.useState("");
    const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <>
      <Button onClick={handleOpen} color="teal">Add Event</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[25rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Add Event
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" size="lg" 
              required
              onChange={(e) => setEventName(e.target.value)}
            />
            <Input label="Password" type="password" size="lg"
              required
              onChange={(e) => setEventPassword(e.target.value)}
            />
            <Input label="Description" type="text" size="lg"
              onChange={(e) => setEventDescription(e.target.value)}
            />
            <Input label="Date" type="date" size="lg" 
              required
              onChange={(e) => 
                setDate(new Date(e.target.value).getTime())
              }
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" onClick={handleOpen} fullWidth>
              Add Event
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}