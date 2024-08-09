import { Container, Table, Thead, Tbody, Tr, Th, Td, TableCaption, VStack, Box, Heading, useColorModeValue } from "@chakra-ui/react";

const HomePage = () => {
    // Fake data for demonstration
    const fakeData = [
        { id: 1, sprint: 'Sprint 1', description: 'Description 1', learned: 'Learned 1', priority: 'High' },
        { id: 2, sprint: 'Sprint 2', description: 'Description 2', learned: 'Learned 2', priority: 'Medium' },
        { id: 3, sprint: 'Sprint 3', description: 'Description 3', learned: 'Learned 3', priority: 'Low' },
    ];

    const bg = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(0, 0, 0, 0.3)');
    const boxShadow = useColorModeValue('0 4px 8px rgba(0, 0, 0, 0.2)', '0 4px 8px rgba(255, 255, 255, 0.3)');
    const backdropFilter = 'blur(10px)';

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8} align='center'>
                <Heading as="h1" size="2xl">
                    Fake Data
                </Heading>
                <Box overflowX='auto' w='full'>
                    <Table variant='simple' bg={bg} boxShadow={boxShadow} backdropFilter={backdropFilter} rounded='md'>
                        <TableCaption>Placeholder Data</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Sprint</Th>
                                <Th>Description</Th>
                                <Th>Learned</Th>
                                <Th>Priority</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {fakeData.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.sprint}</Td>
                                    <Td>{item.description}</Td>
                                    <Td>{item.learned}</Td>
                                    <Td>{item.priority}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </VStack>
        </Container>
    );
};

export default HomePage;
