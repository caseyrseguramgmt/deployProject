import { Text, Button, Container, Flex, HStack } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";



const Header = () => {
    return (
        <Container maxW="1140px" px={4} py={2}>
            <Flex 
            h={16}
            alignItems="center"
            justifyContent="space-between"
            flexDir={{base: "column", sm: "row"}}
            >
                <Text
                fontSize={{ base: "22px", sm: "28px" }}
                fontWeight="bold"
                textTransform="uppercase"
                textAlign="center"
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
                >
                    <Link to="/">Jira Journal</Link>
                </Text>

                <HStack spacing={4} alignItems="center" mt={{ base: 2, sm: 0}}>
                    <Link to={"/add"}>
                    <Button>
                        <FaPlus fontSize={20} />
                    </Button>
                    </Link>
                    <Button>
                        <FaRegUser fontSize={20} />
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Header;
