
export default class ApplicationFunctions {

  static hexValidator(length, prop) {
    return function e(err) {
      if (this[prop]) {
        if (typeof this[prop] !== 'string')  err();
        if (this[prop].length !== length)  err();
        const testPatt = new RegExp(`[0-9a-fA-F]{${length}}`);
        if (!testPatt.test(this[prop])) err();
      }
    };
  }

}
