import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button } from "../../Components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../Components/ui/form";

import { Input } from "../../Components/ui/input";

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
  const form = useForm<RegisterForm>({ resolver: yupResolver(validations) });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default RegisterPage;
