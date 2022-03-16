// TypeScript refers to this as an "indexable object", aka an object with dynamic key names
interface classNameParams {
  [key: string]: boolean;
}

export default function classNames(obj: classNameParams): string {
  const keys = Object.keys(obj);
  const classes = [];
  if (obj && keys.length) {
    for (let i = 0; i < keys.length; i++) {
      const className: string = keys[i] || '';
      if (obj[className]) {
        classes.push(keys[i]);
      }
    }
  }

  return classes.join(' ');
}
