type validateObjReturn = {
  isValid: boolean;
  error?: string;
};
/**
 * 
 * @param objToValidate string that needs to be validated
 * @param forbiddenCharactersRegexp regex expression, describes cahracters that are not allowed in object 
 * @param divider a symbol that divides key from value
 * @returns returns boolean value (valid/not valid) and error message if not valid
 */
export function validateObj(
  objToValidate: string,
  forbiddenCharactersRegexp: string,
  divider: string
): validateObjReturn {
  try {
    if (!divider) throw new Error("Divider is undefined");
    const objArr = objToValidate.split(divider);
    if (objArr.length !== 2) throw new Error("Invalid use of divider");
    const regexp = new RegExp(forbiddenCharactersRegexp);
    if (regexp.test(objArr[0]!) || regexp.test(objArr[1]!))
      throw new Error("Invalid charactes");
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: (error as Error).message };
  }
}

export type PairType = {
  key: string;
  value: string;
};
/**
 * 
 * @param objToValidate string that needs to be validated
 * @param forbiddenCharactersRegexp regex expression, describes cahracters that are not allowed in object 
 * @param divider a symbol that divides key from value
 * @returns parsed object {key:string, value:string}
 */
export function parseObject(
  objToValidate: string,
  forbiddenCharactersRegexp: string,
  divider: string
): { obj?: PairType; error?: string } {
  const result = validateObj(objToValidate, forbiddenCharactersRegexp, divider);
  if (result.isValid) {
    const [key, value] = objToValidate.split(divider);
    return { obj: { key: key!, value: value! } };
  } else {
    return { error: result.error! };
  }
}
