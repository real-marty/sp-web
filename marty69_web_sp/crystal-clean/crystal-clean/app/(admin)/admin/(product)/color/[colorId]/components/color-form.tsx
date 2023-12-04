"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/alert-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Color } from "@prisma/client";

const colorSchema = z.object({
  name: z.string().min(2, { message: "Název musí mít alespoň 2 znaky." }),
  value: z
    .string()
    .min(4)
    .max(7)
    .regex(/^#/, { message: "Řetězec není platný hex barvy" }),
});

type ColorFormValues = z.infer<typeof colorSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Upravit barvu" : "Vytvořit barvu";
  const description = initialData
    ? "Nyní upravujete barvu"
    : "Nyní přidáváte novou barvu.";
  const toastMessage = initialData ? "Barva upravena." : "Barva vytvořena";
  const action = initialData ? "Uložit změny" : "Vytvořit";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          value: initialData.value,
        }
      : {
          name: "",
          value: "",
        },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/color/${params.colorId}`, data);
      } else {
        await axios.post(`/api/color`, data);
      }
      router.refresh();
      router.push(`/admin/color`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Něco se pokazilo.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/color/${params.colorId}`);
      router.refresh();
      router.push(`/admin/color`);
      toast.success("Barva smazána.");
    } catch (error: any) {
      toast.error("Něco se pokazilo.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:col-span-2">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                {title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {description}
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Název</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="např. Červená"
                            autoComplete="title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-800" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Hodnota hex.
                        </FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Input
                              disabled={loading}
                              placeholder="hex barva"
                              autoComplete="color"
                              {...field}
                            />
                            <div className="flex items-center mx-2 px-[.2rem] rounded-full border-2 border-white">
                              <div
                                className="w-7 h-7 rounded-full"
                                style={{ backgroundColor: field.value }}
                              />
                            </div>
                          </div>
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
              </div>
              <div className="mt-8 flex pt-5 space-x-5">
                <Button
                  disabled={loading}
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  type="submit"
                >
                  {action}
                </Button>
                {initialData && (
                  <Button
                    disabled={loading}
                    onClick={() => setOpen(true)}
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                    type="button"
                  >
                    Smazat
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
