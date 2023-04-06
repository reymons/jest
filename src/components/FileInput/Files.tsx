import { FC, useCallback, useRef } from "react";
import { FileInfo } from "@src/types/file";
import { File } from "./File";
import sl from "./Files.module.scss";

type Props = {
    fileData: FileInfo[];
    onRemove: (id: number) => void;
};

export const Files: FC<Props> = ({ fileData, onRemove }) => {
    const onRemoveRef = useRef(onRemove);
    onRemoveRef.current = onRemove;

    const handleRemove = useCallback((id: number) => {
        onRemoveRef.current(id);
    }, []);

    return (
        <ul className={sl.list} data-testid="list">
            {fileData.map((file) => (
                <File {...file} key={file.id} onRemove={handleRemove} />
            ))}
        </ul>
    );
};

Files.displayName = "Files";
