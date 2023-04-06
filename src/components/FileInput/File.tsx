import { memo } from "react";
import { FileInfo } from "@src/types/file";
import sl from "./File.module.scss";

type Props = FileInfo & {
    onRemove: (id: number) => void;
};

export const File = memo<Props>(
    ({ error, id, isLoading, name, src, type, srcFull, onRemove }) => {
        return (
            <li className={sl.wrapper} onClick={(e) => e.preventDefault()}>
                <img className={sl.img} src={src} data-testid={`img-${id}`} />
                <img
                    className={sl.cross}
                    src="/images/red-cross.png"
                    onClick={() => onRemove(id)}
                    data-testid={`cross-${id}`}
                />
            </li>
        );
    }
);

File.displayName = "File";
