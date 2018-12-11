"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var lang_facade_1 = require("nativescript-angular/lang-facade");
var BottomNavigationDirective = (function () {
    function BottomNavigationDirective(element) {
        this.bottomNavigation = element.nativeElement;
    }
    Object.defineProperty(BottomNavigationDirective.prototype, "titleVisibility", {
        get: function () {
            return this._titleVisibility;
        },
        set: function (value) {
            this._titleVisibility = value;
            if (this._viewInitialized) {
                this.bottomNavigation.titleVisibility = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "activeColor", {
        get: function () {
            return this._activeColor;
        },
        set: function (value) {
            this._activeColor = value;
            if (this._viewInitialized) {
                this.bottomNavigation.activeColor = this._activeColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "inactiveColor", {
        get: function () {
            return this._inactiveColor;
        },
        set: function (value) {
            this._inactiveColor = value;
            if (this._viewInitialized) {
                this.bottomNavigation.inactiveColor = this._inactiveColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            this._backgroundColor = value;
            if (this._viewInitialized) {
                this.bottomNavigation.backgroundColor = this._backgroundColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "tabs", {
        get: function () {
            return this._tabs;
        },
        set: function (value) {
            this._tabs = value;
            if (this._viewInitialized) {
                this.bottomNavigation.tabs = this._tabs;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationDirective.prototype, "selectedTabIndex", {
        get: function () {
            return this._selectedTabIndex;
        },
        set: function (value) {
            this._selectedTabIndex = value;
            if (this._viewInitialized) {
                this.bottomNavigation.selectedTabIndex = this._selectedTabIndex;
            }
        },
        enumerable: true,
        configurable: true
    });
    BottomNavigationDirective.prototype.ngAfterViewInit = function () {
        this._viewInitialized = true;
        if (!lang_facade_1.isBlank(this._titleVisibility)) {
            this.bottomNavigation.titleVisibility = this._titleVisibility;
        }
        if (!lang_facade_1.isBlank(this._activeColor)) {
            this.bottomNavigation.activeColor = this._activeColor;
        }
        if (!lang_facade_1.isBlank(this._inactiveColor)) {
            this.bottomNavigation.inactiveColor = this._inactiveColor;
        }
        if (!lang_facade_1.isBlank(this._backgroundColor)) {
            this.bottomNavigation.backgroundColor = this._backgroundColor;
        }
        if (!lang_facade_1.isBlank(this._tabs)) {
            this.bottomNavigation.tabs = this._tabs;
        }
        if (!lang_facade_1.isBlank(this._selectedTabIndex)) {
            this.bottomNavigation.selectedTabIndex = this._selectedTabIndex;
        }
    };
    BottomNavigationDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "BottomNavigation"
                },] },
    ];
    BottomNavigationDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef }
    ]; };
    BottomNavigationDirective.propDecorators = {
        titleVisibility: [{ type: core_1.Input }],
        activeColor: [{ type: core_1.Input }],
        inactiveColor: [{ type: core_1.Input }],
        backgroundColor: [{ type: core_1.Input }],
        tabs: [{ type: core_1.Input }],
        selectedTabIndex: [{ type: core_1.Input }]
    };
    return BottomNavigationDirective;
}());
exports.BottomNavigationDirective = BottomNavigationDirective;
function BottomNavigationDirective_tsickle_Closure_declarations() {
    BottomNavigationDirective.prototype.bottomNavigation;
    BottomNavigationDirective.prototype._viewInitialized;
    BottomNavigationDirective.prototype._titleVisibility;
    BottomNavigationDirective.prototype._activeColor;
    BottomNavigationDirective.prototype._inactiveColor;
    BottomNavigationDirective.prototype._backgroundColor;
    BottomNavigationDirective.prototype._tabs;
    BottomNavigationDirective.prototype._selectedTabIndex;
}
var BottomNavigationTabDirective = (function () {
    function BottomNavigationTabDirective() {
    }
    Object.defineProperty(BottomNavigationTabDirective.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationTabDirective.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (value) {
            this._icon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationTabDirective.prototype, "selectable", {
        get: function () {
            return this._selectable;
        },
        set: function (value) {
            this._selectable = value;
        },
        enumerable: true,
        configurable: true
    });
    BottomNavigationTabDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "BottomNavigationTab"
                },] },
    ];
    BottomNavigationTabDirective.propDecorators = {
        title: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        _selectable: [{ type: core_1.Input }]
    };
    return BottomNavigationTabDirective;
}());
exports.BottomNavigationTabDirective = BottomNavigationTabDirective;
function BottomNavigationTabDirective_tsickle_Closure_declarations() {
    BottomNavigationTabDirective.prototype._title;
    BottomNavigationTabDirective.prototype._icon;
    BottomNavigationTabDirective.prototype._selectable;
}
exports.DIRECTIVES = [BottomNavigationDirective, BottomNavigationTabDirective];
