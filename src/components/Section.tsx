import { FC, ReactNode } from "react";
import sl from "./Section.module.scss";

type Props = {
    children: ReactNode;
    title: string;
};

export const Section: FC<Props> = ({ title, children }) => {
    return (
        <section className={sl.wrapper}>
            <h3 className={sl.title}>{title}</h3>
            {children}
        </section>
    );
};
