import toast from "react-hot-toast";
import { useBilling } from "../context/BillingContext";

export default function ResetButton() {
  const { resetBilling } = useBilling();

  const handleReset = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">
          Are you sure? Sab data clear ho jayega!
        </p>

        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => {
              resetBilling();
              toast.dismiss(t.id);
              toast.success("Bill Reset Successfully");
            }}
          >
            Yes
          </button>

          <button
            className="bg-gray-500 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ));
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