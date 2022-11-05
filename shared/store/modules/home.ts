import fetch from "isomorphic-fetch";
import { makeAutoObservable } from "mobx";
import type { AppStore, PrefetchStore } from "..";

export type HomeState = {
  name: string;
};

export class HomeStore implements PrefetchStore<HomeState> {
  name = "";

  root: AppStore;

  constructor(root: AppStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  fetchName = (value: string) => {
    // const res = await fetch(``);
    // const name = await res.text();

    this.name = value || "-";
  };

  hydrate(state: HomeState): void {
    this.name = state.name;
  }

  dehydra(): HomeState {
    return {
      name: this.name,
    };
  }
}
