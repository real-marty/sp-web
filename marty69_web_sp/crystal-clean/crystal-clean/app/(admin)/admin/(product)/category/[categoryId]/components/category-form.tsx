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
import { Category } from "@prisma/client";

const categorySchema = z.object({
  name: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky." }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData: Category | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Upravit kategorii" : "Vytvořit kategorii";
  const description = initialData
    ? "Nyní upravujete kategorii: "
    : "Nyní přidáváte novou kategorii.";
  const toastMessage = initialData
    ? "Kategorie upravena."
    : "Kategorie vytvořena";
  const action = initialData ? "Uložit změny" : "Vytvořit";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
        }
      : {
          name: "",
        },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/category/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/category`, data);
      }
      router.refresh();
      router.push(`/admin/category`);
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
      await axios.delete(`/api/category/${params.categoryId}`);
      router.refresh();
      router.push(`/admin/category`);
      toast.success("Něco se pokazilo.");
    } catch (error: any) {
      toast.error("Kategorie smazána.");
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
                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Název kategorie
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Jméno kategorie"
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
