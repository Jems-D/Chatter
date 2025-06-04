import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import "@fontsource/poppins/500.css";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";

interface Props {}

type RegisterForm = {
  username: string;
  emailAddress: string;
  password: string;
};

const validations = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username too short")
    .max(30, "Username too long"),
  emailAddress: Yup.string()
    .required("Email address is required")
    .max(50, "Email too long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is not secure"),
});

const RegisterPage = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: yupResolver(validations) });

  const onSubmit = (form: RegisterForm) => {};

  return (
    <div className="flex flex-col w-full h-[100vh] justify-center md:flex-row md:justify-between">
      <div className="flex flex-1">
        <h1 className="self-center text-5xl mb-10 font-poppins" id="chatter">
          CHATTER
        </h1>
      </div>
      <div className="flex-1 flex items-center w-100">
        <Card className="w-full max-w-sm align-middle">
          <CardHeader>
            <CardTitle className="text-left">Create an account</CardTitle>
            <CardDescription className="text-left">
              Enter you username, email, and password to create your account
            </CardDescription>
            <CardAction>
              <Button variant="link">
                <Link to="/sign-in">Sign in</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username" className="text-left">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="username"
                    placeholder="Chatter_01"
                    {...register("username")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-left">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("emailAddress")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Preferred Password</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Register
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
