import { DataAccessor } from './data-accessor';
import { Type } from '@angular/core';

export interface OrmOptions {

  dataAccessor: Type<DataAccessor>;
  entityPKName: string;

}
