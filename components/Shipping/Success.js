import { Button } from "@chakra-ui/button";
import { ArrowLeftIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Divider, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { chakra } from "@chakra-ui/system";
import Link from "next/link";
import React from "react";

function Success({order}) {

  if (!order) {
    return (
      <Box minH='100vh'>
        <Grid placeItems='center' height='md'>
          <Spinner/>
        </Grid>
      </Box>
    )
  }
  return (
    <Box mt={5}>
      <VStack width='100%' textAlign='left' justifyContent='flex-start' alignItems='flex-start'> 
      <Text fontSize='2xl'>Thank you for your purchase</Text>
      <Divider w='xs'/>
        <Text fontSize='xl '> <chakra.span textColor='gray.600'>Order Ref: {''}   </chakra.span>  {order?.customer_reference}</Text></VStack>
        <Link href='/' passHref>
          <Button colorScheme='teal' variant='outline' mt={5}  >Home</Button>
        </Link>
    </Box>
  );
}

export default Success;
