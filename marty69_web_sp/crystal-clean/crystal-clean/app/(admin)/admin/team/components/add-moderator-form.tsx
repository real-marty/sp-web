"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";

const mailSchema = z.object({
  email: z.string().email("Neplatná e-mailová adresa."),
});

const AddModeratorForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(mailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      await axios.post("/api/role", values);
      toast.success("Moderátor byl úspěšně přidán.");
      setTimeout(() => {
        router.refresh();
      }, 1000);

      reset();
    } catch (error) {
      toast.error(
        "Moderátora se nepodařilo přidat, buď už existuje, nebo je email neplatný.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" grid grid-cols-1 gap-y-8 md:grid-cols-6">
      <div className="sm:col-span-4 mx-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-white"
          >
            Přidat moderátora pomocí emailu
          </label>
          <div className="my-2">
            <div
              className={`flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10
             focus-within:ring-2 focus-within:ring-inset`}
            >
              <input
                disabled={loading}
                type="text"
                id="email"
                {...register("email")}
                required
                className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="email nového moderátora"
                defaultValue={""}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md mt-2 bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            Přidat
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModeratorForm;
