"use client";

import { useForm } from "@mantine/form";
import { Stack, TextInput, PasswordInput, Button } from "@mantine/core";

export function LoginForm() {
  const form = useForm({
    initialValues: { phone: "", password: "" },
    validate: {
      phone: (val) =>
        /^\+?[1-9]\d{1,14}$/.test(val) ? null : "Invalid phone number",
      password: (val) =>
        val.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const handleSubmit = (values: { phone: string; password: string }) => {
    console.log("Form values:", values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Phone"
          placeholder="+1234567890"
          {...form.getInputProps("phone")}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" fullWidth>
          Login
        </Button>
      </Stack>
    </form>
  );
}
