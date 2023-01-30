import { v4 as uuid } from 'uuid';
interface FileName {
  fileName: string;
  type: string;
}

export const generateFileName = (originalname: string): FileName => {
  const fileType = originalname.split('.');
  const newUuid = uuid().replace(/-/g, '');
  return {
    fileName: fileType ? `${newUuid}.${fileType[fileType.length - 1]}` : newUuid,
    type: fileType[fileType.length - 1],
  };
};
