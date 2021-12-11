const intlObj = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });
export class Formats {
  static stringToNumber(str) {
    str = str.toString().replace(/[\,]/gm, '');
    return +str;
  }

  static toString(number) {
    return intlObj.format(number);
  }
}
