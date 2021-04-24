import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function VariantPicker({ variantGroups = [], defaultValues = {}, ...props }) {
  if (!variantGroups || variantGroups.length === 0) return null;

  return (
    <>
      {variantGroups.map(({ options, ...group }) => (
        <Box my={5} key={uuidv4()}>
          <Text fontSize="xl" fontWeight="bold">
            Choose Size
          </Text>

          <Select
            id={group.id}
            rounded="lg"
            size="sm"
            width="xs"
            mt={2}
            defaultValue={defaultValues[group.id]}
            className="appearance-none leading-none block w-full py-1 pr-6 pl-2"
            {...props}
          >
            {options.map((option, index) => (
              <option key={uuidv4()} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </>
  );
}

export default VariantPicker;
