"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
// all-exceptions.filter.ts
var common_1 = require("@nestjs/common");
var AllExceptionsFilter = /** @class */ (function () {
    function AllExceptionsFilter() {
    }
    AllExceptionsFilter.prototype.catch = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var status = exception instanceof common_1.HttpException ? exception.getStatus() : 500;
        response
            .status(status)
            .json({
            statusCode: status,
            message: exception instanceof common_1.HttpException ? exception.message : 'Internal Server Error',
        });
    };
    AllExceptionsFilter = __decorate([
        (0, common_1.Catch)()
    ], AllExceptionsFilter);
    return AllExceptionsFilter;
}());
exports.AllExceptionsFilter = AllExceptionsFilter;
