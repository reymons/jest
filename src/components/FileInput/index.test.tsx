import "@testing-library/jest-dom";
import { useState } from "react";
import { FileInput } from "@src/components/FileInput";
import { FileInfo } from "@src/types/file";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("FileInput", () => {
    let id = 0;
    global.window.URL.createObjectURL = () => "some-url" + id++;

    const files: File[] = [];

    beforeEach(() => {
        files.length = 0;
        files.push(new File([""], ""), new File([""], ""));
    });

    it("should render files", async () => {
        let data: FileInfo[] = [];

        const App = () => {
            const [fileData, setFileData] = useState<FileInfo[]>([]);
            return (
                <FileInput
                    fileData={fileData}
                    onChange={(d) => {
                        setFileData(d);
                        data = d;
                    }}
                />
            );
        };

        const screen = render(<App />);
        const input = screen.getByTestId("input");

        userEvent.upload(input, files);

        fireEvent.change(input, { target: { files } });

        expect(data.length).toBe(files.length);

        data.forEach((e) => {
            const img = screen.getByTestId(`img-${e.id}`);
            expect(img).toHaveAttribute("src", e.src);
        });
    });

    it("should render hint when no files", async () => {
        let data: FileInfo[] = [];

        const App = () => {
            const [fileData, setFileData] = useState<FileInfo[]>([]);
            return (
                <FileInput
                    fileData={fileData}
                    onChange={(d) => {
                        setFileData(d);
                        data = d;
                    }}
                />
            );
        };

        const screen = render(<App />);
        const input = screen.getByTestId("input");

        fireEvent.change(input, { target: { files } });

        await Promise.all(
            data.map((e) => {
                const cross = screen.getByTestId(`cross-${e.id}`);
                return userEvent.click(cross);
            })
        );

        expect(screen.getByTestId("hint")).toBeInTheDocument();
    });

    it("should correctly remove items", async () => {
        let data: FileInfo[] = [];

        const App = () => {
            const [fileData, setFileData] = useState<FileInfo[]>([]);
            return (
                <FileInput
                    fileData={fileData}
                    onChange={(d) => {
                        setFileData(d);
                        data = d;
                    }}
                />
            );
        };

        const screen = render(<App />);
        const input = screen.getByTestId("input");

        fireEvent.change(input, { target: { files } });

        expect(data.length).toBe(files.length);

        data.forEach((e) => {
            const cross = screen.getByTestId(`cross-${e.id}`);

            userEvent.click(cross).then(() => {
                expect(cross).not.toBeInTheDocument();
            });
        });
    });
});
