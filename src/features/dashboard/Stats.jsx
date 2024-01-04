/* eslint-disable react/prop-types */

import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";

/* eslint-disable no-unused-vars */
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1) Number of bookings
  // console.log(bookings);
  const numBookings = bookings.length;

  // 2) Total sales

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupancyrate =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendar />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyrate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
