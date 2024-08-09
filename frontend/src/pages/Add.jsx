import React from 'react';
import { Box, Button, Container, Heading, Input, Textarea, useColorModeValue, VStack } from '@chakra-ui/react';

const Add = () => {
    return (
        <Container maxW={"container.md"}>
            <VStack spacing={6}>
                <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={6}>
                    Create New Task
                </Heading>

                <Box
                    w={"full"}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    p={5}
                    rounded={"md"}
                    shadow={"lg"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Sprint Number"
                        />
                        <Textarea
                            placeholder="Task Description"
                        />
                        <Textarea
                            placeholder="Lessons Learned"
                        />
                        <Input
                            placeholder="Task Priority"
                        />

                        <Button
                            color="white"
                            bgGradient="linear(to-r, red.400, pink.400)"
                            _hover={{
                                bgGradient: "linear(to-r, pink.400, red.400)",
                            }}
                            w='full'
                        >
                            Submit
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default Add;
