import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabinMutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin Edited Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabinMutate };
}
