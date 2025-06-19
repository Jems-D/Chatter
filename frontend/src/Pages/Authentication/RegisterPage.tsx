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
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

interface Props {}

type RegisterForm = {
  username: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Please confirm your password"),
});

const RegisterPage = ({}: Props) => {
  const { registerUser, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: yupResolver(validations) });

  const onSubmit = (form: RegisterForm) => {
    registerUser(form.username, form.emailAddress, form.password);
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
                  />
                  {errors?.username?.message && (
                    <span className="text-xs text-red-600 text-right dark:text-red-400">
                      {errors.username.message}
                    </span>
                  )}
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
                  />
                  {errors?.emailAddress?.message && (
                    <span className="text-xs text-red-600 text-right dark:text-red-400">
                      {errors.emailAddress.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Preferred Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors?.password?.message && (
                    <span className="text-xs text-red-600 text-right dark:text-red-400">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Confim Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {errors?.confirmPassword?.message && (
                    <span className="text-xs text-red-600 text-right dark:text-red-400">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <CardFooter className="flex-col flex-1 gap-2 px-0 pt-6">
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </CardFooter>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
