/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking(id) {
  const queryClient = useQueryClient();
  const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      toast.success("Booking is deleted");
    },
    onError: (err) => {
      toast.err(err.message);
    },
  });

  return { isDeletingBooking, deleteBooking };
}
