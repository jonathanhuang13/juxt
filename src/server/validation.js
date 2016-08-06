
const strValidator = (s) => typeof s === 'string';
const numValidator = (s) => typeof s === 'number';
const boolValidator = (s) => typeof s === 'boolean';
const defaultOptions = { optional: false };

export default class Validator {
  constructor() {
    this.validations = [];
  }

  push(names, options, fns) {
    if (names instanceof Array) {
      for (const name of names) {
        this.validations.push({ name, fns, options });
      }
    } else {
      this.validations.push({ name: names, fns, options });
    }
  }

  str(names, options = defaultOptions) {
    this.push(names, options, [strValidator]);
    return this;
  }

  num(names, options = defaultOptions) {
    this.push(names, options, [numValidator]);
    return this;
  }

  bool(names, options = defaultOptions) {
    this.push(names, options, [boolValidator]);
    return this;
  }

  validate(obj) {
    for (const { name, fns, options } of this.validations) {
      const { optional = true } = options;

      if (!(name in obj)) {
        if (!optional) throw new Error(name);
        continue;
      }

      const val = obj[name];

      for (const fn of fns) {
        if (!fn(val)) throw new Error(name);
      }
    }
  }

  getColumns() {
    return this.validations.map(v => v.name);
  }
}

export function valid() {
  return new Validator();
}
