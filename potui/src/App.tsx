import './App.css'

import {Boundary} from "./lib/boundary.ts";
import React, {useState} from "react";
import {AppShell, Button, Loader, Header, Footer, Group, Modal, Paper, ScrollArea} from "@mantine/core";


import {MessageObject} from "./types.ts";

import {useDisclosure} from "@mantine/hooks";
import {ConfigForm} from "./ConfigForm.tsx";


function App() {

    let boundary = new Boundary();
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<MessageObject[]>([]);
    const [opened, {open, close}] = useDisclosure(false);


    const sendMessage = () => {
        const newMessage = {sender: "user", text: message};
        setChatHistory([...chatHistory, newMessage]);
        try {
            boundary.remote("info", `asking remote: ${message} `);
        } catch (exc) {
            console.log(exc);
        }

        setMessage("");
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage();
        setMessage("");
    }

    const watchForEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
            setMessage("");
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }


    const footerContent = (
        <>
            <Group position="center">

                <form onSubmit={handleSubmit}>
                    <div className="promptBar">
                    <textarea id="textInput"
                              rows={2}
                              placeholder="Send a message."
                              onChange={handleInputChange}
                              onKeyDown={watchForEnter}
                              value={message}
                    />
                    </div>
                </form>

            </Group>
            <Group position="center"><Button onClick={open}>Settings</Button></Group>

        </>
    )

    return (
        <>

            <Modal
                withinPortal={false}
                opened={opened}
                onClose={close}
                title="Settings"
                overlayProps={{opacity: 0.5, blur: 4}}

            >
                <ConfigForm boundary={boundary}/>
            </Modal>

            <AppShell
                padding="md"
                header={<Header height={60} p="xs">Py Open Talk</Header>}
                footer={<Footer height="auto" p="xs">{footerContent}</Footer>}
                styles={(theme) => ({
                    main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
                })}
            >
                <ScrollArea type="auto" h="auto">
                    <Group position="left" style={{flexDirection: "column"}}>
                        {chatHistory.map((msg, index) => (
                            <Paper shadow="xs" radius="lg" p="md" withBorder>
                                <div key={index}>{msg.sender} says {msg.text}</div>
                            </Paper>
                        ))}
                    </Group>
                    <Group position="center" spacing="sm">
                        <Loader/>
                    </Group>
                </ScrollArea>


            </AppShell>

        </>
    )

}

export default App
