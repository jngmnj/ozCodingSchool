// 제네릭 클래스 (큐 방식으로 동작하는 클래스)
// 큐: 선형 자료구조, 선입선출(FIFO) 방식의 자료구조
class GenericQueue<T> {
  private items: T[] = [];

  // enqueue: 큐에 아이템 추가
  enqueue(item: T): void {
    this.items.push(item);
  }

  // dequeue: 큐에서 아이템 제거
  dequeue(): T | undefined {
    return this.items.shift();
  }

  // peek: 큐의 첫 번째 아이템 반환
  peek(): T | undefined {
    return this.items[0];
  }

  // size: 큐의 크기 반환
  size(): number {
    return this.items.length;
  }
}

const queue = new GenericQueue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.peek()); // 1
console.log(queue.size()); // 3
console.log(queue.dequeue()); // 1
console.log(queue.size()); // 2
queue.enqueue(4);
console.log(queue.peek()); // 2
