interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "John",
  age: 30,
};


// Car 클래스 작성
class Car {
  name: string;
  year: number;

  constructor(name: string, year: number) {
    this.name = name;
    this.year = year;
  }

  drive() {
    console.log(`${this.name} ${this.year} is driving`);
  }
}   
const myCar = new Car("Tesla", 2023);
myCar.drive();

type EmailNoti = { type: "email"; subject: string; recipient: string }
type SmsNoti = { type: "sms"; phoneNumber: string; message: string };
type PushNoti = { type: "push"; title: string; appId: string };
    
type NOTI = EmailNoti | SmsNoti | PushNoti;