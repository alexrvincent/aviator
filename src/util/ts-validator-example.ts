// // This purpose of this file is to be a quick cheatsheet on basic TypeScript syntax
// // It's not production or app code (and contains many short examples that wouldn't pass ESLinting even if they are entirely valid code)

// // Comment this entire back in to check for TypeScript changes

// // I. Typing in Typescript

// // 1. By Inference: helloWorld has an inferred type of a string
// const helloWorld = 'Hello World';

// // 2. By Explicit Typing

// // 2a. using an object
// const user = {
//     name: 'Alex',
//     id: 0,
// };

// // 2b. using an interface (preferred)
// interface User {
//     name: string;
//     id: number;
// }

// // 2c. using an instantiation of interface (using 2b example)
// const userAlex: User = {
//     name: 'Alex',
//     id: 0,
// };

// // 2d. using an annotion for a function parameter
// // @ts-ignore - Remove this line to see the warning of unused value 'user'
// function deleteUsername(user: User) {
//     // ...
// }

// // 2d. using an annotation for a function parameter
// function getUser(): User {
//     return userAlex; // example supporting this
// }

// // 3. Type checking

// // 3a. against explict typing using object
// // typescript will throw a warning when you attempt to
// // instantiate a typing that doesn't match the typing defintion
// const userBadAlex: User = {
//     // Type '{ username: string; id: number; }' is not assignable to type 'User'.
//     // Object literal may only specify known properties, and 'username' does not exist in type 'User'.
//     // @ts-ignore - Remove this line to see the warning
//     username: 'Alex',
//     id: 0,
// };

// // 3a. against explicit typing using class instance
// class UserAccount {
//     name: string;
//     id: number;

//     constructor(name: string, id: number) {
//         this.name = name;
//         this.id = id;
//     }
// }

// const userAlexInstance: User = new UserAccount('Alex', 0);

// // 3b. against structural typing using an interface

// // we can define an explicit typing using an interface (or object)
// interface Point {
//     x: number;
//     y: number;
// }

// // reference / type check that typing as we may normally
// function printPoint(p: Point) {
//     console.log(`${p.x}, ${p.y}`);
// }

// // but not need an explicit instance of that type for the code to pass
// // Typescript evaluates the 'structure' of a type and can infer it's validity
// // based on that, even if the item was not initialized using the type
// // prints "12, 26"
// const point = { x: 12, y: 26 };
// printPoint(point);

// // it only need match a subset of the type as well. think of the
// // typing structure as a minimum required fields / organization
// // to make the typing work
// const rect = { x: 33, y: 3, width: 30, height: 80 };
// printPoint(rect); // prints "33, 3"

// const color = { hex: '#187ABF' };
// // fails because it doesn't match the point typing
// // @ts-ignore - Remove this line to see the warning
// printPoint(color);

// // 4. Composing types

// // 4a. via Unions
// type MyBool = true | false;

// // 4b. a practical example using Unions
// // popular use case is for static list of strings or numbers
// type WindowState = 'open' | 'closed' | 'minimized';
// type FibbonaciSequenceNumbersUnderTen = 0 | 1 | 2 | 3 | 5 | 8;

// // 4c. an example of type checking function parameters using Unions
// function getLength(obj: string | string[]) {
//     return obj.length;
// }

// // 4d. via simple typed data structures using Generics

// type StringArray = Array<string>;
// type NumberArray = Array<number>;
// type ObjectWithNameArray = Array<{ name: string }>;

// // 4e. via abstract interfaces using Generics

// // an abstract interface named "Backpack" that requires typing to instantiate
// interface Backpack<Type> {
//     add: (obj: Type) => void;
//     get: () => Type;
// }

// // an alias referring to a typed instance abstract interface
// // in this case, we're making a backpack of strings
// declare const backpackOfStrings: Backpack<string>;

// // here, we can expect the type to be a string to be enforced by the typing
// // of the abstract interface and method
// const stringFromBackpack = backpackOfStrings.get();

// // add method requires the typing of the parameter to be the same as the
// // instance's interface's typing when it was instantiated
// // @ts-ignore - Remove this line to see the warning
// backpackOfStrings.add(123);

// // II. TypeScript in React

// // See best practices here https://www.sitepoint.com/react-with-typescript-best-practices/
