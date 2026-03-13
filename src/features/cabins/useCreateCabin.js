import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { reset } = useForm();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: ({ newCabinData }) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success("New Cabin created Successfully.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err?.message || "An error occurred"),
  });

  return { createCabin, isCreating };
}
