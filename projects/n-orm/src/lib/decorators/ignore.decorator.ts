export function Ignore(target: any, propertyName: string) {

  (target._ignore = target._ignore || []).push(propertyName);

}
