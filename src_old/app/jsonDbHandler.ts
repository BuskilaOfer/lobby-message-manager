export interface Todo {
  id?: string;
  content: string;
  datemodified?: Date;
  isDone?: boolean;
}

export class Item implements Todo {
  id: string;
  content: string;
  datemodified: Date;
  isDone: boolean;

  constructor(
    id: string,
    content: string,
    datemodified: Date,
    isDone: boolean
  ) {
    this.id = id;
    console.log('content ' + content);

    this.content = content;
    console.log('content ' + this.content);
    this.datemodified = datemodified;
    this.isDone = isDone;
  }
}

export class JsonDbHandler {
  // private db = new Map<string, Item>();
  private db1 = new Array<Item>();

  constructor(dbName: string) {}

  private openDb(): void {}

  private closeDb(): void {}

  private saveDb(): void {}

  public getAllItems(): Item[] {
    return this.db1;
  }

  public add(inputValue: any): void {
    let freeId = String(Date.now());
    console.log(inputValue);
    let newItem = new Item(
      freeId,
      inputValue.content,
      inputValue.datemodified,
      inputValue.isDone
    );

    this.db1.push(newItem);
  }
  public update(inputValue: any) {
    console.log('inputValue.id' + inputValue.id);
    console.log('inputValue.id' + this.db1);
    const result: Array<Item> = this.db1.filter(
      item => item.id == inputValue.id
    );
    if (result.length == 1) {
      result[0].content = inputValue.content;
    } else {
      console.log(result);
    }
  }

  public delete(item: Item) {
    let index = this.db1.indexOf(item);
    if (index > -1) {
      this.db1.splice(index, 1);
    }
  }
}
