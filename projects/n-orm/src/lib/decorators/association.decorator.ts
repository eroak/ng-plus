import { IOneToMany, IAssociation, IOneToOne, IManyToMany } from '../interfaces';
import { Ignore } from './ignore.decorator';

function Association(association: Partial<IAssociation>) {

  return (target: any, propertyName: string) => {

    Ignore(target, propertyName);

    (target._associations = target._associations || []).push({
      ...association,
      propertyName,
    });

  };

}

export function OneToMany(association: IOneToMany) {

  return Association({...association, type: 'OneToMany'});

}

export function OneToOne(association: IOneToOne) {

  return Association({...association, type: 'OneToOne'});

}

export function ManyToMany(association: IManyToMany) {

  return Association({...association, type: 'ManyToMany'});

}
