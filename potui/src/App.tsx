import './App.css'

import {Boundary} from "./lib/boundary.ts";
import {useState} from "react";
import {Button, Drawer, Flex, Group, Modal} from "@mantine/core";

import {MessageObject} from "./types.ts";
import {Chat} from "./Chat.tsx";
import {useDisclosure} from "@mantine/hooks";
import {ConfigForm} from "./ConfigForm.tsx";
import {GridProvider} from "@mantine/core/lib/Grid/Grid.context";



function App() {

    let boundary = new Boundary();
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<MessageObject[]>([]);
    const [opened, {open, close}] = useDisclosure(false);


    const sendMessage = () => {
        const newMessage = {sender: "user", text: message};
        setChatHistory([...chatHistory, newMessage]);
        try{
            boundary.remote("info", `asking remote: ${message} `);
        } catch (exc) {
            console.log(exc);
        }

        setMessage("");
    }


    return (
        <>
            <Modal
                    size="lg"
                    opened={opened}
                    onClose={close}
                    title="Settings"
                    overlayProps={{opacity: 0.5, blur: 4}}>
                <ConfigForm boundary={boundary}/>
            </Modal>
            <Flex mih={50}
                  gap="md"
                  justify="flex-start"
                  align="flex-start"
                  direction="column"
            >
                <Chat
                    sendMessage={sendMessage}
                    message={message}
                    setMessage={setMessage}
                    chatHistory={chatHistory}
                />
                <Group position="center">
                        <Button onClick={open}>Settings</Button>
                </Group>
            </Flex>
        </>
    )

}

export default App
