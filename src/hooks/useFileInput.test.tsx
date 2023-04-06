import "@testing-library/jest-dom";
import { useRef, useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { FileInfo } from "@src/types/file";
import { useFileInput } from "@src/hooks/useFileInput";
import userEvent from "@testing-library/user-event";

URL.createObjectURL = () => "";

const FileInput = () => {
    const [fileData, setFileData] = useState<FileInfo[]>([]);
    const inptuRef = useRef<HTMLInputElement>(null);
    const { props, removeFiles } = useFileInput(
        fileData,
        setFileData,
        inptuRef
    );

    return (
        <>
            <input {...props} data-testid="input" />
            {fileData.map((file) => (
                <div onClick={() => removeFiles([file.id])} key={file.id}>
                    {file.name}
                </div>
            ))}
            <div onClick={() => removeFiles()} data-testid="remove-all" />
        </>
    );
};

describe("useFileInput", () => {
    const files: File[] = [
        new File([""], "chucknorris.png", { type: "image/png" }),
        new File([""], "duck.png", { type: "image/png" }),
        new File([""], "dog.png", { type: "image/png" })
    ];

    it("should correctly add and remove files", async () => {
        const screen = render(<FileInput />);
        const input = screen.getByTestId("input");

        fireEvent.change(input, { target: { files } });

        const elements = [
            screen.getByText("chucknorris.png"),
            screen.getByText("dog.png"),
            screen.getByText("duck.png")
        ];

        elements.forEach((element) => {
            expect(element).toBeInTheDocument();
        });

        await userEvent.click(elements[0]);

        expect(elements[0]).not.toBeInTheDocument();
        elements.splice(0, 1);

        const removeAllDiv = screen.getByTestId("remove-all");
        fireEvent.click(removeAllDiv);

        elements.forEach((element) => {
            expect(element).not.toBeInTheDocument();
        });
    });
});
