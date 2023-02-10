import { Readable } from 'stream';
export declare const createDirectory: (directory: string) => void;
export declare const createReadStream: (path: string) => Readable;
export declare const downloadFile: (url: string) => Promise<{
    temporaryFileDirectory: string;
    temporaryFilePath: string;
}>;
export declare const removeDirectory: (directory: string) => void;
