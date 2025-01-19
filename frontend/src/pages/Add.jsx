import { Input, VStack, Container, Box, Button, Heading, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [newTask, setNewTask] = useState({
        sprint: "",
        description: "",
        learned: "",
        priority: "",
    });

    const navigate = useNavigate();

    const handleAddTask = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });
            const data = await response.json();
            if (data.success) {
                setNewTask({ sprint: "", description: "", learned: "", priority: "" });
                navigate("/"); // Redirect to Home Page
            } else {
                alert("Failed to add task: " + data.message);
            }
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Error adding task. Check console for details.");
        }
    };

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
                        <Textarea
                        placeholder='Sprint Number'
                        name='sprint'
                        value={newTask.sprint}
                        onChange={e => setNewTask({...newTask, sprint: e.target.value})}
                        />
                        <Textarea
                        placeholder='Description'
                        name='description'
                        value={newTask.description}
                        onChange={e => setNewTask({...newTask, description: e.target.value})}
                        />
                        <Textarea
                        placeholder='Learned'
                        name='learned'
                        value={newTask.learned}
                        onChange={e => setNewTask({...newTask, learned: e.target.value})}
                        />
                        <Textarea
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
