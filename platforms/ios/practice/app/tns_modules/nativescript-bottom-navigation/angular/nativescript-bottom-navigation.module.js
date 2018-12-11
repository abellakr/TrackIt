"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_bottom_navigation_directives_1 = require("./nativescript-bottom-navigation.directives");
var NativescriptBottomNavigationModule = (function () {
    function NativescriptBottomNavigationModule() {
    }
    NativescriptBottomNavigationModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [nativescript_bottom_navigation_directives_1.DIRECTIVES],
                    exports: [nativescript_bottom_navigation_directives_1.DIRECTIVES],
                },] },
    ];
    return NativescriptBottomNavigationModule;
}());
exports.NativescriptBottomNavigationModule = NativescriptBottomNavigationModule;
element_registry_1.registerElement("BottomNavigation", function () { return require("../").BottomNavigation; });
element_registry_1.registerElement("BottomNavigationTab", function () { return require("../").BottomNavigationTab; });
