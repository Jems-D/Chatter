import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
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
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../Components/ui/input";
import { useAuth } from "../../Context/useAuth";

interface Props {}

type LoginForm = {
  emailAddress: string;
  password: string;
};

const validations = Yup.object({
  emailAddress: Yup.string()
    .required("Email address is required")
    .max(50, "Email too long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is not secure"),
});

const LoginPage = ({}: Props) => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(validations) });

  const onSubmit = (form: LoginForm) => {
    loginUser(form.emailAddress, form.password);
    navigate("/");
  };

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
                  {errors.emailAddress?.message ?? (
                    <p>{errors.emailAddress?.message}</p>
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
                    <p>{errors.password?.message}</p>
                  )}
                </div>
              </div>
              <CardFooter className="flex-col gap-2">
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
