"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bottom_navigation_common_1 = require("./bottom-navigation.common");
var color_1 = require("tns-core-modules/color");
var image_source_1 = require("tns-core-modules/image-source");
var platform_1 = require("tns-core-modules/platform");
var application_1 = require("tns-core-modules/application");
var view_1 = require("tns-core-modules/ui/core/view/view");
var BottomNavigationDelegate = (function (_super) {
    __extends(BottomNavigationDelegate, _super);
    function BottomNavigationDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BottomNavigationDelegate.initWithOwner = function (owner) {
        var delegate = ((BottomNavigationDelegate.new()));
        delegate._owner = owner;
        return delegate;
    };
    BottomNavigationDelegate.prototype.bottomNavigationBarDidSelectItem = function (navigationBar, item) {
        var bottomNavigation = this._owner.get();
        if (bottomNavigation.selectedTabIndex === item.tag) {
            return;
        }
        bottomNavigation.onTabSelected(item.tag);
    };
    BottomNavigationDelegate.prototype.bottomNavigationBarShouldSelectItem = function (bottomNavigationBar, item) {
        var bottomNavigation = this._owner.get();
        var bottomNavigationTab = bottomNavigation.tabs[item.tag];
        if (!bottomNavigationTab.selectable) {
            bottomNavigation.onTabPressed(item.tag);
        }
        return bottomNavigationTab.selectable;
    };
    BottomNavigationDelegate.ObjCProtocols = [MDCBottomNavigationBarDelegate];
    return BottomNavigationDelegate;
}(NSObject));
exports.BottomNavigationDelegate = BottomNavigationDelegate;
function BottomNavigationDelegate_tsickle_Closure_declarations() {
    BottomNavigationDelegate.ObjCProtocols;
    BottomNavigationDelegate.prototype._owner;
}
var BottomNavigation = (function (_super) {
    __extends(BottomNavigation, _super);
    function BottomNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BottomNavigation.prototype, "ios", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    BottomNavigation.prototype.createNativeView = function () {
        this._delegate = BottomNavigationDelegate.initWithOwner(new WeakRef(this));
        this.nativeView = MDCBottomNavigationBar.alloc().init();
        return this.nativeView;
    };
    BottomNavigation.prototype.initNativeView = function () {
        this.nativeView.selectedItemTintColor = new color_1.Color(this.activeColor).ios;
        this.nativeView.unselectedItemTintColor = new color_1.Color(this.inactiveColor).ios;
        this.nativeView.barTintColor = new color_1.Color(this.backgroundColor).ios;
    };
    BottomNavigation.prototype.disposeNativeView = function () {
        this._delegate = null;
    };
    BottomNavigation.prototype.onLoaded = function () {
        this.nativeView.delegate = this._delegate;
        _super.prototype.onLoaded.call(this);
    };
    BottomNavigation.prototype.layoutNativeView = function (left, top, right, bottom) {
        if (!this.nativeViewProtected) {
            return;
        }
        var bottomSafeArea = 0;
        if (application_1.ios.window.safeAreaInsets) {
            bottomSafeArea = application_1.ios.window.safeAreaInsets.bottom;
        }
        var viewSize = CGSizeMake(platform_1.screen.mainScreen.widthDIPs, platform_1.screen.mainScreen.heightDIPs);
        var nativeViewSize = this.nativeView.sizeThatFits(viewSize);
        var bottomBarHeight = nativeViewSize.height + bottomSafeArea;
        var nativeView = this.nativeViewProtected;
        var frame = CGRectMake(0, view_1.layout.toDeviceIndependentPixels(top), viewSize.width, bottomBarHeight);
        ((this))._setNativeViewFrame(nativeView, frame);
    };
    BottomNavigation.prototype.createTabs = function (tabs) {
        if (!this.tabs) {
            this.tabs = tabs;
        }
        var toUITabBarItem = function (tab, tag) { return UITabBarItem.alloc().initWithTitleImageTag(tab.title, image_source_1.fromResource(tab.icon).ios, tag); };
        var bottomNavigationTabs = tabs.map(toUITabBarItem);
        this.nativeView.items = bottomNavigationTabs;
        this.nativeView.selectedItem = bottomNavigationTabs[this.selectedTabIndex];
    };
    BottomNavigation.prototype[bottom_navigation_common_1.tabsProperty.getDefault] = function () {
        return null;
    };
    BottomNavigation.prototype[bottom_navigation_common_1.tabsProperty.setNative] = function (value) {
        this.createTabs(value);
    };
    BottomNavigation.prototype[bottom_navigation_common_1.titleVisibilityProperty.getDefault] = function () {
        return 'selected';
    };
    BottomNavigation.prototype[bottom_navigation_common_1.titleVisibilityProperty.setNative] = function (value) {
        switch (value) {
            case 'never':
                this.nativeView.titleVisibility = MDCBottomNavigationBarTitleVisibilityNever;
                break;
            case 'always':
                this.nativeView.titleVisibility = MDCBottomNavigationBarTitleVisibilityAlways;
                break;
            default:
                this.nativeView.titleVisibility = MDCBottomNavigationBarTitleVisibilitySelected;
                break;
        }
    };
    BottomNavigation.prototype[bottom_navigation_common_1.activeColorProperty.setNative] = function (activeColor) {
        this.nativeView.selectedItemTintColor = new color_1.Color(activeColor).ios;
    };
    BottomNavigation.prototype[bottom_navigation_common_1.activeColorCssProperty.setNative] = function (activeColor) {
        this.nativeView.selectedItemTintColor = activeColor.ios;
    };
    BottomNavigation.prototype[bottom_navigation_common_1.inactiveColorProperty.setNative] = function (inactiveColor) {
        this.nativeView.unselectedItemTintColor = new color_1.Color(inactiveColor).ios;
    };
    BottomNavigation.prototype[bottom_navigation_common_1.inactiveColorCssProperty.setNative] = function (inactiveColor) {
        this.nativeView.unselectedItemTintColor = inactiveColor.ios;
    };
    BottomNavigation.prototype[bottom_navigation_common_1.backgroundColorProperty.setNative] = function (backgroundColor) {
        this.nativeView.barTintColor = new color_1.Color(backgroundColor).ios;
    };
    BottomNavigation.prototype[bottom_navigation_common_1.backgroundColorCssProperty.setNative] = function (backgroundColor) {
        this.nativeView.barTintColor = backgroundColor.ios;
    };
    BottomNavigation.prototype[bottom_navigation_common_1.keyLineColorProperty.setNative] = function (keyLineColor) {
    };
    BottomNavigation.prototype[bottom_navigation_common_1.keyLineColorCssProperty.setNative] = function (keyLineColor) {
    };
    BottomNavigation.prototype.selectTabNative = function (index) {
        this.nativeView.selectedItem = this.nativeView.items[index];
    };
    return BottomNavigation;
}(bottom_navigation_common_1.BottomNavigationBase));
exports.BottomNavigation = BottomNavigation;
function BottomNavigation_tsickle_Closure_declarations() {
    BottomNavigation.prototype._delegate;
}
var BottomNavigationTab = (function (_super) {
    __extends(BottomNavigationTab, _super);
    function BottomNavigationTab(title, icon, selectable, parent) {
        return _super.call(this, title, icon, selectable, parent) || this;
    }
    return BottomNavigationTab;
}(bottom_navigation_common_1.BottomNavigationTabBase));
exports.BottomNavigationTab = BottomNavigationTab;
