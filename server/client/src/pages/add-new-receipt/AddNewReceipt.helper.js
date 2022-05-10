const { ToastNotificationWarning } = require("context/notification/NotificationClasses");

const InvalidReceiptWarningNotification = ToastNotificationWarning.bind(
  null,
  "Invalid receipt",
  "Make your you have added your articles correctly"
);

exports = {
  InvalidReceiptWarningNotification
}