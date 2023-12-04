"use client";

import { useState } from "react";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/white-black-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "Jméno je povinné.")
    .max(255, "Jméno je příliš dlouhé."),
  lastName: z.string().max(255, "Příjmení je příliš dlouhé."),
  email: z.string().email("Neplatná e-mailová adresa."),
  message: z
    .string()
    .min(1, "Zpráva je povinná.")
    .max(1000, "Zpráva je příliš dlouhá."),
});

export default function MessageForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", message: "" },
  });

  const onSubmit = async (values: any) => {
    console.log(values);

    try {
      setLoading(true);
      const response = await axios.post("/api/messages", values);
      toast.success("Zpráva byla úspěšně odeslána." + response.data.message);
      reset();
    } catch (e) {
      toast.error(
        "Zprávu se nepodařilo odeslat. Zkuste se před odesláním přihlásit.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
    >
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* First Name Field */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Jméno
            </label>
            <div className="mt-2.5">
              <input
                disabled={loading}
                type="text"
                required
                id="firstName"
                autoComplete="given-name"
                {...register("firstName")}
                className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset ${
                  errors.firstName ? "ring-red-500" : "focus:ring-gray-200"
                } sm:text-sm sm:leading-6`}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">
                  {errors.firstName.message}
                </span>
              )}
            </div>
          </div>

          {/* Last Name Field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Přímení
            </label>
            <div className="mt-2.5">
              <input
                disabled={loading}
                type="text"
                id="lastName"
                autoComplete="family-name"
                {...register("lastName")}
                className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset ${
                  errors.lastName ? "ring-red-500" : "focus:ring-gray-200"
                } sm:text-sm sm:leading-6`}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                disabled={loading}
                type="email"
                required
                id="email"
                autoComplete="email"
                {...register("email")}
                className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset ${
                  errors.email ? "ring-red-500" : "focus:ring-gray-200"
                } sm:text-sm sm:leading-6`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Zpráva
            </label>
            <div className="mt-2.5">
              <textarea
                disabled={loading}
                id="message"
                required
                rows={6}
                {...register("message")}
                className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset ${
                  errors.message ? "ring-red-500" : "focus:ring-gray-200"
                } sm:text-sm sm:leading-6`}
                defaultValue={""}
              />
              {errors.message && (
                <span className="text-red-500 text-xs">
                  {errors.message.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            disabled={loading}
            type="submit"
            invert={true}
            className="mt-8"
          >
            Odeslat
          </Button>
        </div>
      </div>
    </form>
  );
}
