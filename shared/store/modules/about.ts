import { makeAutoObservable } from "mobx";
import type { AppStore } from "..";

export class AboutStore {
  count = 0;

  name = "";

  root: AppStore;

  async fetchName() {
    // const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/name`);
    // const name = await res.text();
    const name = "AboutStore";
    this.name = name;
    console.log("about", name);
  }

  constructor(root: AppStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  increment() {
    this.count++;
  }
}
