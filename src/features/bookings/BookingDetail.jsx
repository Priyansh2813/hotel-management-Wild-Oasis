/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";

import ButtonText from "../../ui/ButtonText";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import ButtonGroup from "../../ui/ButtonGroup";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import Empty from "../../ui/Empty";
//import Empty from "ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();

  const { status, id: bookingId } = booking;

  const moveBack = useMoveBack();

  if (!booking) return <Empty resource="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
