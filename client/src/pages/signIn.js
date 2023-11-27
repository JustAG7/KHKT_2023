import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/home");
    }
  }, []);

  function handleSubmit(e) {
    const ipAddress = window.location.hostname;
    console.log(ipAddress);
    e.preventDefault();
    const qs = require("qs");
    let data = qs.stringify({
      username: e.target.email.value,
      password: e.target.password.value,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: !process.env.API_URI
        ? `http://${ipAddress}:1991/api/auths/login`
        : process.env.API_URI + "/api/auths/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        const jwt = res.headers.authorization.split(" ")[1];
        Cookies.set("token", jwt, { expires: 7 });
        Cookies.set("role", res.data.role, { expires: 7 });
        Cookies.set("id", res.data.id, { expires: 7 });

        navigate("/home");
      })
      .catch((err) => {
        alert(err);
        if (err.response.status === 401) {
          alert("Incorrect username or password");
        }
        if (err.response.status === 500) {
          alert("Server error");
        }
        if (err.response.status === 400) {
          alert("Bad request");
        }
        if (err.response.status === 404) {
          alert("User not found");
        }
      });
  }

  // END: abpxx6d04wxr
  if (Cookies.get("token"))
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div className="flex justify-evenly items-center  h-screen">
      <div className="flex justify-center items-center w-full max-w-md">
        <img src="Z.png" alt="Logo" className="w-100 h-100 mr-4" />
      </div>
      <Card className="flex max-w-md">
        <CardHeader
          variant="gradient"
          color="indigo"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" name="email" />
            <Input type="password" label="Password" size="lg" name="password" />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
            <Button type="submit" variant="gradient" color="indigo" fullWidth>
              Sign In
            </Button>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}
