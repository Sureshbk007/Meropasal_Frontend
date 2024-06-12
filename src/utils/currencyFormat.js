function currencyFormat(amount) {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return formattedNumber.replace("₹", "Rs ");
}

export default currencyFormat;
