export interface IListState<T> {
  selected: T[];
  add: (item: T) => void;
  remove: (item: T) => void;
  reset: () => void;
  fetch: () => void;
}

// export interface ICompState<T = Comps> {
//   components: T[];
//   selected: T[];
//   add: (item: T) => void;
//   remove: (item: T) => void;
//   reset: () => void;
//   fetch: () => void;
// }
