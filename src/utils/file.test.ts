import { getFileInfo } from "@src/utils/file";

describe("getFileInfo", () => {
    it("should return unique id", () => {
        const info1 = getFileInfo({ name: "", src: "", type: "" });
        const info2 = getFileInfo({ name: "", src: "", type: "" });
        expect(info1.id).not.toEqual(info2.id);
    });
});
