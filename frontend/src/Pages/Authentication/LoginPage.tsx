import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import type { LoginForm } from "../../Model/Forms";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../Components/ui/input";

interface Props {}

const validations = Yup.object({
  emailAddress: Yup.string()
    .required("Email address is required")
    .max(50, "Email too long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is not secure"),
});

const LoginPage = ({}: Props) => {
  const { loginUser, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(validations) });

  const onSubmit = (form: LoginForm) => {
    loginUser(form.emailAddress, form.password);
  };

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

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
            <CardTitle className="text-left">Login to your account</CardTitle>
            <CardDescription className="text-left">
              Enter your email and password to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">
                <Link to="/create-acc">Sign Up</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
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
                  {errors.emailAddress?.message && (
                    <span className="text-xs text-red-600 text-right dark:text-red-400">
                      {errors.emailAddress.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register("password")}
                  />
                  {errors.password?.message && (
                    <span className="text-xs text-red-600 text-right dark:text-red-400">
                      {errors.password?.message}
                    </span>
                  )}
                </div>
              </div>
              <CardFooter className="flex-col flex-1 gap-2 px-0 pt-6">
                <Button type="submit" className="w-full">
                  Log in
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
