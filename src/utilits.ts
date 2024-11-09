import { Item, Comps } from '@/types/Item';

export const filterListByList = (list: Comps[], selected: string[]): Comps[] =>
  list.reduce((acc, comp) => {
    selected.forEach(prop => {
      if (comp.props.includes(prop) && !acc.includes(comp)) acc.push(comp);
    });
    return acc;
  }, []);

export const filterListById = (lists: Item[], selected: string[]) =>
  lists.filter(({ id }) => selected.includes(id));

export const getPropsFromComps = (list: Comps[], selected: string[]) =>
  Array.from(
    new Set(
      list.reduce((acc, { id, props }) => {
        if (selected.includes(id)) acc.push(...props);
        return acc;
      }, [])
    )
  );

export const findByName = (list: Item[], search: string) => {
  if (!search) return list;
  return list.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
};
