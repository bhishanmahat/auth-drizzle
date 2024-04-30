"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas/formSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "./card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });

    form.reset();
  };

  return (
    <CardWrapper
      cardTitle="Auth"
      cardDescription="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      disabled={isPending}
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      disabled={isPending}
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-end space-x-2">
            <Checkbox
              id="togglepwd"
              onCheckedChange={() => {
                setShowPassword(!showPassword);
              }}
            />
            <label
              htmlFor="togglepwd"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show password
            </label>
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button disabled={isPending} type="submit" className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
