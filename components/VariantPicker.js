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

            <Select
              id={group.id}
              size="sm"
              width="xs"
              mt={2}
              defaultValue={defaultValues[group.id]}
              className="appearance-none leading-none block w-full py-1 pr-6 pl-2"
              {...props}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </Box>
        </>
      ))}
    </>
  );
}

export default VariantPicker;
