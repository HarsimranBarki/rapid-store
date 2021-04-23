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
import React from "react";
import OrderTotal from "./OrderTotal";
import commerce from "@/lib/commerce";

function Payment({ checkoutToken, setCurrentStep, shippingData }) {
  const stripePromise = loadStripe(
    `pk_test_51HRLfcGvtASXO12RzHg5XDVUuA04VJnfjXFappeXC5ZsXvnIFrbVsEl9K4qb6uwaZGcRD4Yao3S99bERNQrfJiGf00m4meZfoa`
  );
  const { reset } = useCheckoutDispatch();
  console.log(shippingData);
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      console.log("as", incomingOrder);

      reset;
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
          town_city: shippingData.city,
          county_state: shippingData.shippingDivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        // shipping: {
        //   name: shippingData.name,
        //   street: shippingData.address,
        //   town_city: shippingData.city,
        //   county_state: shippingData.shippingDivision,
        //   postal_zip_code: shippingData.zip,
        //   country: shippingData.country,
        // },
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
                  rounded="none"
                  onClick={() => setCurrentStep("shipping")}
                >
                  Back
                </Button>
                <Button
                  rounded="none"
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
