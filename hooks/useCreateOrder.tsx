import { DateType } from "@/utils/dateUtils";
import { useMutation } from "@tanstack/react-query";

const URL = "https://example.com/order";
export const CREATE_ORDER_MUTATION_KEY = ["createOrder"];

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: CREATE_ORDER_MUTATION_KEY,
    mutationFn: async (data: DateType) => {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
  });
};
