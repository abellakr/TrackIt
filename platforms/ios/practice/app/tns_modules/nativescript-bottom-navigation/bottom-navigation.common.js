"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var properties_1 = require("tns-core-modules/ui/core/properties");
var style_1 = require("tns-core-modules/ui/styling/style");
var color_1 = require("tns-core-modules/color");
var view_base_1 = require("tns-core-modules/ui/core/view-base");
function OnTabPressedEventData() { }
exports.OnTabPressedEventData = OnTabPressedEventData;
function OnTabPressedEventData_tsickle_Closure_declarations() {
    OnTabPressedEventData.prototype.index;
}
function OnTabSelectedEventData() { }
exports.OnTabSelectedEventData = OnTabSelectedEventData;
function OnTabSelectedEventData_tsickle_Closure_declarations() {
    OnTabSelectedEventData.prototype.oldIndex;
    OnTabSelectedEventData.prototype.newIndex;
}
var BottomNavigationBase = (function (_super) {
    __extends(BottomNavigationBase, _super);
    function BottomNavigationBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedTabIndex = 0;
        _this.titleVisibility = 'selected';
        _this.activeColor = 'green';
        _this.inactiveColor = 'gray';
        _this.backgroundColor = 'white';
        _this.keyLineColor = '#eeeeee';
        return _this;
    }
    BottomNavigationBase.prototype.selectTab = function (index) {
        if (index !== this.selectedTabIndex) {
            this.selectTabNative(index);
        }
    };
    BottomNavigationBase.prototype.onTabPressed = function (index) {
        var eventData = {
            eventName: 'tabPressed',
            object: this,
            index: index
        };
        this.notify(eventData);
    };
    BottomNavigationBase.prototype.onTabSelected = function (index) {
        var eventData = {
            eventName: 'tabSelected',
            object: this,
            oldIndex: this.selectedTabIndex || 0,
            newIndex: index
        };
        this.selectedTabIndex = index;
        this.notify(eventData);
    };
    BottomNavigationBase.prototype._addChildFromBuilder = function (name, value) {
        if (name === 'BottomNavigationTab') {
            if (!this.tabs) {
                this.tabs = ([]);
            }
            this.tabs.push((value));
        }
    };
    return BottomNavigationBase;
}(view_1.View));
exports.BottomNavigationBase = BottomNavigationBase;
function BottomNavigationBase_tsickle_Closure_declarations() {
    BottomNavigationBase.prototype.tabs;
    BottomNavigationBase.prototype.selectedTabIndex;
    BottomNavigationBase.prototype.titleVisibility;
    BottomNavigationBase.prototype.activeColor;
    BottomNavigationBase.prototype.inactiveColor;
    BottomNavigationBase.prototype.backgroundColor;
    BottomNavigationBase.prototype.keyLineColor;
    BottomNavigationBase.prototype.selectTabNative = function (index) { };
}
exports.tabsProperty = new properties_1.Property({
    name: 'tabs',
    equalityComparer: function (a, b) { return !a && !b && a.length === b.length; }
});
exports.tabsProperty.register(BottomNavigationBase);
exports.titleVisibilityProperty = new properties_1.Property({
    name: 'titleVisibility'
});
exports.titleVisibilityProperty.register(BottomNavigationBase);
exports.activeColorProperty = new properties_1.Property({
    name: 'activeColor'
});
exports.activeColorProperty.register(BottomNavigationBase);
exports.activeColorCssProperty = new properties_1.CssProperty({
    name: 'tabActiveColor',
    cssName: 'tab-active-color',
    equalityComparer: color_1.Color.equals,
    valueConverter: function (v) { return new color_1.Color(v); }
});
exports.activeColorCssProperty.register(style_1.Style);
exports.inactiveColorProperty = new properties_1.Property({
    name: 'inactiveColor'
});
exports.inactiveColorProperty.register(BottomNavigationBase);
exports.inactiveColorCssProperty = new properties_1.CssProperty({
    name: "tabInactiveColor",
    cssName: "tab-inactive-color",
    equalityComparer: color_1.Color.equals,
    valueConverter: function (v) { return new color_1.Color(v); }
});
exports.inactiveColorCssProperty.register(style_1.Style);
exports.backgroundColorProperty = new properties_1.Property({
    name: 'backgroundColor'
});
exports.backgroundColorProperty.register(BottomNavigationBase);
exports.backgroundColorCssProperty = new properties_1.CssProperty({
    name: 'tabBackgroundColor',
    cssName: 'tab-background-color',
    equalityComparer: color_1.Color.equals,
    valueConverter: function (v) { return new color_1.Color(v); }
});
exports.backgroundColorCssProperty.register(style_1.Style);
exports.keyLineColorProperty = new properties_1.Property({
    name: 'keyLineColor'
});
exports.keyLineColorProperty.register(BottomNavigationBase);
exports.keyLineColorCssProperty = new properties_1.CssProperty({
    name: 'tabKeyLineColor',
    cssName: 'tab-keyline-color',
    equalityComparer: color_1.Color.equals,
    valueConverter: function (v) { return new color_1.Color(v); }
});
exports.keyLineColorCssProperty.register(style_1.Style);
var BottomNavigationTabBase = (function () {
    function BottomNavigationTabBase(title, icon, selectable, parent) {
        if (selectable === void 0) { selectable = true; }
        this._selectable = true;
        this._title = title;
        this._icon = icon;
        this._selectable = selectable;
        if (parent) {
            this._parent = parent;
        }
    }
    Object.defineProperty(BottomNavigationTabBase.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            if (this.title !== value) {
                this._title = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationTabBase.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (value) {
            if (this._icon !== value) {
                this._icon = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationTabBase.prototype, "selectable", {
        get: function () {
            return view_base_1.booleanConverter((this._selectable));
        },
        set: function (value) {
            this._selectable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BottomNavigationTabBase.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (value) {
            if (this._parent !== value) {
                this._parent = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return BottomNavigationTabBase;
}());
exports.BottomNavigationTabBase = BottomNavigationTabBase;
function BottomNavigationTabBase_tsickle_Closure_declarations() {
    BottomNavigationTabBase.prototype._title;
    BottomNavigationTabBase.prototype._icon;
    BottomNavigationTabBase.prototype._selectable;
    BottomNavigationTabBase.prototype._parent;
}
