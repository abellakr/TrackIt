"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var routes = require("~/shared/routes.json");
var Item = /** @class */ (function () {
    function Item(name) {
        this.name = name;
        this.id = new Date().getTime().toString();
    }
    return Item;
}());
var ViewModel = /** @class */ (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        var _this = _super.call(this) || this;
        _this.newItem = '';
        _this.averageWeight = '';
        _this.allWeights = [];
        _this.items = new observable_array_1.ObservableArray([]);
        _this.averageWeight = '0.0 lbs';
        return _this;
    }
    ViewModel.prototype.addItem = function () {
        this.items.reverse();
        this.items.push(new Item(this.newItem));
        this.items.reverse();
        this.set('newItem', '');
    };
    ViewModel.prototype.onAdd = function (args) {
        var page = args.object.page; // Yes! args.object.page is a thing. 
        page.frame.navigate({
            moduleName: "addProgress/add-progress",
            clearHistory: true,
            animated: true,
            // Set up a transition property on page navigation.
            transition: {
                name: "slideLeft",
                duration: 380,
                curve: "easeIn"
            }
        });
    };
    ViewModel.prototype.addNavigatedItem = function (args) {
        var newitem = parseFloat(args);
        var roundedItem = newitem.toFixed(1);
        this.items.reverse();
        this.items.push(new Item(roundedItem + " lbs"));
        this.items.reverse();
        //average the weights
        this.allWeights.push(parseFloat(args));
        var sum = 0;
        for (var i = 0; i < this.allWeights.length; i++) {
            sum += this.allWeights[i];
        }
        var avg = sum / this.allWeights.length;
        this.set('averageWeight', avg.toFixed(1) + " lbs");
    };
    return ViewModel;
}(observable_1.Observable)); //viewmodel
var viewmodel = new ViewModel();
var pageLoaded = function (args) {
    var page = args.object;
    page.bindingContext = viewmodel;
};
exports.pageLoaded = pageLoaded;
function onNavigatingTo(args) {
    var page = args.object;
    // You can access `info` property from the navigationEntry
    var context = page.navigationContext;
    if (typeof context != 'undefined') {
        //console.log("data: "+context.info);
        var newData = parseFloat(context.info);
        viewmodel.addNavigatedItem(newData + "\tlbs");
        //viewmodel.addWeight(newData);
    }
    // const vm = fromObject({
    //     // Setting the listview binding source
    //     myTitles: [
    //         { title: "The Da Vinci Code" },
    //         { title: "Harry Potter and the Chamber of Secrets" },
    //         { title: "The Alchemist" },
    //         { title: "The Godfather" },
    //         { title: "Goodnight Moon" },
    //         { title: "The Hobbit" }
    //     ]
    // });
    // page.bindingContext = vm;
}
exports.onNavigatingTo = onNavigatingTo;
function onListViewLoaded(args) {
    var listView = args.object;
}
exports.onListViewLoaded = onListViewLoaded;
function onItemTap(args) {
    var index = args.index;
    console.log("Second ListView item tap " + index);
}
exports.onItemTap = onItemTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2dyZXNzLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBa0U7QUFDbEUsMERBQXdEO0FBR3hELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBTS9DO0lBSUksY0FBWSxJQUFZO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBRUQ7SUFBd0IsNkJBQVU7SUFNOUI7UUFBQSxZQUNJLGlCQUFPLFNBU1Y7UUFkRCxhQUFPLEdBQVcsRUFBRSxDQUFBO1FBQ3BCLG1CQUFhLEdBQVcsRUFBRSxDQUFBO1FBQzFCLGdCQUFVLEdBQUcsRUFBRSxDQUFDO1FBS1osS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGtDQUFlLENBQVEsRUFHdkMsQ0FBQyxDQUFBO1FBRUYsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUE7O0lBRWxDLENBQUM7SUFFRCwyQkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCx5QkFBSyxHQUFMLFVBQU0sSUFBSTtRQUNOLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFD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SyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBNEIsS0FBTyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUhELDhCQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlLCBFdmVudERhdGEsIGZyb21PYmplY3R9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tICdkYXRhL29ic2VydmFibGUtYXJyYXknO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL2ZyYW1lJztcbmltcG9ydCB7IExpc3RWaWV3LCBJdGVtRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7IFxuY29uc3Qgcm91dGVzID0gcmVxdWlyZShcIn4vc2hhcmVkL3JvdXRlcy5qc29uXCIpO1xuXG5cbmltcG9ydCB7IEJvdHRvbU5hdmlnYXRpb24sIEJvdHRvbU5hdmlnYXRpb25UYWIsIE9uVGFiU2VsZWN0ZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWJvdHRvbS1uYXZpZ2F0aW9uXCI7XG5cblxuY2xhc3MgSXRlbSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG5jbGFzcyBWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBpdGVtczogT2JzZXJ2YWJsZUFycmF5PEl0ZW0+XG4gICAgbmV3SXRlbTogc3RyaW5nID0gJydcbiAgICBhdmVyYWdlV2VpZ2h0OiBzdHJpbmcgPSAnJ1xuICAgIGFsbFdlaWdodHMgPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEl0ZW0+IChbXG4gICAgICAgICAgICAvLyBuZXcgSXRlbSgnaXRlbTEnKSxcbiAgICAgICAgICAgIC8vIG5ldyBJdGVtKCdpdGVtMicpXG4gICAgICAgIF0pXG5cbiAgICAgICAgdGhpcy5hdmVyYWdlV2VpZ2h0ID0gJzAuMCBsYnMnXG5cbiAgICB9XG5cbiAgICBhZGRJdGVtKCkge1xuICAgICAgICB0aGlzLml0ZW1zLnJldmVyc2UoKTtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBJdGVtKHRoaXMubmV3SXRlbSkpO1xuICAgICAgICB0aGlzLml0ZW1zLnJldmVyc2UoKTtcbiAgICAgICAgdGhpcy5zZXQoJ25ld0l0ZW0nLCAnJyk7XG4gICAgfVxuXG4gICAgb25BZGQoYXJncykge1xuICAgICAgICBjb25zdCBwYWdlID0gYXJncy5vYmplY3QucGFnZTsgLy8gWWVzISBhcmdzLm9iamVjdC5wYWdlIGlzIGEgdGhpbmcuIFxuICAgICAgICBwYWdlLmZyYW1lLm5hdmlnYXRlKHtcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwiYWRkUHJvZ3Jlc3MvYWRkLXByb2dyZXNzXCIsIFxuICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAvLyBTZXQgdXAgYSB0cmFuc2l0aW9uIHByb3BlcnR5IG9uIHBhZ2UgbmF2aWdhdGlvbi5cbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzODAsXG4gICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZUluXCJcbiAgICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGROYXZpZ2F0ZWRJdGVtKGFyZ3Mpe1xuICAgICAgICB2YXIgbmV3aXRlbSA9IHBhcnNlRmxvYXQoYXJncyk7XG4gICAgICAgIHZhciByb3VuZGVkSXRlbSA9IG5ld2l0ZW0udG9GaXhlZCgxKTtcblxuICAgICAgICB0aGlzLml0ZW1zLnJldmVyc2UoKTtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBJdGVtKHJvdW5kZWRJdGVtK1wiIGxic1wiKSk7XG4gICAgICAgIHRoaXMuaXRlbXMucmV2ZXJzZSgpO1xuXG4gICAgICAgIC8vYXZlcmFnZSB0aGUgd2VpZ2h0c1xuICAgICAgICB0aGlzLmFsbFdlaWdodHMucHVzaChwYXJzZUZsb2F0KGFyZ3MpKTtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmFsbFdlaWdodHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgc3VtICs9IHRoaXMuYWxsV2VpZ2h0c1tpXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXZnID0gc3VtIC8gdGhpcy5hbGxXZWlnaHRzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5zZXQoJ2F2ZXJhZ2VXZWlnaHQnLGF2Zy50b0ZpeGVkKDEpK1wiIGxic1wiKTtcbiAgICBcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgYWRkV2VpZ2h0KGFyZ3Mpe1xuICAgIC8vICAgICB0aGlzLmFsbFdlaWdodHMucHVzaChhcmdzKTtcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIGdldEF2ZXJhZ2VXZWlnaHQoKXtcbiAgICAvLyAgICAgbGV0IHN1bSA9IHRoaXMuYWxsV2VpZ2h0cy5yZWR1Y2UoKHByZXZpb3VzLCBjdXJyZW50KSA9PiBjdXJyZW50ICs9IHByZXZpb3VzKTtcbiAgICAvLyAgICAgbGV0IGF2ZyA9IHN1bSAvIHRoaXMuYWxsV2VpZ2h0cy5sZW5ndGg7XG4gICAgLy8gICAgIHRoaXMuc2V0KCdhdmVyYWdlV2VpZ2h0JyxhdmcrXCIgbGJzXCIpO1xuICAgIC8vIH1cblxufS8vdmlld21vZGVsXG5cbmxldCB2aWV3bW9kZWwgPSBuZXcgVmlld01vZGVsKCk7XG5cbmxldCBwYWdlTG9hZGVkID0gKGFyZ3M6IEV2ZW50RGF0YSkgPT4ge1xuICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG5cbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdmlld21vZGVsOyAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xuICAgIGNvbnN0IHBhZ2U6IFBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcbiAgICAvLyBZb3UgY2FuIGFjY2VzcyBgaW5mb2AgcHJvcGVydHkgZnJvbSB0aGUgbmF2aWdhdGlvbkVudHJ5XG4gICAgY29uc3QgY29udGV4dDogYW55ID0gcGFnZS5uYXZpZ2F0aW9uQ29udGV4dDtcblxuICAgIGlmKHR5cGVvZiBjb250ZXh0ICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImRhdGE6IFwiK2NvbnRleHQuaW5mbyk7XG4gICAgICAgIHZhciBuZXdEYXRhID0gcGFyc2VGbG9hdChjb250ZXh0LmluZm8pO1xuICAgICAgICB2aWV3bW9kZWwuYWRkTmF2aWdhdGVkSXRlbShuZXdEYXRhK1wiXFx0bGJzXCIpXG4gICAgICAgIC8vdmlld21vZGVsLmFkZFdlaWdodChuZXdEYXRhKTtcbiAgICB9XG5cbiAgICAvLyBjb25zdCB2bSA9IGZyb21PYmplY3Qoe1xuICAgIC8vICAgICAvLyBTZXR0aW5nIHRoZSBsaXN0dmlldyBiaW5kaW5nIHNvdXJjZVxuICAgIC8vICAgICBteVRpdGxlczogW1xuICAgIC8vICAgICAgICAgeyB0aXRsZTogXCJUaGUgRGEgVmluY2kgQ29kZVwiIH0sXG4gICAgLy8gICAgICAgICB7IHRpdGxlOiBcIkhhcnJ5IFBvdHRlciBhbmQgdGhlIENoYW1iZXIgb2YgU2VjcmV0c1wiIH0sXG4gICAgLy8gICAgICAgICB7IHRpdGxlOiBcIlRoZSBBbGNoZW1pc3RcIiB9LFxuICAgIC8vICAgICAgICAgeyB0aXRsZTogXCJUaGUgR29kZmF0aGVyXCIgfSxcbiAgICAvLyAgICAgICAgIHsgdGl0bGU6IFwiR29vZG5pZ2h0IE1vb25cIiB9LFxuICAgIC8vICAgICAgICAgeyB0aXRsZTogXCJUaGUgSG9iYml0XCIgfVxuICAgIC8vICAgICBdXG4gICAgLy8gfSk7XG4gICAgLy8gcGFnZS5iaW5kaW5nQ29udGV4dCA9IHZtO1xufSBcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTGlzdFZpZXdMb2FkZWQoYXJnczogRXZlbnREYXRhKSB7XG4gICAgY29uc3QgbGlzdFZpZXcgPSA8TGlzdFZpZXc+YXJncy5vYmplY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkl0ZW1UYXAoYXJnczogSXRlbUV2ZW50RGF0YSkge1xuICAgIGNvbnN0IGluZGV4ID0gYXJncy5pbmRleDtcbiAgICBjb25zb2xlLmxvZyhgU2Vjb25kIExpc3RWaWV3IGl0ZW0gdGFwICR7aW5kZXh9YCk7XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBib3R0b21OYXZpZ2F0aW9uTG9hZGVkKGFyZ3MpIHtcbi8vICAgICBsZXQgYm90dG9tTmF2aWdhdGlvbjogQm90dG9tTmF2aWdhdGlvbiA9IGFyZ3Mub2JqZWN0O1xuLy8gICAgIGJvdHRvbU5hdmlnYXRpb24ub24oJ3RhYlNlbGVjdGVkJywgdGFiU2VsZWN0ZWQpO1xuLy8gICB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiB0YWJTZWxlY3RlZChhcmdzOiBPblRhYlNlbGVjdGVkRXZlbnREYXRhKSB7XG4vLyBjb25zb2xlLmxvZygndGFiIHdhcyAnICsgYXJncy5uZXdJbmRleCk7XG4vLyBzd2l0Y2goYXJncy5uZXdJbmRleCl7XG4vLyAgICAgY2FzZSAxOlxuLy8gICAgICAgICBjb25zdCBhZGRfcHJvZ3Jlc3NfcGFnZSA9IGFyZ3Mub2JqZWN0LnBhZ2U7IC8vIFllcyEgYXJncy5vYmplY3QucGFnZSBpcyBhIHRoaW5nLiBcbi8vICAgICAgICAgYWRkX3Byb2dyZXNzX3BhZ2UuZnJhbWUubmF2aWdhdGUoe1xuLy8gICAgICAgICBtb2R1bGVOYW1lOiByb3V0ZXMuYWRkUHJvZ3Jlc3MsIFxuLy8gICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXG4vLyAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuLy8gICAgICAgICAvLyBTZXQgdXAgYSB0cmFuc2l0aW9uIHByb3BlcnR5IG9uIHBhZ2UgbmF2aWdhdGlvbi5cbi8vICAgICAgICAgdHJhbnNpdGlvbjoge1xuLy8gICAgICAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcbi8vICAgICAgICAgICAgIGR1cmF0aW9uOiAzODAsXG4vLyAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlSW5cIlxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIH0pOyBcbi8vICAgICAgICAgYnJlYWs7XG4vLyAgICAgY2FzZSAyOlxuLy8gICAgICAgICBjb25zdCBzZXR0aW5nc19wYWdlID0gYXJncy5vYmplY3QucGFnZTsgLy8gWWVzISBhcmdzLm9iamVjdC5wYWdlIGlzIGEgdGhpbmcuIFxuLy8gICAgICAgICBzZXR0aW5nc19wYWdlLmZyYW1lLm5hdmlnYXRlKHtcbi8vICAgICAgICAgbW9kdWxlTmFtZTogcm91dGVzLnNldHRpbmdzLCBcbi8vICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxuLy8gICAgICAgICBhbmltYXRlZDogdHJ1ZSxcbi8vICAgICAgICAgLy8gU2V0IHVwIGEgdHJhbnNpdGlvbiBwcm9wZXJ0eSBvbiBwYWdlIG5hdmlnYXRpb24uXG4vLyAgICAgICAgIHRyYW5zaXRpb246IHtcbi8vICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVMZWZ0XCIsXG4vLyAgICAgICAgICAgICBkdXJhdGlvbjogMzgwLFxuLy8gICAgICAgICAgICAgY3VydmU6IFwiZWFzZUluXCJcbi8vICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgYnJlYWs7XG4vLyAgICAgfVxuLy8gfVxuXG5leHBvcnQgeyBwYWdlTG9hZGVkIH1cbiJdfQ==