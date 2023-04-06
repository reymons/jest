import { ChangeEvent, FC } from "react";

type Props = Omit<
    JSX.IntrinsicElements["input"],
    "children" | "onChange" | "value"
> & {
    isValid?: boolean;
    onChange: (value: number, e: ChangeEvent<HTMLInputElement>) => void;
    value: number;
};

export const Input: FC<Props> = ({
    value,
    onChange,
    isValid,
    type = "text",
    ...rest
}) => {
    return (
        <input
            {...rest}
            type={type}
            value={value}
            onChange={(e) => {
                if (e.target.value === "") {
                    onChange(0, e);
                } else if (/^-?[0-9]+$/.test(e.target.value)) {
                    onChange(+e.target.value!, e);
                } else {
                    e.preventDefault();
                }
            }}
        />
    );
};
