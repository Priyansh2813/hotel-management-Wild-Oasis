// import styled from 'styled-components';

import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "../bookings/BookingRow";
import { useBookings } from "./useBookings";

function BookingTable() {
  const { bookings, count, isLoading } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resource={"bookings"} />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body>
          {bookings.map((booking) => (
            <BookingRow booking={booking} key={booking.id} />
          ))}
        </Table.Body>
      </Table>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default BookingTable;
