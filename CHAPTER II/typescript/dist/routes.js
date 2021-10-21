"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
var CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCourse(req, res) {
    CreateCourseService_1.default.execute({
        name: "Ignite Node Js",
        duration: 10,
        educator: "Jeferson M Macedo"
    });
    CreateCourseService_1.default.execute({
        name: "Ignite React Js",
        educator: "Jeferson M Moraes"
    });
    return res.send();
}
exports.createCourse = createCourse;
;
