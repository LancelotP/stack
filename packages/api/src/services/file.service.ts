import { File } from "../models/file.entity";
import { FindOneOptions, getRepository } from "typeorm";

export class FileService {
  constructor(private loaders: string[], private viewer?: File) {}

  findOne(options: FindOneOptions<File>) {
    return getRepository(File).findOne(options);
  }

  find(options: FindOneOptions<File>) {
    return getRepository(File).find(options);
  }

  async delete(fileId: number) {
    if (!this.viewer) {
      throw new Error();
    }

    const file = await this.findOne({ where: { id: fileId } });

    if (!file) {
      throw new Error();
    }

    await getRepository(File).remove(file);
    return file;
  }
}
