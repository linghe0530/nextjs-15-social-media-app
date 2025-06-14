"use client";

import { loginValues } from "@/lib/validation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";

export default function Page() {
  const [error, setError] = useState<string>();

  const [isPending, startTransition] = useTransition();
  const form = useForm<loginValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: loginValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await login(values);
      if (error) {
        setError(error);
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-destructive text-center">{error}</p>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  {...field}
                ></PasswordInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={isPending} type="submit" className="w-full">
          Create account
        </LoadingButton>
      </form>
    </Form>
  );
}
