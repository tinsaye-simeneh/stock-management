"use client";

import { useForm, UseFormReturnType } from "@mantine/form";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { supabase } from "@/services/supabase";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

interface SignupFormValues {
  phone: string;
  password: string;
}

export default function Signup() {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const form: UseFormReturnType<SignupFormValues> = useForm({
    initialValues: {
      phone: "",
      password: "",
    },
    validate: {
      phone: (value) =>
        /^\+?[1-9]\d{1,14}$/.test(value) ? null : t("invalid_phone"),
      password: (value) => (value.length >= 6 ? null : t("password_too_short")),
    },
  });

  const handleSignup = async (values: SignupFormValues) => {
    setLoading(true);
    const { phone, password } = values;

    const { error } = await supabase.auth.signUp({ phone, password });

    if (error) {
      showNotification({ color: "red", message: t("signup_failed") });
    } else {
      showNotification({ color: "green", message: t("signup_success") });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={form.onSubmit(handleSignup)}>
        <TextInput
          label={t("phone")}
          placeholder={t("enter_phone")}
          {...form.getInputProps("phone")}
        />
        <PasswordInput
          label={t("password")}
          placeholder={t("enter_password")}
          {...form.getInputProps("password")}
        />
        <Button type="submit" fullWidth mt="lg" loading={loading}>
          {t("signup")}
        </Button>
      </form>
    </div>
  );
}
