import { fireEvent, render, waitFor } from "@testing-library/react";
import { Counter } from "./Counter";
import userEvent from "@testing-library/user-event";

describe("Counter", () => {
    it("should increase", async () => {
        const screen = render(<Counter />);
        const count = screen.getByTestId("count");
        const initialCount = Number(count.textContent);
        await userEvent.click(screen.getByTestId("inc"));
        expect(Number(count.textContent)).toBe(initialCount + 1);
    });

    it("should descrease", async () => {
        const screen = render(<Counter />);
        const count = screen.getByTestId("count");
        const initialCount = Number(count.textContent);
        await userEvent.click(screen.getByTestId("dec"));
        expect(Number(count.textContent)).toBe(initialCount - 1);
    });

    it("should increase on file input click", async () => {
        const screen = render(<Counter />);
        const count = screen.getByTestId("count");
        const initialCount = Number(count.textContent);
        const input = screen.getByTestId("input");
        await waitFor(() => {
            return fireEvent.change(input, { target: { files: [] } });
        });
        expect(Number(count.textContent)).toBe(initialCount + 1);
    });
});
