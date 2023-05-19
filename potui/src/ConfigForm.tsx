import {Boundary} from "./lib/boundary.ts";
import React from "react";
import {useForm} from "@mantine/form";
import {Button, TextInput} from "@mantine/core";

interface ConfigFormProperties {
    boundary: Boundary,
}
export const ConfigForm: React.FC<ConfigFormProperties> = ({boundary}) => {

    const form = useForm({
        initialValues: {
            apiKey: ""
        }
    });

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        boundary.remote("upate_config", form.values);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextInput
                    withAsterisk
                    label="API Key"
                    placeholder="Enter your api key"
                    {...form.getInputProps("apiKey")}
                />
                <Button type="submit">Submit</Button>
            </form>
        </>
    )

}