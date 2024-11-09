import React, { ReactNode } from 'react';

type RequiredItem = {
  id: string;
  name: string;
  cost: string;
};

export interface Comps extends RequiredItem {
  props: string[];
}
export interface Props extends RequiredItem {
  describe: string;
  type: '0' | '1';
}

// export type Item<T = Comps | Props> = T extends Comps ? Comps : T extends Props ? Props : never;
// export type Item = RequiredItem &
//   Partial<Omit<Comps, keyof RequiredItem>> &
//   Partial<Omit<Props, keyof RequiredItem>>;
export type Item = RequiredItem & Partial<Comps> & Partial<Props>;
