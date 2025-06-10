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
var _Item_content, _UserRepository_users;
/*
* Generic Class
* 클래스에서도 Generics를 사용할 수 있다.
*/
var Item = /** @class */ (function () {
    function Item() {
        _Item_content.set(this, void 0);
        __classPrivateFieldSet(this, _Item_content, null, "f");
    }
    Item.prototype.setItem = function (value) {
        __classPrivateFieldSet(this, _Item_content, value, "f");
    };
    Item.prototype.getItem = function () {
        return __classPrivateFieldGet(this, _Item_content, "f");
    };
    return Item;
}());
_Item_content = new WeakMap();
var numberItem = new Item();
numberItem.setItem(42);
console.log(numberItem.getItem()); // 42
var stringItem = new Item();
stringItem.setItem("Hello, Generics!");
console.log(stringItem.getItem()); // Hello, Generics!
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        _UserRepository_users.set(this, []);
    }
    UserRepository.prototype.findById = function (id) {
        return __classPrivateFieldGet(this, _UserRepository_users, "f").find(function (user) { return user.id === id; }) || undefined;
    };
    UserRepository.prototype.save = function (item) {
        __classPrivateFieldGet(this, _UserRepository_users, "f").push(item);
    };
    return UserRepository;
}());
_UserRepository_users = new WeakMap();
var userRepo = new UserRepository();
userRepo.save({ id: 1, name: "Alice" });
var user = userRepo.findById(1);
console.log(user); // { id: 1, name: 'Alice' }
userRepo.save({ id: 2, name: "Bob" });
