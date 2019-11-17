export function Association(association: IAssociation) {

  return (target: any, propertyName: string) => {

    addToIgnoredProperties(target, propertyName);

    (target._associations = target._associations || []).push({
      ...association,
      propertyName,
    });

  };

}

export function OneToMany(association: IAssociation) {

  return Association({...association, type: 'OneToMany'});

}

export function OneToOne(association: IAssociation) {

  return Association({...association, type: 'OneToOne'});

}

function addToIgnoredProperties(target: any, propertyName: string) {

  (target._ignore = target._ignore || []).push(propertyName);

}

export interface IAssociation {

  type?: 'OneToMany' | 'OneToOne' | 'ManyToMany';
  targetEntity: object;
  joinPropertyName?: string;
  propertyName?: string;
  joinOn?: string;

}


/*
interface OneToOne {
  targetEntity: Object; // Address
  joinPropertyName: string; // AddressID
  referencedPropertyName: string; // ID (default)
}

interface OneToMany {
  targetEntity: Object; // InvoiceLines
  joinPropertyName: string; // InvoiceID
  referencedPropertyName: string; // ID (default)
}

interface ManyToMany {
  targetEntity: Object; // Group
    mappingEntity: Object; // UserGroup
  joinPropertyName: string; // UserID
  referencedPropertyName: string; // ID (default)
    inverseJoinPropertyName: string; // GroupID
    inverseReferencedPropertyName: string; // ID (default)
}

*/

