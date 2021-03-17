"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.People = void 0;
var People = /** @class */ (function () {
    function People(name, age) {
        this.name = name;
        this.age = age;
        console.log(this);
    }
    People.prototype.walk = function () {
        console.log(this.name + " (" + this.age + ") is walking");
    };
    return People;
}());
exports.People = People;
