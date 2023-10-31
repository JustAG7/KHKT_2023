  import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
export default function DialogWithForm() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [role, setRole] = React.useState("member");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const ipAddress = window.location.hostname;
  const handleOpen = () => setOpen((cur) => !cur);
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      username === "" ||
      password === "" ||
      email === "" ||
      date === null ||
      role === "" ||
      phone === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    // check if user is exist in Auths
    const existUser = await axios.get(
      `http://${ipAddress}:1991/api/auths/user?username=${username}`,
      { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
    );
    
    if (existUser.data !== null) {
      // console.log(existUser.data);
      alert("User is existed");
      return;
    }
    
    await axios.post(
        `http://${ipAddress}:1991/api/users`,
        {
          name,
          username,
          password,
          date,
          role,
          email,
          phone,
          avatar,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      )
      .then((res) => {
        alert("Add user successfully");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };
  return (
    <>
      <Button onClick={handleOpen} color="teal">
        Add Member
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[25rem]">
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={handleAddUser} className="flex flex-col gap-4">
              <Input
                label="Name"
                size="lg"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Username"
                type="text"
                size="lg"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                size="lg"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label="Date of birth"
                type="date"
                size="lg"
                required
                onChange={(e) => setDate(new Date(e.target.value).getTime())}
              />
              <Input
                label="Email"
                type="email"
                size="lg"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Phone"
                type="tel"
                size="lg"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <Select
                label="Role"
                value={role}
                onChange={(value) => {
                  setRole(value);
                }}
              >
                <Option value="admin">Admin</Option>
                <Option value="manager">Manager</Option>
                <Option value="member">Member</Option>
              </Select>
              <Input
                label="Avatar"
                type="file"
                size="lg"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
              />

              <Button
                type="submit"
                variant="gradient"
                onClick={handleOpen}
                fullWidth
              >
                Add Member
              </Button>
            </form>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
