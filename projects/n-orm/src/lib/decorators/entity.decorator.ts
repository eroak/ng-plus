export function Entity(params) {

  return (target: any) => {

    target._entityParams = params;

  };

}
