import './App.css'

import {Boundary} from "./lib/boundary.ts";
import {useState} from "react";
import {Button, Drawer} from "@mantine/core";

import {MessageObject} from "./types.ts";
import {Chat} from "./Chat.tsx";
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
        try{
            boundary.remote("info", `asking remote: ${message} `);
        } catch (exc) {
            console.log(exc);
        }

        setMessage("");
    }


    return (
        <>
            <Drawer position="top"
                    size="lg"
                    opened={opened}
                    onClose={close}
                    title="Settings"
                    overlayProps={{opacity: 0.5, blur: 4}}>
                <ConfigForm boundary={boundary}/>
            </Drawer>
            <div>
                <Chat
                    sendMessage={sendMessage}
                    message={message}
                    setMessage={setMessage}
                    chatHistory={chatHistory}
                />
                <Button onClick={open}>Settings</Button>
            </div>

        </>
    )

}

export default App
