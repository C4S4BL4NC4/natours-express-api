[[Node.js]]

# TypeScript — Quick Reference (for JavaScript devs)

> A compact, opinionated Obsidian-friendly cheat-sheet that highlights _what matters_ when you already know JavaScript. Copy, search, and pin this note in your vault.

---

## Table of contents

1. Basic concepts (types, inference, `any`, `unknown`)
    
2. Primitives & special types
    
3. Type annotations — variables, functions
    
4. Object types: `interface` vs `type`
    
5. Advanced types: union, intersection, tuple, literal, mapped, conditional
    
6. Generics
    
7. Type narrowing & guards
    
8. Classes & modifiers
    
9. Modules, imports, exports, `tsconfig.json` essentials
    
10. Utility types you’ll use daily
    
11. Interop with JS: `.d.ts`, `@ts-ignore`, `esModuleInterop`
    
12. Tooling tips & recommended compiler flags
    
13. Quick recipes
    

---

# 1. Basic concepts

- TypeScript = JavaScript + types + compile-time checking. It compiles to JS.
    
- Types exist only at compile time (erased at runtime). Think of TS as the _editor/compile-time layer_ to catch errors early.
    
- **Type inference**: TS often infers types — add explicit annotations when intent matters or inference is unclear.
    

```ts
let x = 3;      // inferred number
let arr = [1];  // inferred number[]
```

- `any` disables checks (escape hatch). Use sparingly. `unknown` is safer than `any` — you must narrow before using.
    

```ts
let a: any;
let u: unknown;

// any: no checks
a.trim();

// unknown: must narrow
if (typeof u === 'string') {
  u.trim();
}
```

---

# 2. Primitives & special types

- `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`
    
- `void` — for functions returning nothing (JS `undefined` at runtime)
    
- `never` — function that never returns (throws or infinite loop)
    
- `object` — non-primitive (rarely used; prefer explicit shapes)
    
- `unknown`, `any` — described above
    

---

# 3. Type annotations

### Variables

```ts
let name: string = 'Ada';
const count: number = 42;
let maybe: string | undefined; // union type
```

### Functions (params + return)

```ts
function add(a: number, b: number): number {
  return a + b;
}

// with optional and default params
function greet(name: string, title?: string): string {
  return `Hello ${title ? title + ' ' : ''}${name}`;
}

function pow(x: number, p = 2) {
  return x ** p; // inferred number
}
```

### Arrow functions + inferred return

```ts
const mul = (a: number, b: number) => a * b; // return inferred
```

### Function overloads (rare but useful for libs)

```ts
function parse(x: string): number;
function parse(x: number): string;
function parse(x: any){
  // single implementation
}
```

---

# 4. Object types: `interface` vs `type`

Both create object shapes — use whichever reads better. `type` is more general (aliases, unions, mapped types); `interface` is extendable/mergeable.

```ts
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

type Point = { x: number; y: number };

// extending
interface Admin extends User { role: string }
type P2 = Point & { z: number }; // intersection
```

- Index signatures:
    

```ts
type Dict = { [k: string]: number };
```

- Readonly / `as const`:
    

```ts
type R = Readonly<User>;
const foo = { a: 1 } as const; // literal-preserving & readonly
```

---

# 5. Advanced types (day-to-day)

### Unions

```ts
type ID = string | number;
function f(x: ID){
  if (typeof x === 'string') x.toUpperCase();
}
```

### Intersections

```ts
type A = { a: string } & { b: number };
```

### Tuples

```ts
let t: [string, number] = ['ok', 1];
// destructuring has types
const [s, n] = t; // s: string, n: number
```

### Literal types

```ts
type Dir = 'up' | 'down' | 0;
```

### Mapped types (basic)

```ts
type Nullable<T> = { [K in keyof T]: T[K] | null };
```

### Conditional types (concept)

```ts
type Id<T> = T extends string ? string : number;
```

---

# 6. Generics

Generics let types be parameterized.

```ts
function identity<T>(x: T): T { return x }

// generic type alias
type Box<T> = { value: T };

// constrained generic
function len<T extends { length: number }>(x: T) { return x.length; }
```

Common patterns: generic React props, utility wrappers, factory functions.

---

# 7. Type narrowing & user-defined guards

- Narrow with `typeof`, `instanceof`, `in`, discriminant property, array checks.
    

```ts
function isString(x: unknown): x is string {
  return typeof x === 'string';
}

function handle(v: string | number | { tag: 'ok' }) {
  if (typeof v === 'string') {}
  else if (typeof v === 'number') {}
  else if (v.tag === 'ok') {}
}
```

- Discriminated unions are powerful for switch/case patterns.
    

