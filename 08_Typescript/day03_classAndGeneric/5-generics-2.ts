/* 
* Generic Class
* 클래스에서도 Generics를 사용할 수 있다.
*/
class Item<T> {
  #content: T | null;

  constructor() {
    this.#content = null;
  }

  setItem(value: T): void {
    this.#content = value;
  }
  getItem(): T | null {
    return this.#content;
  }
}

const numberItem = new Item<number>();
numberItem.setItem(42);
console.log(numberItem.getItem()); // 42

const stringItem = new Item<string>();
stringItem.setItem("Hello, Generics!");
console.log(stringItem.getItem()); // Hello, Generics!

/*
* Generic interface
* 인터페이스에서도 Generics를 사용할 수 있다.
*/
// 두가지 메서드를 가진하는 제네릭 인터페이스
interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface WithId {
  id: number;
}
// 제약
// 모든 객체에는 id 속성이 있어야 한다는 것을 의미
interface Store<T extends WithId> {
  findById(id: number): T | undefined;
  save(item: T): void;
}

// User나 Product타입에 반드시 id 속성이 있어야 한다고 제약이 걸려있다.
class UserRepository implements Store<User> {
  #users: User[] = [];

  findById(id: number): User | undefined {
    return this.#users.find((user) => user.id === id);
  }

  save(item: User): void {
    this.#users.push(item);
  }
}

const userRepo = new UserRepository();
userRepo.save({ id: 1, name: "Alice" });
const user = userRepo.findById(1);
console.log(user); // { id: 1, name: 'Alice' }
userRepo.save({ id: 2, name: "Bob" });

class ProductRepository implements Store<Product> {
  #products: Product[] = [];

  findById(id: number): Product | undefined {
    return this.#products.find((user) => user.id === id);
  }

  save(item: Product): void {
    this.#products.push(item);
  }
}
const product1 = new ProductRepository();
product1.save({ id: 1, name: "Laptop", price: 1000 });
const product2 = new ProductRepository();