import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React from "react";

function VariantPicker({ variantGroups = [], defaultValues = {}, ...props }) {
  if (!variantGroups || variantGroups.length === 0) return null;

  return (
    <>
      {variantGroups.map(({ options, ...group }) => (
        <>
          <Box my={5}>
            <Text fontSize="xl" fontWeight="bold">
              Choose Size
            </Text>
            <ButtonGroup size="sm" colorScheme="gray" mt={2}>
              {options.map((option) => (
                <Button rounded="full"> {option.name}</Button>
              ))}
            </ButtonGroup>
          </Box>
        </>
      ))}
    </>
  );
}

export default VariantPicker;
