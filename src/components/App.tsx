import { Section } from "./Section";
import { useState } from "react";
import { FileInput } from "./FileInput";
import { FileInfo } from "@src/types/file";
import sl from "./App.module.scss";
import { Input } from "./Input";

export const App = () => {
    const [fileData, setFileData] = useState<FileInfo[]>([]);
    const [value, setValue] = useState<number>(0);

    return (
        <main className={sl.wrapper}>
            <Section title="File Input">
                <FileInput fileData={fileData} onChange={setFileData} />
            </Section>
            <Section title="Input">
                <Input value={value} onChange={setValue} />
            </Section>
        </main>
    );
};
