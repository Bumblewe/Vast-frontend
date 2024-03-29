//components->MakePaymentComponent.js
import React from 'react'
import Button from "@/components/ui/button";

const MakePaymentComponent = () => {
    const makePayment = async () => {
        //console.log("here...");
        const res = await initializeRazorpay();
        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }
        // Make API call to the serverless API
        const data = await fetch("/api/razorpay",
        {
             method: "POST",
             headers: {
                'Content-Type': 'application/json',
            },
             body: JSON.stringify({
                taxAmt:34
             })
         }
        )
        .then((t) =>
          t.json()
        );
        //console.log(data);
        var options = {
          key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
          name: "Vast Wragger",
          currency: data.currency,
          amount: data.amount,
          order_id: data.id,
          description: "Thank you for shopping with us.",
          image: "./logo-black.png",
          handler: function (response) {
            // Validate payment at server - using webhooks is a better idea.
            alert("Razorpay Response: "+response.razorpay_payment_id);
            //alert(response.razorpay_order_id);
            //alert(response.razorpay_signature);
          },
          prefill: {
            name:"Vast Wragger",
            email:"vastwragger@gmail.com",
            contact:'9853785519'
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
      const initializeRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          // document.body.appendChild(script);

          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };

          document.body.appendChild(script);
        });
      }
  return (
    <div>
        <Button
          onClick={()=>makePayment()}
          className="w-full mt-6"
        >
          Checkout
        </Button>
    </div>
  )
}

export default MakePaymentComponent