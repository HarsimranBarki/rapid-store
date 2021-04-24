import Success from "@/components/Shipping/Success";
import { Grid } from "@chakra-ui/layout";
import React from "react";

function success() {
  return (
    <Grid height='300px' placeItems='center'>
      <Success />
    </Grid>
  );
}

export default success;
