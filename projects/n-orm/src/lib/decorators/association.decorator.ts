import { IOneToMany, IAssociation, IOneToOne, IManyToMany } from '../interfaces';


function Association(association: Partial<IAssociation>) {

  return (target: any, propertyName: string) => {

    addToIgnoredProperties(target, propertyName);

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

function addToIgnoredProperties(target: any, propertyName: string) {

  (target._ignore = target._ignore || []).push(propertyName);

}
