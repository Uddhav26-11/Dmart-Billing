import { createContext, useContext, useState, useEffect } from "react";


const BillingContext = createContext();


const initialState = {
  customer: { name: "", gender: "" },
  items: [
    { name: "Item 1", quantity: 0 },
    { name: "Item 2", quantity: 0 },
    { name: "Item 3", quantity: 0 },
    { name: "Item 4", quantity: 0 },
    { name: "Item 5", quantity: 0 },
    { name: "Item 6", quantity: 0 },
    { name: "Item 7", quantity: 0 },
    { name: "Item 8", quantity: 0 },
    { name: "Item 9", quantity: 0 },
    { name: "Item 10", quantity: 0 },
  ],
  carryBag: false,
  billGenerated: false,
};

export function BillingProvider({ children }) {
  // localStorage se data lo — agar hai toh, warna initialState lo
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("dmartBilling");
    return saved ? JSON.parse(saved) : initialState;
  });

  // Har state change pe localStorage mein save karo
  useEffect(() => {
    localStorage.setItem("dmartBilling", JSON.stringify(state));
  }, [state]);

  // Customer update karo
  const updateCustomer = (customer) => {
    setState((prev) => ({ ...prev, customer }));
  };

  // Item ki quantity update karo
  const updateItemQuantity = (index, quantity) => {
    const newItems = [...state.items];
    newItems[index] = { ...newItems[index], quantity: Number(quantity) };
    setState((prev) => ({ ...prev, items: newItems }));
  };

  // Carry bag update karo
  const updateCarryBag = (value) => {
    setState((prev) => ({ ...prev, carryBag: value }));
  };

  // Bill generate karo
  const generateBill = () => {
    setState((prev) => ({ ...prev, billGenerated: true }));
  };

  // Reset — sab clear karo
  const resetBilling = () => {
    setState(initialState);
    localStorage.clear();
  };

  return (
    <BillingContext.Provider
      value={{
        state,
        updateCustomer,
        updateItemQuantity,
        updateCarryBag,
        generateBill,
        resetBilling,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
}

// Custom hook — easy access ke liye
export function useBilling() {
  return useContext(BillingContext);
}