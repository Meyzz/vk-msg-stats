import { RootStore } from 'stores';

export class BasicStore {
  public root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  public init() {}
}
