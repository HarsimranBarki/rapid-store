import { useCartState } from "@/context/cart";
import { useCheckoutDispatch, useCheckoutState } from "@/context/checkout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import OrderTotal from "./OrderTotal";
import commerce from "@/lib/commerce";

function Payment({ checkoutToken, setCurrentStep, shippingData,setOrderRescipt }) {
  const [order,setOrder] = useState()
  const stripePromise = loadStripe(
    `pk_test_51HRLfcGvtASXO12RzHg5XDVUuA04VJnfjXFappeXC5ZsXvnIFrbVsEl9K4qb6uwaZGcRD4Yao3S99bERNQrfJiGf00m4meZfoa`
  );
  const { reset } = useCheckoutDispatch();

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrderRescipt(incomingOrder)

      reset;
    } catch (error) {
      
    }
  };
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardEle = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardEle,
    });

    if (error) {
      
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: shippingData.name,
          street: shippingData.address,
          town_city: 'San Francisco',
          county_state: 'US-CA',
          postal_zip_code: '94103',
          country: 'US'
        },
       
        fullfillment: { shippingMethod: "Domestic" },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      handleCaptureCheckout(checkoutToken.id, orderData);
      setCurrentStep("success");
    }
  };
  return (
    <Box my={5}>
      <OrderTotal />
      <Box my={8}></Box>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <Text>Payment Method</Text>
              <Divider my={2} />
              <CardElement />

              <ButtonGroup
                variant="outline"
                mt={10}
                justifyContent="space-between"
                w="100%"
              >
                <Button
                  colorScheme="gray"
                  leftIcon={<ArrowBackIcon />}
                  rounded="lg"
                  onClick={() => setCurrentStep("shipping")}
                >
                  Back
                </Button>
                <Button
                  rounded="lg"
                  variant="solid"
                  type="submit"
                  colorScheme="teal"
                  disabled={!stripe}
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </ButtonGroup>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </Box>
  );
}

export default Payment;
