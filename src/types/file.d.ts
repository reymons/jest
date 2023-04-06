export type FileInfo = {
    id: number;
    src: string;
    srcFull?: string;
    name: string | "Unknown file";
    type: string;
    isLoading: boolean;
    error: Error | null;
};