```ts
type R =
  | { kind: 'text'; text: string }
  | { kind: 'image'; url: string };

function render(r: R){
  switch(r.kind){
    case 'text': return r.text;
    case 'image': return `<img src=${r.url}>`;
  }
}
```

---

# 8. Classes & modifiers

TypeScript classes are like JS classes plus types and access modifiers.

```ts
class Point {
  constructor(public x: number, public y: number) {}

  get distance(){
    return Math.hypot(this.x, this.y);
  }
}

class Animal {
  protected name: string;
  private health = 100;
  readonly species: string = 'mammal';
}
```

- `abstract` classes and `implements` for interfaces.
    

---

# 9. Modules, imports, exports, and `tsconfig.json`

- Use ES modules: `export`, `export default`, `import x from './x'`
    
- `.ts` / `.tsx` files for JSX. `.d.ts` for ambient declarations.
    

Minimal `tsconfig.json` snippet (opinionated):

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": false
  }
}
```

- `strict: true` toggles several strict flags at once — strongly recommended.
    
- `esModuleInterop` is handy when importing CommonJS modules.
    

---

# 10. Utility types you’ll use daily

- `Partial<T>` — all props optional
    
- `Required<T>` — all props required
    
- `ReadOnly<T>` — all props readonly
    
- `Record<K, T>` — map keys to type
    
- `Pick<T, K>` / `Omit<T, K>`
    
- `ReturnType<F>` / `Parameters<F>`
    
- `Exclude<T, U>` / `Extract<T, U>`
    
- `NonNullable<T>`
    

```ts
type Person = { name: string; age?: number }
type P1 = Partial<Person>; // { name?: string; age?: number }
```

---

# 11. Interop with JavaScript

- Add `// @ts-ignore` to silence one line (use rarely)
    
- Add `// @ts-expect-error` when you expect an error — compiler will complain if error disappears (good for tests)
    
- Write declaration files for third-party libs without types: `globals.d.ts` or `foo.d.ts`:
    

```ts
// foo.d.ts
declare module 'some-untyped-lib' {
  export function doIt(opts: any): any;
}
```

- `declare global {}` — extend global scope
    
- `type`-only imports/exports: `import type { Foo } from './types'` (erases import at runtime)
    

---

# 12. Tooling tips & recommended flags

Recommended safe list for projects:

- `strict: true`
    
- `noImplicitAny: true`
    
- `strictNullChecks: true`
    
- `esModuleInterop: true` (if you use many CJS libs)
    
- `skipLibCheck: true` (speeds up build by skipping types check in `node_modules`)
    

Editor: use VS Code + `typescript` version from your project (workspace version) to avoid mismatch.

Build: `tsc --noEmit` for type-check-only pass in CI.

---

# 13. Quick recipes (copyable)

### Narrow a `unknown` value to object with property

```ts
function hasName(obj: unknown): obj is { name: string } {
  return typeof obj === 'object' && obj !== null && 'name' in (obj as object);
}
```

### Make a readonly constant tuple of strings

```ts
const methods = ['GET', 'POST'] as const; // readonly literal tuple
type Method = typeof methods[number]; // 'GET' | 'POST'
```

### Safe JSON parse

```ts
function parseJSON<T = unknown>(s: string): T | undefined {
  try { return JSON.parse(s) as T; }
  catch { return undefined; }
}
```

### Convert array to map

```ts
function keyBy<T, K extends keyof any>(arr: T[], getKey: (t: T) => K): Record<K, T> {
  return arr.reduce((acc, item) => { acc[getKey(item)] = item; return acc }, {} as Record<K, T>);
}
```

---

# Tips & gotchas (from JS background)

- `--strictNullChecks` changes how `null`/`undefined` work. In strict mode, `string` is not `string | null` anymore.
    
- Type widening: `const s = 'hi'` is `'hi'` (literal) if `as const` used, otherwise `string` inferred.
    
- Structural typing: TS is structural (duck-typed) — two objects with the same shape are compatible even if different names.
    
- Be careful with `any` — it defeats the purpose.
    
- Prefer `unknown` over `any` when dealing with external data.
    
- When migrating JS ➜ TS, use `allowJs` and add `checkJs` only when you want to type-check JS files.
    

---

# Suggested learning path

1. Start with `strict: true` on a small project.
    
2. Learn `never`/`unknown`/`any` differences.
    
3. Practice generics & mapped types by adding types to small utilities.
    
4. Read community patterns (utility types, discriminated unions) as needed.
    

---

# Resources (quick keywords to search)

- "Discriminated Unions TypeScript"
    
- "Mapped Types" and "Conditional Types"
    
- "Utility Types" (Partial, Record, Omit...)
    
- "Declaration files" and "DefinitelyTyped (@types)"
    

---

_Last updated: created for you — adjust/expand as you learn. Pin this note in Obsidian for quick lookups._