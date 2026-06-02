import { useBilling } from "../context/BillingContext";

export default function ResetButton() {
  const { resetBilling } = useBilling();

  const handleReset = () => {
    const confirm = window.confirm("Are you sure? Sab data clear ho jayega!");
    if (confirm) resetBilling();
  };

  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={handleReset}
        className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
      >
        🔄 Reset Bill
      </button>
    </div>
  );
}