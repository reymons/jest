import { FC, useRef } from "react";
import { useFileInput } from "@src/hooks/useFileInput";
import { FileInfo } from "@src/types/file";
import { Files } from "./Files";
import sl from "./index.module.scss";

type Props = {
    fileData: FileInfo[];
    onChange: (fileData: FileInfo[]) => void;
    accept?: JSX.IntrinsicElements["input"]["accept"];
    multiple?: boolean;
};

export const FileInput: FC<Props> = ({
    fileData,
    onChange,
    accept = ".jpg,.jpeg,.webp,.avif,.mp4,.avi,.gif",
    multiple = true
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { props, openFileExplorer, removeFiles } = useFileInput(
        fileData,
        onChange,
        inputRef
    );

    const hasFiles = !!fileData.length;

    return (
        <div
            className={sl.wrapper}
            onClick={(e) => !e.defaultPrevented && openFileExplorer()}
        >
            <input
                {...props}
                accept={accept}
                className={sl.input}
                ref={inputRef}
                multiple={multiple}
                data-testid="input"
            />
            {hasFiles ? (
                <Files
                    fileData={fileData}
                    onRemove={(id) => removeFiles([id])}
                />
            ) : (
                <p className={sl.hint} data-testid="hint">
                    Click here to upload your files
                </p>
            )}
        </div>
    );
};
