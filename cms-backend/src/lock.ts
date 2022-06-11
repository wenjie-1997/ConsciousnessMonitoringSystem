class LocalDatabase<T> {
  private isUsing: boolean = false;
  private data: T;

  constructor(public name: string, data: T) {
    this.data = data;
  }

  async use() {
    while (true) {
      //put some delay when looping
      await waitFor(Math.round(Math.random() * 100));

      //allocated, start using
      if (!this.isUsing) {
        console.log(this.name, "start using");
        this.isUsing = true;
        break;
      }
    }
  }
  async release() {
    console.log(this.name, "release");
    this.isUsing = false;
  }

  async save(data: T) {
    this.data = data;
  }
  async read() {
    return this.data;
  }
}

function waitFor(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

export { LocalDatabase };
