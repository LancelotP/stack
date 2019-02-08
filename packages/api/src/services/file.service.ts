import { File } from "../models/file.entity";
import { getRepository } from "typeorm";
import { BaseService } from "./service";

export class FileService extends BaseService<File> {
  repo = getRepository(File);

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
