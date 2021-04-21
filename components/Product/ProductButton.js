import { Button, IconButton } from "@chakra-ui/button";
import { Flex, HStack, Text, toast } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useCartDispatch, useCartState } from "@/context/cart";
import { useToast } from "@chakra-ui/toast";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import commerce from "@/lib/commerce";
import { MdDelete } from "react-icons/md";

function ProductButton({ name, id, quantity }) {
  const toast = useToast();
  const { setCart } = useCartDispatch();
  const [loading, setLoading] = useState(false);
  const handleUpdateCart = ({ cart }) => {
    setCart(cart);

    return cart;
  };

  const handleRemoveItem = () => {
    setLoading(true);
    commerce.cart
      .remove(id)
      .then(handleUpdateCart)
      .then(({ subtotal }) => {
        toast({
          title: `${name} has been removed from your cart`,
          description: `Your new subtotal is now ${subtotal.formatted_with_symbol}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const decrementQuantity = () => {
    quantity > 1
      ? commerce.cart
          .update(id, { quantity: quantity - 1 })
          .then(handleUpdateCart)
          .then(({ subtotal }) =>
            toast({
              title: `"${name}" has been removed from your cart`,
              description: `Your new subtotal is now ${subtotal.formatted_with_symbol}`,
              status: "success",
              duration: 9000,
              isClosable: true,
            })
          )
      : handleRemoveItem();
  };
  const incrementQuantity = () => {
    commerce.cart
      .update(id, { quantity: quantity + 1 })
      .then(handleUpdateCart)
      .then(({ subtotal }) =>
        toast({
          title: `Another "${name}" has been added to your cart`,
          description: `Your new subtotal is now ${subtotal.formatted_with_symbol}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      );
  };
  return (
    <Flex justifyContent="space-between" alignItems="center" mt={3}>
      <HStack spacing={5}>
        <IconButton
          variant="outline"
          size="xs"
          rounded="none"
          colorScheme="gray"
          aria-label="Add Item"
          onClick={() => incrementQuantity()}
          isDisabled={loading}
          icon={<AddIcon />}
        />
        <Text>{quantity}</Text>
        <IconButton
          variant="outline"
          rounded="none"
          size="xs"
          colorScheme="gray"
          onClick={() => decrementQuantity()}
          aria-label="Remove Item"
          isDisabled={loading}
          icon={<MinusIcon />}
        />
      </HStack>
      <Button
        rounded="none"
        leftIcon={<MdDelete />}
        size="sm"
        colorScheme="red"
        onClick={() => handleRemoveItem()}
      >
        Remove
      </Button>
    </Flex>
  );
}

export default ProductButton;
