"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Role, User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import type { User as NextUser } from "next-auth";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/profile-image-upload";
import Badge from "@/components/ui/badge";

const userSchema = z.object({
  name: z.string().refine((val) => val.length > 0, {
    message: "Jméno je povinné.",
  }),
  email: z
    .string()
    .email({ message: "E-mail musí být platná e-mailová adresa." }),
  image: z
    .union([z.string(), z.null()])
    .refine((val) => val !== null || typeof val === "string", {
      message: "Obrázek musí být řetězec nebo null.",
    }),
  role: z.nativeEnum(Role).refine((val) => Object.values(Role).includes(val), {
    message: "Role musí být platným členem výčtu 'Role'.",
  }),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData: User | null;
  user?: NextUser;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData, user }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const allowed = user?.role !== "SUPER_ADMIN" && user?.role !== "ADMIN";

  if (allowed) {
    router.push(`/admin`);
    toast.error("Nemáte dostatečná práva.");
  }

  const toastMessage = initialData
    ? "Uživatel byl upraven."
    : "Uživatel byl vytvořen.";
  const action = initialData ? "Uložit změny" : "Vytvořit";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          image: initialData.image,
          role: initialData.role,
        }
      : {
          name: "",
          email: "",
          image: null,
          role: Role.MODERATOR,
        },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/role/${params.userId}`, data);
      } else {
        await axios.post(`/api/role/${params.userId}`, data);
      }
      router.refresh();
      router.push(`/admin/team`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Něco se pokazilo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:col-span-2">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">
              Osobní informace
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Nastavení osobních informací a obrázku uživatele: "
              {initialData?.name}", data budou uložena pouze pro tuto stránku.
              Před povýšením na administrátora je nutné vyplnit všechny údaje.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full flex items-center gap-x-8">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Obrázek</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value ? [field.value] : []}
                          disabled={loading}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Jméno</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Jméno"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-3">
                <h2 className="block text-sm font-medium leading-6 text-white">
                  Datum vytvoření
                </h2>
                <div className="mt-2">
                  <h3 className="text-white">
                    {initialData?.createdAt.toLocaleDateString("cs-CZ")}
                  </h3>
                </div>
              </div>
              <div className="sm:col-span-3">
                <h2 className="block text-sm font-medium leading-6 text-white">
                  Datum poslední aktualizace
                </h2>
                <div className="mt-2">
                  <h3 className="text-white">
                    {initialData?.updatedAt.toLocaleDateString("cs-CZ")}
                  </h3>
                </div>
              </div>
              <div className="col-span-full">
                <h2 className="block text-sm font-medium leading-6 text-white">
                  Ověření emailu
                </h2>
                <div className="mt-2">
                  {initialData?.emailVerified ? (
                    <Badge color="green" text="Ověřeno" />
                  ) : (
                    <Badge color="red" text="Neověřeno" />
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <h2 className="block text-sm font-medium leading-6 text-white">
                  Stripe Customer ID
                </h2>
                <div className="mt-2">
                  <h3 className="text-red-700">
                    {initialData?.stripeCustomerId ?? "Nenastaveno"}
                  </h3>
                </div>
              </div>
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {user?.role === "SUPER_ADMIN" && (
                            <>
                              <SelectItem value="ADMIN">ADMIN</SelectItem>
                              <SelectItem value="SUPER_ADMIN">
                                SUPER_ADMIN
                              </SelectItem>
                              <SelectItem value="MODERATOR">
                                MODERATOR
                              </SelectItem>
                              <SelectItem value="USER">USER</SelectItem>
                            </>
                          )}
                          {user?.role === "ADMIN" && (
                            <>
                              <SelectItem value="MODERATOR">
                                MODERATOR
                              </SelectItem>
                              <SelectItem value="USER">USER</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-8 flex">
              <Button
                disabled={loading}
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                type="submit"
              >
                {action}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
