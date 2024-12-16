export function formatCurrency(number) {
  return (Math.round(number) / 100).toFixed(2);
}