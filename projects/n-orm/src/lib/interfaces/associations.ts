export interface IAssociation {
  type: 'OneToMany' | 'OneToOne' | 'ManyToMany';
  propertyName: string;

  targetEntity?: object; // Group
  mappingEntity?: object; // UserGroup
  joinPropertyName?: string; // UserID
  referencedPropertyName?: string; // ID (default)
  inverseJoinPropertyName?: string; // GroupID
  inverseReferencedPropertyName?: string; // ID (default)
}

export interface IOneToOne extends IAssociation {
  targetEntity: object;
  joinPropertyName: string;
  referencedPropertyName: string;
}

export interface IOneToMany extends IAssociation {
  targetEntity: object; // InvoiceLines
  joinPropertyName: string; // InvoiceID
  referencedPropertyName: string; // ID (default)
}

export interface IManyToMany extends IAssociation {
  targetEntity: object; // Group
    mappingEntity: object; // UserGroup
  joinPropertyName: string; // UserID
  referencedPropertyName: string; // ID (default)
    inverseJoinPropertyName: string; // GroupID
    inverseReferencedPropertyName: string; // ID (default)
}
