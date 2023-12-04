"use client";

import { useFrequencies } from "@/components/shop/data/frequencies";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCurrencyStore from "@/hooks/use-store-currency";

const CurrencySelect = () => {
  const { currency, setCurrency } = useCurrencyStore();
  const currencies = useFrequencies();

  const handleSelectChange = (selectedValue: string) => {
    // Find the currency object that matches the selected value
    const selectedCurrency = currencies.find((c) => c.value === selectedValue);
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
    }
  };

  return (
    <Select
      defaultValue={currency.value}
      value={currency.value}
      onValueChange={handleSelectChange}
    >
      <SelectTrigger className="items-cente rounded-md border-transparent bg-none text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800">
        <SelectValue defaultValue={currency.value} placeholder="Vyberte měnu" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {currencies.map((curr) => (
            <SelectItem key={curr.label} value={curr.value}>
              {curr.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
