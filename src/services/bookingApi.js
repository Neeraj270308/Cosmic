/**
 * Mock API Service to simulate booking submissions.
 */
export const mockSubmitBooking = (bookingData, forceFail = false) => {
  return new Promise((resolve, reject) => {
    // Simulate a 2.5 second network latency
    setTimeout(() => {
      // If forceFail is true, or with a 15% random chance, fail the booking
      if (forceFail || Math.random() < 0.15) {
        reject(new Error("We encountered a connectivity issue with our booking system. The reservation server is temporarily busy."));
      } else {
        // Generate a random 5 digit booking ID
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const serviceCode = bookingData.selectedService ? bookingData.selectedService.substring(0, 4).toUpperCase() : "APPT";
        const referenceId = `BK-${serviceCode}-${randomNum}`;

        resolve({
          success: true,
          referenceId,
          message: "Appointment successfully confirmed! An email and SMS confirmation have been sent to your contact details.",
          timestamp: new Date().toISOString()
        });
      }
    }, 2500);
  });
};
