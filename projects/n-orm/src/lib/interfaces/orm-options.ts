import { DataAccessor } from './data-accessor';

export interface OrmOptions {

  dataAccessor: DataAccessor;
  entityPKName: string;

}

