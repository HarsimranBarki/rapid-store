import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { HStack, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React from "react";

import { useForm } from "react-hook-form";

function Shipping({
  countries,
  subdivisions,
  setShippingData,
  checkoutId,
  setCurrentStep,
  setShippingValue,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setCurrentStep("payment");
    setShippingData(data);
  };
  return (
    <VStack spacing={5} mt={5} as="form" onSubmit={handleSubmit(onSubmit)}>
      <HStack spacing={5} width="100%">
        <FormControl id="name">
          <Input
            type="text"
            placeholder="First Name"
            rounded="none"
            variant="outline"
            {...register("firstName", { required: true })}
          />
        </FormControl>
        <FormControl id="name">
          <Input
            type="text"
            placeholder="Last Name"
            rounded="none"
            variant="outline"
            {...register("lastName", { required: true })}
          />
        </FormControl>
      </HStack>
      <FormControl id="name">
        <Input
          type="email"
          placeholder="Email"
          rounded="none"
          variant="outline"
          {...register("email", { required: true })}
        />
      </FormControl>
      <FormControl id="name">
        <Input
          type="text"
          placeholder="Address"
          rounded="none"
          variant="outline"
          {...register("address", { required: true })}
        />
      </FormControl>
      <HStack spacing={5} width="100%">
        {" "}
        <FormControl id="name">
          <Input
            variant="outline"
            type="text"
            placeholder="City"
            {...register("city", { required: true })}
            rounded="none"
          />
        </FormControl>
        <FormControl id="zip">
          <Input
            variant="outline"
            type="text"
            placeholder="Zip"
            {...register("zip", { required: true })}
            rounded="none"
          />
        </FormControl>
      </HStack>

      <HStack spacing={5} width="100%">
        <FormControl id="name">
          <Select
            variant="outline"
            {...register("shippingCountry", { required: true })}
            rounded="none"
            onChange={(e) => setShippingValue(checkoutId, e.target.value)}
          >
            {countries?.map((data, index) => {
              return (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl id="name">
          <Select
            variant="outline"
            rounded="none"
            {...register("shippingDivision", { required: true })}
          >
            {subdivisions?.map((data, idx) => {
              return (
                <option key={idx} value={data.value}>
                  {data.label}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </HStack>
      <Button
        width="100%"
        type="submit"
        mt={5}
        colorScheme="teal"
        rounded="none"
      >
        Pay Now
      </Button>
    </VStack>
  );
}

export default Shipping;
