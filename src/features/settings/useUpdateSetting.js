import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { reset } = useForm();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings sucessfully updated.");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      reset();
    },
    onError: (err) => toast.error(err?.message || "An error occurred"),
  });

  return { updateSetting, isUpdating };
}
