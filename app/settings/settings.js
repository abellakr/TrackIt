"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var routes = require("~/shared/routes.json");
var ViewModel = /** @class */ (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ViewModel;
}(observable_1.Observable)); //viewmodel
var viewmodel = new ViewModel();
var pageLoaded = function (args) {
    var page = args.object;
    page.bindingContext = viewmodel;
};
exports.pageLoaded = pageLoaded;
function bottomNavigationLoaded(args) {
    var bottomNavigation = args.object;
    bottomNavigation.on('tabSelected', tabSelected);
}
exports.bottomNavigationLoaded = bottomNavigationLoaded;
function tabSelected(args) {
    console.log('tab was ' + args.newIndex);
    switch (args.newIndex) {
        case 0:
            var view_progress_page = args.object.page; // Yes! args.object.page is a thing. 
            view_progress_page.frame.navigate({
                moduleName: routes.viewProgress,
                clearHistory: true,
                animated: true,
                // Set up a transition property on page navigation.
                transition: {
                    name: "slideRight",
                    duration: 380,
                    curve: "easeIn"
                }
            });
            break;
        case 1:
            var add_progress_page = args.object.page; // Yes! args.object.page is a thing. 
            add_progress_page.frame.navigate({
                moduleName: routes.addProgress,
                clearHistory: true,
                animated: true,
                // Set up a transition property on page navigation.
                transition: {
                    name: "slideRight",
                    duration: 380,
                    curve: "easeIn"
                }
            });
            break;
    }
}
exports.tabSelected = tabSelected;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQU90RCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUcvQztJQUF3Qiw2QkFBVTtJQUFsQzs7SUFFQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBd0IsdUJBQVUsR0FFakMsQ0FBQSxXQUFXO0FBRVosSUFBSSxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoQyxJQUFJLFVBQVUsR0FBRyxVQUFDLElBQWU7SUFDN0IsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUU3QixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUNwQyxDQUFDLENBQUE7QUF5Q1EsZ0NBQVU7QUF2Q25CLGdDQUF1QyxJQUFJO0lBQ3ZDLElBQUksZ0JBQWdCLEdBQXFCLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckQsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBSEgsd0RBR0c7QUFFSCxxQkFBNEIsSUFBNEI7SUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO1FBQ2xCLEtBQUssQ0FBQztZQUNGLElBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxxQ0FBcUM7WUFDbEYsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDbEMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxZQUFZO2dCQUMvQixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsbURBQW1EO2dCQUNuRCxVQUFVLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLFFBQVEsRUFBRSxHQUFHO29CQUNiLEtBQUssRUFBRSxRQUFRO2lCQUNsQjthQUNBLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQztRQUNWLEtBQUssQ0FBQztZQUNGLElBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxxQ0FBcUM7WUFDakYsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDakMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXO2dCQUM5QixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsbURBQW1EO2dCQUNuRCxVQUFVLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLFFBQVEsRUFBRSxHQUFHO29CQUNiLEtBQUssRUFBRSxRQUFRO2lCQUNsQjthQUNBLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQztJQUNkLENBQUM7QUFDTCxDQUFDO0FBaENELGtDQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZSwgRXZlbnREYXRhfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlLWFycmF5JztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9mcmFtZSc7XG5cbmltcG9ydCB7IEJvdHRvbU5hdmlnYXRpb24sIEJvdHRvbU5hdmlnYXRpb25UYWIsIE9uVGFiU2VsZWN0ZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWJvdHRvbS1uYXZpZ2F0aW9uXCI7XG4gXG5cbmNvbnN0IHJvdXRlcyA9IHJlcXVpcmUoXCJ+L3NoYXJlZC9yb3V0ZXMuanNvblwiKTtcblxuXG5jbGFzcyBWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxufS8vdmlld21vZGVsXG5cbmxldCB2aWV3bW9kZWwgPSBuZXcgVmlld01vZGVsKCk7XG5cbmxldCBwYWdlTG9hZGVkID0gKGFyZ3M6IEV2ZW50RGF0YSkgPT4ge1xuICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG5cbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdmlld21vZGVsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm90dG9tTmF2aWdhdGlvbkxvYWRlZChhcmdzKSB7XG4gICAgbGV0IGJvdHRvbU5hdmlnYXRpb246IEJvdHRvbU5hdmlnYXRpb24gPSBhcmdzLm9iamVjdDtcbiAgICBib3R0b21OYXZpZ2F0aW9uLm9uKCd0YWJTZWxlY3RlZCcsIHRhYlNlbGVjdGVkKTtcbiAgfVxuXG5leHBvcnQgZnVuY3Rpb24gdGFiU2VsZWN0ZWQoYXJnczogT25UYWJTZWxlY3RlZEV2ZW50RGF0YSkge1xuY29uc29sZS5sb2coJ3RhYiB3YXMgJyArIGFyZ3MubmV3SW5kZXgpO1xuICAgIHN3aXRjaChhcmdzLm5ld0luZGV4KXtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY29uc3Qgdmlld19wcm9ncmVzc19wYWdlID0gYXJncy5vYmplY3QucGFnZTsgLy8gWWVzISBhcmdzLm9iamVjdC5wYWdlIGlzIGEgdGhpbmcuIFxuICAgICAgICAgICAgdmlld19wcm9ncmVzc19wYWdlLmZyYW1lLm5hdmlnYXRlKHtcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6IHJvdXRlcy52aWV3UHJvZ3Jlc3MsIFxuICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAvLyBTZXQgdXAgYSB0cmFuc2l0aW9uIHByb3BlcnR5IG9uIHBhZ2UgbmF2aWdhdGlvbi5cbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlUmlnaHRcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzgwLFxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VJblwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjb25zdCBhZGRfcHJvZ3Jlc3NfcGFnZSA9IGFyZ3Mub2JqZWN0LnBhZ2U7IC8vIFllcyEgYXJncy5vYmplY3QucGFnZSBpcyBhIHRoaW5nLiBcbiAgICAgICAgICAgIGFkZF9wcm9ncmVzc19wYWdlLmZyYW1lLm5hdmlnYXRlKHtcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6IHJvdXRlcy5hZGRQcm9ncmVzcywgXG4gICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXG4gICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgIC8vIFNldCB1cCBhIHRyYW5zaXRpb24gcHJvcGVydHkgb24gcGFnZSBuYXZpZ2F0aW9uLlxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzODAsXG4gICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZUluXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5leHBvcnQgeyBwYWdlTG9hZGVkIH0iXX0=