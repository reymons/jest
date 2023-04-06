import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";
import { useState } from "react";

describe("Input", () => {
    it("should correctly change value", async () => {
        const App = () => {
            const [value, setValue] = useState<number>(-1);
            return (
                <>
                    <Input value={value} onChange={setValue} />
                    <div data-testid="value">{value}</div>
                </>
            );
        };

        const screen = render(<App />);
        const input = screen.getByRole("textbox");
        await userEvent.type(input, "123");
        const div = screen.getByTestId("value");
        expect(div.textContent).toBe("-1123");
    });

    it("should be 0 if it's an empty string", async () => {
        const App = () => {
            const [value, setValue] = useState<number>(-1);
            return (
                <>
                    <Input value={value} onChange={setValue} />
                    <div data-testid="value">{value}</div>
                </>
            );
        };

        const screen = render(<App />);
        const input = screen.getByRole("textbox");
        await userEvent.type(input, "123");
        await userEvent.clear(input);
        const div = screen.getByTestId("value");
        expect(div.textContent).toBe("0");
    });

    it.todo("should change border color on valid");
});
