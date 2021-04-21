import React from "react";
import commerce from "@/lib/commerce";
import Head from "next/head";
import { Box, Flex, Heading, Text, toast } from "@chakra-ui/layout";
import Image from "next/image";
import HTMLReactParser from "html-react-parser";
import { Button } from "@chakra-ui/button";
import { motion } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import VariantPicker from "@/components/VariantPicker";
import RelatedProducts from "@/components/RelatedProducts";
import { useCartDispatch } from "@/context/cart";
import { useToast } from "@chakra-ui/toast";

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

  const addToCart = () =>
    commerce.cart
      .add(product.id, 1, selectedVariants)
      .then(({ cart }) => {
        setCart(cart);

        return cart;
      })
      .then(({ subtotal }) => {
        toast({
          title: `${product.name} is now in your cart.`,
          description: ` Your subtotal is now ${subtotal.formatted_with_symbol}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Please try again",
          description: `Something happend try again`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });

  console.log(product);
  return (
    <React.Fragment>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Box py={10} bg="white">
        <Flex gridGap={10} justifyContent="center" py={10} width="100%">
          <Box
            position="relative"
            height={400}
            width={400}
            rounded="lg"
            overflow="hidden"
          >
            <Image src={product.media.source} layout="fill" objectFit="cover" />
          </Box>
          <motion.div
            className="py-6 md:py-12 sticky top-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.25,
              },
            }}
            exit={{ opacity: 0, y: -50 }}
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

                <Text fontWeight="bold" fontSize="3xl" mt={0}>
                  {product.price.formatted_with_symbol}
                </Text>

                <VariantPicker
                  variantGroups={variantGroups}
                  defaultValues={initialVariants}
                  onChange={handleVariantChange}
                />
                <Text
                  fontWeight="light"
                  textColor="gray.800"
                  fontSize="md"
                  ml={5}
                  mt={5}
                >
                  {HTMLReactParser(product.description)}
                </Text>
              </Box>

              <Button
                onClick={addToCart}
                leftIcon={<FiShoppingBag />}
                colorScheme="teal"
              >
                Add to Bag
              </Button>
            </Flex>
          </motion.div>
        </Flex>
        <Box bg="white">
          <RelatedProducts products={relatedProducts} />
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Product;
