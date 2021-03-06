"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonHandler = (function (_super) {
    __extends(ButtonHandler, _super);
    function ButtonHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonHandler.prototype.close = function (nativeButton, nativeEvent) {
        picker.close();
    };
    ButtonHandler.prototype.chooseDate = function (nativeButton, nativeEvent) {
        picker.chooseDate();
    };
    ButtonHandler.prototype.chooseTime = function (nativeButton, nativeEvent) {
        picker.chooseTime();
    };
    return ButtonHandler;
}(NSObject));
ButtonHandler.ObjCExposedMethods = {
    close: {
        returns: interop.types.void,
        params: [interop.types.id, interop.types.id]
    },
    chooseDate: {
        returns: interop.types.void,
        params: [interop.types.id, interop.types.id]
    },
    chooseTime: {
        returns: interop.types.void,
        params: [interop.types.id, interop.types.id]
    }
};
var buttonHandler = ButtonHandler.new();
var myResolve;
var window;
var effectView;
var pickerHolderView;
var bottomContentContainer;
var titleLabel;
var datePickerView;
var ModalDatetimepicker = (function () {
    function ModalDatetimepicker() {
    }
    ModalDatetimepicker.prototype.pickDate = function (options) {
        if (options === void 0) { options = {}; }
        if (!options)
            options = {};
        options.type = "date";
        return this.show(options);
    };
    ModalDatetimepicker.prototype.pickTime = function (options) {
        if (options === void 0) { options = {}; }
        if (!options)
            options = {};
        options.type = "time";
        return this.show(options);
    };
    ModalDatetimepicker.prototype.show = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve, reject) {
            myResolve = resolve;
            if (!options.type)
                options.type = "date";
            if (!options.theme)
                options.theme = "dark";
            if (!options.title) {
                if (options.type === "date") {
                    options.title = "Choose A Date";
                }
                else {
                    options.title = "Choose A Time";
                }
            }
            var startingDate = new Date();
            if (options.type === "date") {
                if (options.startingDate &&
                    typeof options.startingDate.getMonth !== "function") {
                    reject("startingDate must be a Date.");
                }
                else if (options.startingDate) {
                    startingDate = options.startingDate;
                }
            }
            else {
                if (options.startingHour !== undefined && options.startingHour >= 0) {
                    startingDate.setHours(options.startingHour);
                }
                if (options.startingMinute !== undefined && options.startingMinute >= 0) {
                    startingDate.setMinutes(options.startingMinute);
                }
            }
            if (options.minDate && typeof options.minDate.getMonth !== "function") {
                reject("minDate must be a Date.");
            }
            if (options.maxDate && typeof options.maxDate.getMonth !== "function") {
                reject("maxDate must be a Date.");
            }
            window = UIApplication.sharedApplication.keyWindow;
            var containerBounds = window.bounds;
            effectView = UIVisualEffectView.alloc().init();
            effectView.frame = CGRectMake(containerBounds.origin.x, containerBounds.origin.y, containerBounds.size.width, containerBounds.size.height + 20);
            effectView.autoresizingMask =
                2 | 16;
            window.addSubview(effectView);
            window.bringSubviewToFront(effectView);
            UIView.animateWithDurationAnimations(0.4, function () {
                effectView.effect = UIBlurEffect.effectWithStyle(options.theme === "light"
                    ? 1
                    : 2);
            });
            bottomContentContainer = UIView.alloc().init();
            bottomContentContainer.frame = CGRectMake(10, containerBounds.size.height - 320, containerBounds.size.width - 20, 310);
            bottomContentContainer.autoresizingMask =
                8 | 2;
            bottomContentContainer.autoresizesSubviews = true;
            bottomContentContainer.transform = CGAffineTransformMakeTranslation(0, 320);
            pickerHolderView = UIView.alloc().init();
            pickerHolderView.backgroundColor = UIColor.whiteColor;
            pickerHolderView.frame = CGRectMake(0, 0, containerBounds.size.width - 20, 270);
            pickerHolderView.layer.cornerRadius = 10;
            pickerHolderView.layer.masksToBounds = true;
            pickerHolderView.autoresizingMask =
                2 | 16;
            pickerHolderView.layer.masksToBounds = false;
            pickerHolderView.layer.shadowColor = UIColor.blackColor.CGColor;
            pickerHolderView.layer.shadowOffset = CGSizeMake(2.0, 2.0);
            pickerHolderView.layer.shadowOpacity = 0.5;
            pickerHolderView.layer.shadowRadius = 8;
            pickerHolderView.layer.shadowPath = UIBezierPath.bezierPathWithRect(pickerHolderView.bounds).CGPath;
            var buttonContainer = UIView.alloc().initWithFrame(CGRectMake(0, 270, containerBounds.size.width - 20, 40));
            buttonContainer.autoresizingMask = 2;
            buttonContainer.autoresizesSubviews = true;
            var cancelButton = UIButton.buttonWithType(1);
            cancelButton.setTitleForState(options.cancelLabel || "Cancel", 0);
            cancelButton.addTargetActionForControlEvents(buttonHandler, "close", 64);
            cancelButton.frame = CGRectMake(0, 0, buttonContainer.bounds.size.width / 2, 40);
            cancelButton.setTitleColorForState(UIColor.whiteColor, 0);
            cancelButton.titleLabel.font = UIFont.systemFontOfSize(18);
            cancelButton.autoresizingMask = 2;
            buttonContainer.addSubview(cancelButton);
            buttonContainer.bringSubviewToFront(cancelButton);
            var doneButton = UIButton.buttonWithType(1);
            doneButton.setTitleForState(options.doneLabel || "Done", 0);
            if (options.type === "date") {
                doneButton.addTargetActionForControlEvents(buttonHandler, "chooseDate", 64);
            }
            else {
                doneButton.addTargetActionForControlEvents(buttonHandler, "chooseTime", 64);
            }
            doneButton.frame = CGRectMake(buttonContainer.bounds.size.width / 2, 0, buttonContainer.bounds.size.width / 2, 40);
            doneButton.setTitleColorForState(UIColor.colorWithRedGreenBlueAlpha(0, 0.6, 1, 1), 0);
            doneButton.titleLabel.font = UIFont.boldSystemFontOfSize(18);
            doneButton.autoresizingMask = 2;
            buttonContainer.addSubview(doneButton);
            buttonContainer.bringSubviewToFront(doneButton);
            bottomContentContainer.addSubview(buttonContainer);
            bottomContentContainer.bringSubviewToFront(buttonContainer);
            datePickerView = UIDatePicker.alloc().initWithFrame(CGRectMake(0, 0, containerBounds.size.width - 20, 250));
            datePickerView.datePickerMode =
                options.type === "date" ? 1 : 0;
            datePickerView.autoresizingMask = 2;
            datePickerView.date = startingDate;
            if (options.minDate)
                datePickerView.minimumDate = options.minDate;
            if (options.maxDate)
                datePickerView.maximumDate = options.maxDate;
            pickerHolderView.addSubview(datePickerView);
            pickerHolderView.bringSubviewToFront(datePickerView);
            bottomContentContainer.addSubview(pickerHolderView);
            bottomContentContainer.bringSubviewToFront(pickerHolderView);
            titleLabel = _this.labelFactory(options.title, UIColor.whiteColor, true, 25);
            titleLabel.textAlignment = 1;
            titleLabel.frame = CGRectMake(0, 20, containerBounds.size.width, containerBounds.size.height - 360);
            titleLabel.transform = CGAffineTransformMakeScale(0.8, 0.8);
            titleLabel.adjustsFontForContentSizeCategory = true;
            titleLabel.adjustsFontSizeToFitWidth = true;
            titleLabel.layer.masksToBounds = false;
            titleLabel.alpha = 0;
            titleLabel.autoresizingMask =
                16 |
                    8 |
                    2;
            window.addSubview(titleLabel);
            window.bringSubviewToFront(titleLabel);
            window.addSubview(bottomContentContainer);
            window.bringSubviewToFront(bottomContentContainer);
            UIView.animateWithDurationDelayOptionsAnimationsCompletion(0.4, 0, 131072, function () {
                bottomContentContainer.transform = CGAffineTransformMakeTranslation(0, 0);
                titleLabel.transform = CGAffineTransformMakeScale(1, 1);
                titleLabel.alpha = 1;
            }, function () {
            });
        });
    };
    ModalDatetimepicker.prototype.labelFactory = function (text, color, shadow, size) {
        window = UIApplication.sharedApplication.keyWindow;
        var containerBounds = window.bounds;
        var label = UILabel.alloc().init();
        label.text = text;
        label.font = UIFont.boldSystemFontOfSize(size);
        label.textColor = color;
        if (shadow) {
            label.shadowColor = UIColor.colorWithRedGreenBlueAlpha(0, 0, 0, 0.4);
            label.shadowOffset = CGSizeMake(2.0, 2.0);
            label.layer.shadowRadius = 8.0;
            label.layer.shadowOpacity = 0.5;
            label.layer.masksToBounds = false;
            label.layer.shouldRasterize = true;
        }
        return label;
    };
    ModalDatetimepicker.prototype.chooseDate = function () {
        var pickedDate = new Date(datePickerView.date);
        var response = {
            day: pickedDate.getDate(),
            month: pickedDate.getMonth() + 1,
            year: pickedDate.getFullYear()
        };
        this.close(response);
    };
    ModalDatetimepicker.prototype.chooseTime = function () {
        var pickedDate = new Date(datePickerView.date);
        var response = {
            hour: pickedDate.getHours(),
            minute: pickedDate.getMinutes()
        };
        this.close(response);
    };
    ModalDatetimepicker.prototype.close = function (response) {
        if (!response)
            response = false;
        UIView.animateWithDurationAnimationsCompletion(0.3, function () {
            effectView.effect = null;
            bottomContentContainer.transform = CGAffineTransformMakeTranslation(0, 320);
            titleLabel.transform = CGAffineTransformMakeScale(0.8, 0.8);
            titleLabel.alpha = 0;
        }, function () {
            effectView.removeFromSuperview();
            bottomContentContainer.removeFromSuperview();
            titleLabel.removeFromSuperview();
            myResolve(response);
        });
    };
    return ModalDatetimepicker;
}());
exports.ModalDatetimepicker = ModalDatetimepicker;
var picker = new ModalDatetimepicker();
//# sourceMappingURL=modal-datetimepicker.js.map