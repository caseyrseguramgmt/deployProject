import { Input, VStack, Container, Box, Button, Heading } from '@chakra-ui/react';
import { useState } from 'react';

const Add = () => {
    const [newTask, setNewTask] = useState({
        sprint: "",
        description: "",
        learned: "",
        priority: "",
    });

    const handleAddTask = () => {
        console.log(newTask);
    }

    return (
        <Container maxW={"container.md"}>
            <VStack spacing={6}>
                <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={6}>
                    Create New Task
                </Heading>
                
                <Box 
                w={"full"} 
                bg={"white"} 
                p={5} 
                rounded={"md"} 
                shadow={"lg"}
                >
                    <VStack spacing={4}>
                        <Input
                        placeholder='Sprint Number'
                        name='sprint'
                        value={newTask.sprint}
                        onChange={e => setNewTask({...newTask, sprint: e.target.value})}
                        />
                        <Input
                        placeholder='Description'
                        name='description'
                        value={newTask.description}
                        onChange={e => setNewTask({...newTask, description: e.target.value})}
                        />
                        <Input
                        placeholder='Learned'
                        name='learned'
                        value={newTask.learned}
                        onChange={e => setNewTask({...newTask, learned: e.target.value})}
                        />
                        <Input
                        placeholder='Priority Level'
                        name='priority'
                        value={newTask.priority}
                        onChange={e => setNewTask({...newTask, priority: e.target.value})}
                        />

                        <Button
                            color="white"
                            bgGradient="linear(to-r, red.400, pink.400)"
                            _hover={{
                                bgGradient: "linear(to-r, pink.400, red.400)",
                            }}
                            w='full'
                            onClick={handleAddTask}
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
