import React from "react";

import {Group} from "@mantine/core";
import {MessageObject} from "./types.ts";
interface chatProps {
    message: string,
    setMessage:  React.Dispatch<React.SetStateAction<string>>,
    chatHistory: MessageObject[],
    sendMessage: (msg:string) => void
}
export const Chat: React.FC<chatProps> = ({message, setMessage, chatHistory, sendMessage }) => {

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage(message);
        setMessage("");
    }

    const watchForEnter = (event:React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            sendMessage(message);
            setMessage("");
        }
    }

    const handleInputChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }


    return (
    <>
        <Group position="left">
            {chatHistory.map((msg, index) => (
                <div key={index}>{msg.sender} says {msg.text}</div>
            ))}
        </Group>
        <Group className="control">
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
    </>
  )
}