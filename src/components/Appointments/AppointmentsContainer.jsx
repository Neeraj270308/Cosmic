import React from "react";
import { useBooking } from "../../context/BookingContext";
import AppointmentsPresenter from "./AppointmentsPresenter";

function AppointmentsContainer() {
  const {
    appointmentsHistory,
    cancelAppointment
  } = useBooking();

  return (
    <AppointmentsPresenter
      appointments={appointmentsHistory}
      cancelAppointment={cancelAppointment}
    />
  );
}

export default AppointmentsContainer;