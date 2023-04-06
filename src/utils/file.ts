import { FileInfo } from "@src/types/file";

let fileInfoId = 0;

export function getFileInfo(
    data: Pick<FileInfo, "name" | "src" | "srcFull" | "type">
): FileInfo {
    return {
        ...data,
        id: fileInfoId++,
        error: null,
        isLoading: false
    };
}
