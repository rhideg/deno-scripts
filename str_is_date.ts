


/**
 * Returns if the provided string is a date or not. (for reading json and setting type)
 * Supports yyyy-mm-dd (.,/,-)
 * @param str String input to test with regex.
 */
export function isDate(str:string): boolean {
   const regex = /^\d{4}(\/|-|\.)?((((0[13578])|(1[02]))(\/|-|\.)?(([0-2][0-9])|(3[01])))|(((0[469])|(11))(\/|-|\.)?(([0-2][0-9])|(30)))|(02(\/|-|\.)?[0-2][0-9]))$/;
   return regex.test(str);
}