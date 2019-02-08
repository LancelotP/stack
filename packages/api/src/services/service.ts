import { FZLLoaders, FZLViewer } from "../middlewares/context";
import { FindOneOptions, Repository, FindManyOptions } from "typeorm";

export abstract class BaseService<T> {
  abstract repo: Repository<T>;

  constructor(protected loaders: FZLLoaders, protected viewer: FZLViewer) {}

  findOne(options: FindOneOptions<T>) {
    return this.repo.findOne(options);
  }

  find(options: FindManyOptions<T>) {
    return this.repo.find(options);
  }
}
