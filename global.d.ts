type Nullable<T> = { [P in keyof T]: T[P] | null };
type NullablePrimitive<T> = T | null;

interface Dictionary {
  [key: string]: any;
}

interface GenericDictionary<T> {
  [key: string]: T;
}

declare module 'vue-flatpickr-component'