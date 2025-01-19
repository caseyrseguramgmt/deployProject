import { useEffect, useState } from "react";
import { Container, Table, Thead, Tbody, Tr, Th, Td, TableCaption, VStack, Box, Heading, useColorModeValue, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [editedTask, setEditedTask] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const bg = useColorModeValue("rgba(255, 255, 255, 0.2)", "rgba(0, 0, 0, 0.3)");
    const boxShadow = useColorModeValue("0 4px 8px rgba(0, 0, 0, 0.2)", "0 4px 8px rgba(255, 255, 255, 0.3)");
    const backdropFilter = "blur(10px)";

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/tasks");
                const data = await response.json();
                if (data.success) {
                    setTasks(data.data);
                } else {
                    console.error("Failed to fetch tasks:", data.message);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Handle delete task
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success) {
                setTasks(tasks.filter((task) => task._id !== id));
            } else {
                alert("Failed to delete task: " + data.message);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Error deleting task. Check console for details.");
        }
    };

    // Handle edit task
    const handleEdit = (task) => {
        setEditingTask(task);
        setEditedTask(task);
        onOpen();
    };

    // Handle save edited task
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${editingTask._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedTask),
            });
            const data = await response.json();
            if (data.success) {
                setTasks(tasks.map((task) => (task._id === editingTask._id ? data.data : task)));
                onClose();
            } else {
                alert("Failed to update task: " + data.message);
            }
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Error updating task. Check console for details.");
        }
    };

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8} align="center">
                <Heading as="h1" size="2xl">
                    Task List
                </Heading>
                <Box overflowX="auto" w="full">
                    <Table variant="simple" bg={bg} boxShadow={boxShadow} backdropFilter={backdropFilter} rounded="md">
                        <TableCaption>List of Tasks</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Sprint</Th>
                                <Th>Description</Th>
                                <Th>Learned</Th>
                                <Th>Priority</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tasks.map((task) => (
                                <Tr key={task._id}>
                                    <Td>{task.sprint}</Td>
                                    <Td>{task.description}</Td>
                                    <Td>{task.learned}</Td>
                                    <Td>{task.priority}</Td>
                                    <Td>
                                        <Button
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => handleEdit(task)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            colorScheme="red"
                                            ml={2}
                                            onClick={() => handleDelete(task._id)}
                                        >
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </VStack>

            {/* Edit Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Sprint"
                                value={editedTask.sprint || ""}
                                onChange={(e) => setEditedTask({ ...editedTask, sprint: e.target.value })}
                            />
                            <Input
                                placeholder="Description"
                                value={editedTask.description || ""}
                                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            />
                            <Input
                                placeholder="Learned"
                                value={editedTask.learned || ""}
                                onChange={(e) => setEditedTask({ ...editedTask, learned: e.target.value })}
                            />
                            <Input
                                placeholder="Priority"
                                value={editedTask.priority || ""}
                                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default HomePage;
