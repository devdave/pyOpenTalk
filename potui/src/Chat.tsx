import React from "react";

import {Group} from "@mantine/core";
interface chatProps {
    message: string,
    setMessage:  React.Dispatch<React.SetStateAction<string>>,
    sendMessage: (msg:string) => void
}
export const Chat: React.FC<chatProps> = ({message, setMessage, sendMessage }) => {




    return (
    <>
        <Group className="control">

        </Group>
    </>
  )
}