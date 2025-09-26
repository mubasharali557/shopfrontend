// "use client";

// import { usePathname } from "next/navigation";
// import Header from "./components/Header/page";
// import Footer from "./components/Footer/page";
// import { CartProvider } from "./context/CartContext";

// export default function LayoutWrapper({ children }) {
//   const pathname = usePathname();
//   const isAdminPage = pathname.startsWith("/AdminPage");

//   return (
//     <CartProvider>
//       {!isAdminPage && <Header />}
//       {children}
//       {!isAdminPage && <Footer />}
//     </CartProvider>
//   );
// }



"use client";

import { usePathname } from "next/navigation";
import Header from "./components/Header/page";
import Footer from "./components/Footer/page";
import { CartProvider } from "./context/CartContext";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/AdminPage");

  return (
    <CartProvider>
      {!isAdminPage && <Header />}
      {children}
      {!isAdminPage && <Footer />}
    </CartProvider>
  );
}
