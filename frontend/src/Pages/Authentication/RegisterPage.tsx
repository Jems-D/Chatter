import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
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

  const onSubmit = () => {};

  return (
    <div className="flex justify-between h-[100vh]">
      <div className="flex-1">
        <h1 className="self-center">Chatter</h1>
      </div>
      <div className="flex-1 items-center">
        <Card className="w-full max-w-sm align-middle">
          <CardHeader>
            <CardTitle className="text-left">Create an account</CardTitle>
            <CardDescription className="text-left">
              Enter you username, email, and password to create your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign in</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
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
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
