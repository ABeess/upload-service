import { v4 as uuid } from 'uuid';
interface FileName {
  fileName: string;
  type: string;
}

export const generateFileName = (originalname: string): FileName => {
  const fileExtension = originalname.split('.');
  const newUuid = uuid().replace(/-/g, '');

  return {
    fileName: fileExtension ? `${newUuid}.${fileExtension[fileExtension.length - 1]}` : newUuid,
    type: fileExtension[fileExtension.length - 1],
  };
};
