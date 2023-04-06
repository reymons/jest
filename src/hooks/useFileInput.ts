import { ChangeEvent, RefObject } from "react";
import { FileInfo } from "@src/types/file";
import { getFileInfo } from "@src/utils/file";

export const useFileInput = (
    fileData: FileInfo[],
    onChange: (fileData: FileInfo[]) => void,
    inputRef: RefObject<HTMLInputElement>
) => {
    return {
        props: {
            type: "file",
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (!files) {
                    return;
                }
                let src: string;
                const infos: FileInfo[] = [];
                for (const file of files) {
                    src = URL.createObjectURL(file);
                    infos.push(
                        getFileInfo({
                            name: file.name,
                            src,
                            srcFull: src,
                            type: file.type
                        })
                    );
                }
                onChange([...fileData, ...infos]);
            }
        },
        openFileExplorer: () => {
            inputRef.current?.click();
        },
        removeFiles: (ids?: number[]) => {
            if (ids) {
                onChange(fileData.filter((e) => !ids.includes(e.id)));
            } else {
                onChange([]);
            }
        }
    };
};
