// TypeScript refers to this as an "indexable object", aka an object with dynamic key names
type classNamesObject = {
  [key: string]: boolean;
};

const classNames = (obj: classNamesObject): string => {
  const cls = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      cls.push(key);
    }
  }
  return cls.join(' ');
};

export default classNames;
