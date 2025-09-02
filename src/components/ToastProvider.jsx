// "use client";

// import { createContext, useContext, useState } from "react";

// // 1️⃣ Create the context
// const ToastContext = createContext();

// // 2️⃣ Create the provider
// export function ToastProvider({ children }) {
//   const [toasts, setToasts] = useState([]);

//   // Function to add a toast
//   const addToast = (message, type = "info") => {
//     const id = Date.now(); // unique id
//     setToasts([...toasts, { id, message, type }]);

//     // Remove toast after 3 seconds
//     setTimeout(() => removeToast(id), 3000);
//   };

//   // Function to remove a toast
//   const removeToast = (id) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };

//   return (
//     <ToastContext.Provider value={{ addToast }}>
//       {children}

//       {/* Toast container */}
//       <div className="fixed top-5 right-5 space-y-2 z-50">
//         {toasts.map((toast) => (
//           <div
//             key={toast.id}
//             className={`px-4 py-2 rounded shadow text-white ${
//               toast.type === "success"
//                 ? "bg-green-500"
//                 : toast.type === "error"
//                 ? "bg-red-500"
//                 : "bg-gray-500"
//             }`}
//           >
//             {toast.message}
//           </div>
//         ))}
//       </div>
//     </ToastContext.Provider>
//   );
// }

// // 3️⃣ Hook to use toast easily
// export const useToast = () => useContext(ToastContext);

import React from "react";

function ToastProvider() {
  return <div></div>;
}

export default ToastProvider;
