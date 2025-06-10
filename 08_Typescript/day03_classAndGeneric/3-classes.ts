/**
 * 대륙 정보를 반환하는 메서드
 * @returns {string} 대륙 이름
 */
interface ContinentInterface {
  // continentName: string; 
  getContinentInfo(): string;
}

interface CountryInterface extends ContinentInterface {
  capital: string;
  getInfo(): string;
}

class Continent implements ContinentInterface{
  protected continentName: string;

  constructor(continentName: string) {
    this.continentName = continentName;
  }
  getContinentInfo() {
    return this.continentName;
  }
}

class Country extends Continent implements CountryInterface {
  #name: string;
  capital: string;

  constructor(continentName: string, name: string, capital: string) {
    super(continentName);
    this.#name = name;
    this.capital = capital;
  }
  getInfo(): string {
    return `${this.#name}의 수도는 ${
      this.capital
    }입니다. ${this.getContinentInfo()} 대륙에 위치합니다.`;
  }
}

let korea = new Country("아시아", "대한민국", "서울");
console.log(korea.getInfo()); // 대한민국의 수도는 서울입니다. 아시아 대륙에 위치합니다.


// 추상 클래스
abstract class AbstractCountry {
    name: string;
    capital: string;

  constructor(name: string, capital: string) {
    this.name = name;
    this.capital = capital;
  }

  abstract getInfo(): string;

  setup(): void {
    console.log("setup complete");
  }
}

// const myCountry = new AbstractCountry("대한민국", "서울"); // 에러: 추상클래스는 인스턴스를 생성할 수 없습니다.
class ConcreteCountry extends AbstractCountry {
  getInfo(): string {
    return `${this.name}의 수도는 ${this.capital}입니다.`;
  }
}
let japan = new ConcreteCountry("일본", "도쿄");
console.log(japan.getInfo()); // 일본의 수도는 도쿄입니다.