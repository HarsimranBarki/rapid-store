import React, { useState } from "react";
import commerce from "@/lib/commerce";
import Head from "next/head";
import { Box, Divider, Flex, Grid, Heading, Text, toast } from "@chakra-ui/layout";
import Image from "next/image";
import HTMLReactParser from "html-react-parser";
import { Button } from "@chakra-ui/button";
import { motion } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import VariantPicker from "@/components/VariantPicker";
import RelatedProducts from "@/components/RelatedProducts";
import { useCartDispatch, useCartState } from "@/context/cart";
import { useToast } from "@chakra-ui/toast";
import { chakra } from "@chakra-ui/system";
import ProductButton from "@/components/Product/ProductButton";

export async function getStaticProps({ params }) {
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map(({ permalink }) => ({
      params: {
        permalink,
      },
    })),
    fallback: false,
  };
}

function Product({ product }) {
  const toast = useToast();
  const { setCart } = useCartDispatch();
  const [loading, setLoading] = useState(false);
  console.log(product)
  const {
    variant_groups: variantGroups,
    assets,
    meta,
    related_products: relatedProducts,
  } = product;
  const images = assets.filter(({ is_image }) => is_image);

  const initialVariants = React.useMemo(
    () =>
      variantGroups.reduce((all, { id, options }) => {
        const [firstOption] = options;

        return { ...all, [id]: firstOption.id };
      }, {}),
    [product.permalink]
  );

  const [selectedVariants, setSelectedVariants] = React.useState(
    initialVariants
  );

  React.useEffect(() => {
    setSelectedVariants(initialVariants);
  }, [product.permalink]);

  const handleVariantChange = ({ target: { id, value } }) =>
    setSelectedVariants({
      ...selectedVariants,
      [id]: value,
    });

  const addToCart = () => {
    setLoading(true);
    commerce.cart
      .add(product.id, 1, selectedVariants)
      .then(({ cart }) => {
        setCart(cart);
        return cart;
      })
      .then(({ subtotal }) => {
        setLoading(false);
        toast({
          title: `${product.name} is now in your cart.`,
          description: ` Your subtotal is now ${subtotal.formatted_with_symbol}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: "Please try again",
          description: `Something happend try again`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
const MotionGrid = motion(Grid)
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Head>
        <title>{product.name}</title>
      </Head>
      <Box py={10} bg="white" width="80vw" margin="auto">
        <Flex gridGap={10} justifyContent="center" py={10} width="100%">
        
          <MotionGrid
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            gridGap={2}
            height='500px'
            style={{ width: "100%" }}
            width='100%' gridTemplateColumns='repeat(2,400px)'
          >
          
              {product.assets.map((media) => {
                return  ( <Box
                rounded='lg'
                overflow='hidden'
                position="relative"
                height="full"
                width="400px"
                overflow="hidden"
              > <Image
                src={media.url}
                layout="fill"
                objectFit="cover"
              /> </Box>)
              })}
             
           
          </MotionGrid>
         

          <motion.div
            className="py-6 md:py-12 sticky top-0"
            initial={{ opacity: 0, x: 50 }}
            style={{ width: "100%" }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.25,
              },
            }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Flex
              direction="column"
              justifyContent="space-between"
              height="100%"
            >
              <Box>
                <Text fontWeight="bold" fontSize="4xl">
                  {product.name}
                </Text>
                <Text textColor="gray.500" mt={-1}>
                  Avalaibility:{" "}
                  <chakra.span textColor="black">In Stock</chakra.span>
                </Text>
                <Divider my={3} w='xs' />

                <Text fontWeight="bold" fontSize="2xl" textColor="black">
                  {product.price.formatted_with_symbol}
                </Text>

                <Divider my={3} w='xs'/>
                <VariantPicker
                  variantGroups={variantGroups}
                  defaultValues={initialVariants}
                  onChange={handleVariantChange}
                />
                <Text
                  fontWeight="normal"
                  textColor="gray.800"
                  fontSize="md"
                  ml={5}
                  mt={5}
                >
                  {HTMLReactParser(product.description)}
                </Text>
              </Box>

              <Button
                mt={5}
                w="xs"
                onClick={addToCart}
                leftIcon={<FiShoppingBag />}
               colorScheme='teal'
                isLoading={loading}
                textColor="gray.100"
                rounded="lg"
              
              >
                Add to Bag
              </Button>
            </Flex>
          </motion.div>
        </Flex>
        <Divider my={5} />
        <Box bg="white">
          <RelatedProducts products={relatedProducts} />
        </Box>
      </Box>
    </motion.div>
  );
}

export default Product;
