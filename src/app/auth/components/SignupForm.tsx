"use client";

import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { supabase } from "@/services/supabase";

interface SignupFormValues {
  phone: string;
  password: string;
}

export function SignupForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const form: UseFormReturnType<SignupFormValues> = useForm({
    initialValues: {
      phone: "",
      password: "",
    },

    validate: {
      phone: (val) =>
        /^\+?[1-9]\d{1,14}$/.test(val) ? null : t("invalid_phone"),
      password: (val) => (val.length >= 6 ? null : t("password_too_short")),
    },
  });

  const handleSubmit = async (values: SignupFormValues) => {
    setLoading(true);

    const { phone, password } = values;
    const { error } = await supabase.auth.signUp({ phone, password });

    if (error) {
      showNotification({ color: "red", message: t("auth_failed") });
    } else {
      showNotification({ color: "green", message: t("signup_success") });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          required
          label={t("phone")}
          placeholder={t("enter_phone")}
          {...form.getInputProps("phone")}
        />

        <PasswordInput
          required
          label={t("password")}
          placeholder={t("enter_password")}
          {...form.getInputProps("password")}
        />
      </Stack>

      <Button type="submit" radius="xl" mt="xl" loading={loading}>
        {t("signup")}
      </Button>
    </form>
  );
}
