export interface IOneToOne {
  targetEntity: object;
  joinPropertyName: string;
  referencedPropertyName?: string;
}

export interface IOneToMany {
  targetEntity: object; // InvoiceLines
  joinPropertyName: string; // InvoiceID
  referencedPropertyName?: string; // ID (default)
}

export interface IManyToMany {
  targetEntity: object; // Group
    mappingEntity: object; // UserGroup
  joinPropertyName: string; // UserID
  referencedPropertyName?: string; // ID (default)
    inverseJoinPropertyName: string; // GroupID
    inverseReferencedPropertyName?: string; // ID (default)
}

export interface IAssociation extends Partial<IOneToMany>, Partial<IOneToOne>, Partial<IManyToMany> {
  type: 'OneToMany' | 'OneToOne' | 'ManyToMany';
  propertyName: string;
}
