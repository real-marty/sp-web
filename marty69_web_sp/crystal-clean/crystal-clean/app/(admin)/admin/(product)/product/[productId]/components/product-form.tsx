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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Category,
  Color,
  Image,
  Product,
  Size,
  Specification,
  Feature,
} from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/product-image-upload";
import { Textarea } from "@/components/ui/textarea";

const productSchema = z.object({
  name: z.string().min(2, { message: "Název musí mít alespoň 2 znaky." }),
  description: z
    .string()
    .min(2, { message: "Popis musí mít alespoň 2 znaky." }),
  images: z.object({ url: z.string() }).array(),
  priceCZK: z.coerce.number().positive(),
  priceEUR: z.coerce.number().positive(),
  categoryId: z.string().nullable(),
  sizeId: z.string().nullable(),
  specificationId: z.string().nullable(),
  colorId: z.string().nullable(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  features: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        features: {
          featureId: string;
          feature: Feature;
        }[];
      })
    | null;
  sizes: Size[];
  colors: Color[];
  features: Feature[];
  specifications: Specification[];
  categories: Category[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
  specifications,
  features,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Upravit produkt" : "Vytvořit produkt";
  const description = initialData
    ? "Nyní upravujete produkt"
    : "Nyní přidáváte novou produkt.";
  const toastMessage = initialData ? "Produkt upraven." : "Produkt vytvořen.";
  const action = initialData ? "Uložit změny" : "Vytvořit";

  const defaultValues = initialData
    ? {
        ...initialData,
        priceCZK: parseFloat(String(initialData?.priceCZK)),
        priceEUR: parseFloat(String(initialData?.priceEUR)),
        features: initialData.features.map((f) => ({
          id: f.feature.id,
          name: f.feature.name,
          createdAt: f.feature.createdAt,
          updatedAt: f.feature.updatedAt,
        })),
      }
    : {
        name: "",
        description: "",
        images: [],
        priceCZK: 0,
        priceEUR: 0,
        categoryId: "",
        colorId: "",
        sizeId: "",
        features: [],
        specificationId: "",
        isFeatured: false,
        isArchived: false,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log(data);

    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/product/${params.productId}`, data);
      } else {
        await axios.post(`/api/product`, data);
      }
      router.refresh();
      router.push(`/admin/product`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/product/${params.productId}`);
      router.refresh();
      router.push(`/admin/product`);
      toast.success("Product deleted.");
    } catch (error: any) {
      toast.error("Something went wrong.");
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                {title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {description}
              </p>
            </div>
            <div className="md:col-span-2">
              <div>
                <div className="col-span-full flex items-center gap-x-8">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem className="text-white">
                        <FormLabel>Obrázky / Videa</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value.map((image) => image.url)}
                            disabled={loading}
                            onChange={(url) =>
                              field.onChange([...field.value, { url }])
                            }
                            onRemove={(url) =>
                              field.onChange([
                                ...field.value.filter(
                                  (current) => current.url !== url,
                                ),
                              ])
                            }
                          />
                        </FormControl>
                        <FormMessage className="text-red-800" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Základní informace
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Základní informace o produktu / službě
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Jméno produktu / služby
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Název produktu"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Popis produktu / služby
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="border-zinc-500 text-white"
                          placeholder="Popis"
                          {...field}
                          value={field.value}
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
                  name="priceCZK"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Cena CZK</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="250"
                          type="number"
                          autoComplete="price"
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
                  name="priceEUR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Cena EUR</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="9.99"
                          type="number"
                          autoComplete="price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Výběr kategorie a dalších informací
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Kategorie, barva, velikost, specifikace
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Vybrat Kategorii
                      </FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value ?? undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value ?? undefined}
                              placeholder="Kategorie"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="colorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Vybrat Barvu</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value ?? undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value ?? undefined}
                              placeholder="Barvy"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colors.map((color) => (
                            <SelectItem key={color.id} value={color.id}>
                              {color.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="sizeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Vybrat Velikost
                      </FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value ?? undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value ?? undefined}
                              placeholder="Velikosti"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size.id} value={size.id}>
                              {size.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="specificationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Vybrat Specifikace
                      </FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value ?? undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value ?? undefined}
                              placeholder="Specifikace"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specifications.map((specs) => (
                            <SelectItem key={specs.id} value={specs.id}>
                              {specs.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Výběr Publikace a Archivace
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Můžete publikovat produkt nebo ho archivovat, publikovaný
                produkt se zobrazí v nabídce produktů / služeb. Archivovaný
                produkt se přesune do archivu a nebude zobrazen v nabídce
                produktů / služeb.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow border-zinc-500">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none text-white">
                        <FormLabel>Publikovat produkt.</FormLabel>
                        <FormDescription className="pt-2">
                          Pokud chcete produkt publikovat zaškrtněte. Produkt se
                          pak zobrazí mezi produkty.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="isArchived"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow border-zinc-500">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none text-white">
                        <FormLabel>Archivovat produkt.</FormLabel>
                        <FormDescription className="pt-2">
                          Po zaškrtnutí se produkt přesune do archivu. Nebude
                          vidět v nabídce produktů / služeb.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Vlastnosti produktu / služby
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                vyberte všechny vlastnosti vašeho produktu / služby
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="features"
                  render={() => (
                    <FormItem className="text-white">
                      {features.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="features"
                          render={({ field }) => {
                            const currentValue = field.value || [];

                            // Check if the current item is selected
                            const isChecked = currentValue.some(
                              (value) => value.id === item.id,
                            );

                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        // Add this item object to the array
                                        field.onChange([
                                          ...currentValue,
                                          {
                                            id: item.id,
                                            name: item.name,
                                            createdAt: item.createdAt,
                                            updatedAt: item.updatedAt,
                                          },
                                        ]);
                                      } else {
                                        // Remove this item object from the array
                                        field.onChange(
                                          currentValue.filter(
                                            (value) => value.id !== item.id,
                                          ),
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage className="text-red-800" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Datumy vytvoření a poslední aktualizace
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
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
