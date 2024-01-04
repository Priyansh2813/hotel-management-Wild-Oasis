/* eslint-disable no-unused-vars */

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";

import ButtonText from "../../ui/ButtonText";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import { useBooking } from "../../features/bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import styled from "styled-components";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import CheckBox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { useCheckout } from "./useCheckout";

const Box = styled.div`
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isSettingLoading } = useSettings();
  const moveBack = useMoveBack();

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice + totalPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }
  useEffect(() => setConfirmPaid(booking?.isPaid || false), [booking]);

  // Can't use as initial state, because booking will still be loading

  if (isLoading || isSettingLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            chceked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          disabled={confirmPaid || isCheckingIn}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )}  (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in Booking #{bookingId}</Button>
        <Button onClick={moveBack}>Back</Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
