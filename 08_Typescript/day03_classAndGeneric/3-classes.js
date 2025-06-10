var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Country_name;
var Continent = /** @class */ (function () {
    function Continent(continentName) {
        this.continentName = continentName;
    }
    Continent.prototype.getContinentInfo = function () {
        return this.continentName;
    };
    return Continent;
}());
var Country = /** @class */ (function (_super) {
    __extends(Country, _super);
    function Country(continentName, name, capital) {
        var _this = _super.call(this, continentName) || this;
        _Country_name.set(_this, void 0);
        __classPrivateFieldSet(_this, _Country_name, name, "f");
        _this.capital = capital;
        return _this;
    }
    Country.prototype.getInfo = function () {
        return "".concat(__classPrivateFieldGet(this, _Country_name, "f"), "\uC758 \uC218\uB3C4\uB294 ").concat(this.capital, "\uC785\uB2C8\uB2E4. ").concat(this.getContinentInfo(), " \uB300\uB959\uC5D0 \uC704\uCE58\uD569\uB2C8\uB2E4.");
    };
    return Country;
}(Continent));
_Country_name = new WeakMap();
var korea = new Country("아시아", "대한민국", "서울");
console.log(korea.getInfo()); // 대한민국의 수도는 서울입니다. 아시아 대륙에 위치합니다.
// 추상 클래스
var AbstractCountry = /** @class */ (function () {
    function AbstractCountry(name, capital) {
        this.name = name;
        this.capital = capital;
    }
    AbstractCountry.prototype.setup = function () {
        console.log("setup complete");
    };
    return AbstractCountry;
}());
// const myCountry = new AbstractCountry("대한민국", "서울"); // 에러: 추상클래스는 인스턴스를 생성할 수 없습니다.
var ConcreteCountry = /** @class */ (function (_super) {
    __extends(ConcreteCountry, _super);
    function ConcreteCountry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteCountry.prototype.getInfo = function () {
        return "".concat(this.name, "\uC758 \uC218\uB3C4\uB294 ").concat(this.capital, "\uC785\uB2C8\uB2E4.");
    };
    return ConcreteCountry;
}(AbstractCountry));
var japan = new ConcreteCountry("일본", "도쿄");
console.log(japan.getInfo()); // 일본의 수도는 도쿄입니다.
