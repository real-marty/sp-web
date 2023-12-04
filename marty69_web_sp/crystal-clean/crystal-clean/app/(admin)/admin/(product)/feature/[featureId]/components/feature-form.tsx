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
import { Feature } from "@prisma/client";

const featureSchema = z.object({
  name: z.string().min(2, { message: "Vlastnost je povinná" }),
});

type FeatureFormValues = z.infer<typeof featureSchema>;

interface FeatureFormProps {
  initialData: Feature | null;
}

export const FeatureForm: React.FC<FeatureFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Upravit vlastnost" : "Vytvořit vlastnost";
  const description = initialData
    ? "Nyní upravujete vlastnost: "
    : "Nyní přidáváte novou vlastnost.";
  const toastMessage = initialData
    ? "vlastnost upravena."
    : "vlastnost vytvořena";
  const action = initialData ? "Uložit změny" : "Vytvořit";

  const form = useForm<FeatureFormValues>({
    resolver: zodResolver(featureSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
        }
      : {
          name: "",
        },
  });

  const onSubmit = async (data: FeatureFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/feature/${params.FeatureId}`, data);
      } else {
        await axios.post(`/api/feature`, data);
      }
      router.refresh();
      router.push(`/admin/feature`);
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
      await axios.delete(`/api/feature/${params.FeatureId}`);
      router.refresh();
      router.push(`/admin/feature`);
      toast.success("vlastnost smazána.");
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
                <div className="sm:col-span-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Vlastnost</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Čištění prémiovým čističem"
                            autoComplete="feature"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-800" />
                      </FormItem>
                    )}
                  />
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
