export const Currency: React.FC<{ amount: number }> = ({ amount }) => {
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "accounting",
  });

  return <>{formattedAmount}</>;
};
