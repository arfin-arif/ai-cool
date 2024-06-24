import Layout from "@/components/Layout";
import Details from "./Details";
import Form from "./Form";

// components/CheckoutForm.jsx

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      // Send the token to your server to handle the payment
      const response = await fetch("/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token.id }),
      });

      if (response.ok) {
        // Payment success: Display a success message or redirect to a thank-you page
        console.log("Payment successful!");
      } else {
        setError("Payment failed. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default CheckoutForm;

// const CheckoutPage = () => {
//     return (
//         <Layout backUrl="/pricing" smallSidebar hideRightSidebar>
//             <div className="px-15 py-12 2xl:px-10 2xl:py-14 xl:px-8 lg:pt-20 md:pt-5 md:px-6">
//                 <div className="max-w-[58.25rem] mx-auto">
//                     <div className="mb-4 h2 md:h3 md:pr-16">
//                         AI chat made affordable
//                     </div>
//                     <div className="body1 text-n-4 md:body2">
//                         Pricing Plans for every budget - Unlock the power of AI
//                     </div>
//                     <div className="flex justify-between mt-10 pt-16 border-t border-n-3 lg:block lg:mt-6 lg:pt-0 lg:border-0 md:mt-10 md:border-t md:pt-4 dark:border-n-5">
//                         <div className="w-full max-w-[20.375rem] lg:max-w-full lg:mb-8">
//                             <Details />
//                         </div>
//                         <div className="w-[29.875rem] xl:w-[29rem] lg:w-full">
//                             <Form />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default CheckoutPage;
