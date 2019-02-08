import { User } from "../models/user.entity";
import { FindOneOptions, getRepository } from "typeorm";
import { FileService } from "./file.service";

export class UserService {
  private fileService: FileService;

  constructor(private loaders: string[], private viewer?: User) {
    this.fileService = new FileService(loaders, viewer);
  }

  findOne(options: FindOneOptions<User>) {
    return getRepository(User).findOne(options);
  }

  find(options: FindOneOptions<User>) {
    return getRepository(User).find(options);
  }

  async delete(userId: number) {
    if (!this.viewer) {
      throw new Error();
    }

    const user = await this.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error();
    }

    await getRepository(User).remove(user);
    return user;
  }
}
