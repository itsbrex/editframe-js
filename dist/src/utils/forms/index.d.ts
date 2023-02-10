import FormData from 'form-data';
import { CompositionFile } from 'constant';
export declare const prepareFormData: (dataToAppend: [string, any][]) => FormData;
export declare const urlOrFile: (eitherBlobOrString: CompositionFile) => 'url' | 'file';
