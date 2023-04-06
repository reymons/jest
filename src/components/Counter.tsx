import { useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <div data-testid="dec" onClick={() => setCount(p => p - 1)}>
                -
            </div>
            <p data-testid="count">{count}</p>
            <div data-testid="inc" onClick={() => setCount(p => p + 1)}>
                +
            </div>
            <input
                type="file"
                data-testid="input"
                onChange={() => setCount(p => p + 1)}
            />
        </div>
    );
};
