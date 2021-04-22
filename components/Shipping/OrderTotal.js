import { useCartState } from "@/context/cart";
import { Flex, VStack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React from "react";

function OrderTotal() {
  const { line_items, subtotal, total_unique_items } = useCartState();
  return (
    <VStack spacing={3} justifyContent="space-between" width="100%">
      {line_items?.map((product) => {
        return (
          <Flex
            key={product.id}
            width="100%"
            fontWeight="normal"
            fontSize="md"
            justifyContent="space-between"
          >
            <chakra.span textColor="gray.600" fontWeight="normal">
              {product?.name}
            </chakra.span>
            <chakra.span textColor="gray.700">
              {product?.price.formatted} x{" "}
              <chakra.span fontWeight="semibold">
                {product?.quantity}
              </chakra.span>
            </chakra.span>
          </Flex>
        );
      })}

      <Flex
        fontWeight="normal"
        width="100%"
        fontSize="md"
        justifyContent="space-between"
      >
        <chakra.span textColor="gray.600" fontWeight="normal">
          Total Items:
        </chakra.span>
        <chakra.span>{total_unique_items}</chakra.span>
      </Flex>
      <Flex
        fontWeight="normal"
        width="100%"
        fontSize="md"
        justifyContent="space-between"
      >
        <chakra.span textColor="gray.600" fontWeight="normal">
          Total Amount:
        </chakra.span>
        <chakra.span>{subtotal?.formatted_with_symbol}</chakra.span>
      </Flex>
    </VStack>
  );
}

export default OrderTotal;
