import emailjs from "emailjs-com";

export const sendEmailNotification = (email, name, orderId, newStatus) => {
  const templateParams = {
    to_email: email,
    to_name: name,
    order_id: orderId,
    order_status: newStatus,
  };

  emailjs
    .send(
      "YOUR_ACTUAL_SERVICE_ID",
      "YOUR_ACTUAL_TEMPLATE_ID",
      templateParams,
      "YOUR_ACTUAL_USER_ID"
    )
    .then((response) => {
      console.log("Email sent successfully!", response.status, response.text);
    })
    .catch((error) => {
      console.error("Failed to send email.", error);
    });
};
