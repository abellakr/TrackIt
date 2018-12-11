"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var imageSourceModule = require("image-source");
var imagepicker = require("nativescript-imagepicker");
var dialogs = require("tns-core-modules/ui/dialogs");
var getFrameById = require("tns-core-modules/ui/frame").getFrameById;
var routes = require("~/shared/routes.json");
var ModalPicker = require("nativescript-modal-datetimepicker")
    .ModalDatetimepicker;
var picker = new ModalPicker();
var page;
var fs = require("file-system");
//grab image
var viewModel = observable_1.fromObject({
    // myImage: "https://i0.wp.com/hifadhiafrica.org/wp-content/uploads/2017/01/default-placeholder.png",
    data: "",
    weight_input: "",
    weight_input_hint: "200",
    calorie_input: "",
    calorie_input_hint: "2350",
    paths: "",
    currDate: "May 20, 2018",
    getPicture: function (args) {
        var image = page.getViewById("image");
        console.log("fuck");
        var that = this;
        var milliseconds = (new Date).getTime();
        var context = imagepicker.create({
            mode: "single"
        });
        context.authorize().then(function () {
            return context.present();
        })
            .then(function (selection) {
            selection.forEach(function (selected) {
                imageSourceModule.fromAsset(selected).then(function (imagesource) {
                    var folder = fs.knownFolders.documents();
                    var path = fs.path.join(folder.path, milliseconds + ".png");
                    var saved = imagesource.saveToFile(path, "png");
                    image.src = path;
                });
            });
        });
    },
    selectDate: function (args) {
        var _this = this;
        var that = this;
        picker
            .pickDate({
            title: "select the date of weigh-in",
            theme: "light",
            maxDate: new Date()
        })
            .then(function (result) {
            //   Note the month is 1-12 (unlike js which is 0-11)
            var month = "";
            switch (result.month) {
                case 1:
                    month = "Jan";
                    break;
                case 2:
                    month = "Feb";
                    break;
                case 3:
                    month = "March";
                    break;
                case 4:
                    month = "April";
                    break;
                case 5:
                    month = "May";
                    break;
                case 6:
                    month = "June";
                    break;
                case 7:
                    month = "July";
                    break;
                case 8:
                    month = "Aug";
                    break;
                case 9:
                    month = "Sept";
                    break;
                case 10:
                    month = "Oct";
                    break;
                case 11:
                    month = "Nov";
                    break;
                case 12:
                    month = "Dec";
                    break;
            }
            _this.set('currDate', month + " " + result.day + "," + result.year);
            var jsdate = new Date(result.year, result.month - 1, result.day);
        })
            .catch(function (error) {
            console.log("Error: " + error);
        });
    },
    onCancel: function (args) {
        dialogs.confirm({
            title: "Confirm",
            message: "Are you sure you want to cancel this progress?",
            okButtonText: "Confirm",
            cancelButtonText: "Cancel",
        }).then(function (result) {
            if (result) {
                var page_1 = args.object.page; // Yes! args.object.page is a thing. 
                page_1.frame.navigate({
                    moduleName: routes.progressView,
                    clearHistory: true,
                });
            }
        });
    },
    onSave: function (args) {
        var _this = this;
        dialogs.confirm({
            title: "confirm",
            message: "Are you sure you want to save this progress?",
            okButtonText: "Confirm",
            cancelButtonText: "Cancel",
        }).then(function (result) {
            if (result) {
                if (_this.weight_input != "") {
                    var new_hint_weight = _this.weight_input;
                    var new_hint_calories = _this.calorie_input;
                    //set our hints to the previous entries
                    _this.set('weight_input_hint', new_hint_weight);
                    _this.set('calorie_input_hint', new_hint_calories);
                    _this.set('data', new_hint_weight);
                    //reset weight textfields
                    _this.set('weight_input', "");
                    _this.set('calorie_input', "");
                    // const navigationEntry = {
                    //     moduleName: routes.progressView,
                    //     context:{ 
                    //                 info: this.data 
                    //     },
                    //     animated: false,
                    //     clearHistory: true
                    // };
                    // console.log("info: "+this.data);
                    // const page = args.object.page; // Yes! args.object.page is a thing. 
                    // page.frame.navigate(navigationEntry);
                    console.log("info: " + _this.data);
                    var page_2 = args.object.page; // Yes! args.object.page is a thing. 
                    page_2.frame.navigate({
                        moduleName: routes.progressView,
                        clearHistory: true,
                        animated: true,
                        // Set up a transition property on page navigation.
                        transition: {
                            name: "slideRight",
                            duration: 380,
                            curve: "easeIn"
                        },
                        context: {
                            info: _this.data,
                        }
                    });
                }
                else {
                    alert("you need to enter your weight to save your progress! try again");
                }
            }
        });
    }
});
function pageLoaded(args) {
    page = args.object;
    page.bindingContext = viewModel;
} //here we are loading the page 
exports.pageLoaded = pageLoaded;
// // Pick Time
// exports.selectTime = function() {
//     picker
//       .pickTime()
//       .then(result => {
//         console.log("Time is: " + result.hour + ":" + result.minute);
//       })
//       .catch(error => {
//         console.log("Error: " + error);
//       });
//   };
// exports.getPicture = function() {
//     let myImage = page.getViewById("myImage");
//         var milliseconds = (new Date).getTime();
//         let context = imagepicker.create({
//             mode:"single"
//         });
//         context.authorize().then(() =>{
//                 return context.present();
//         })
//         .then((selection) => {
//             selection.forEach(function(selected){
//                 imageSourceModule.fromAsset(selected).then(function(imagesource) {
//                     let folder = fs.knownFolders.documents();
//                     var path = fs.path.join(folder.path, milliseconds+".png");
//                     var saved = imagesource.saveToFile(path,"png");
//                     myImage.src = path;
//                 })
//             })
//         })
//     }   
// // Pick Date
// exports.selectDate = function() {
//     let currDate = page.getViewById('currDate');
//   picker
//     .pickDate({
//       title: "select the date of weigh-in",
//       theme: "light",
//       maxDate: new Date()
//     })
//     .then(result => {
//       // Note the month is 1-12 (unlike js which is 0-11)
//       let month = "";
//       switch(result.month) {
//         case 1:
//             month = "Jan"
//             break;
//         case 2:
//             month = "Feb"
//             break;
//         case 3:
//             month = "March"
//             break;
//         case 4:
//             month = "April"
//             break;
//         case 5:
//             month = "May"
//             break;
//         case 6:
//             month = "June"
//             break;
//         case 7:
//             month = "July"
//             break;
//         case 8:
//             month = "Aug"
//             break;
//         case 9:
//             month = "Sept"
//             break;
//         case 10:
//             month = "Oct"
//             break;
//         case 11:
//             month = "Nov"
//             break;
//         case 12:
//             month = "Dec"
//             break;
//       }
//       currDate.text = month +" "+result.day + "," + result.year
//       var jsdate = new Date(result.year, result.month - 1, result.day);
//     })
//     .catch(error => {
//       console.log("Error: " + error);
//     });
// };
// export function onCancel(args: EventData) {
//     alert("Cancelling...");
// }
// export function onSave(args: EventData) {
//     alert("Progress was successfully saved!");
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXByb2dyZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLXByb2dyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQXdEO0FBRXhELGdEQUFrRDtBQUNsRCxzREFBd0Q7QUFDeEQscURBQXVEO0FBQ3ZELElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUd2RSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUvQyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUM7S0FDN0QsbUJBQW1CLENBQUM7QUFFdkIsSUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUNqQyxJQUFJLElBQUksQ0FBQztBQUNULElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUVoQyxZQUFZO0FBQ1osSUFBSSxTQUFTLEdBQUcsdUJBQVUsQ0FBQztJQUN2QixxR0FBcUc7SUFDckcsSUFBSSxFQUFFLEVBQUU7SUFDUixZQUFZLEVBQUUsRUFBRTtJQUNoQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLGtCQUFrQixFQUFFLE1BQU07SUFDMUIsS0FBSyxFQUFFLEVBQUU7SUFDVCxRQUFRLEVBQUUsY0FBYztJQUN4QixVQUFVLEVBQUUsVUFBUyxJQUFlO1FBQ2hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDN0Is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QjtBQUNsQiw4QkFBOEI7QUFDOUIscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUNsQiw0QkFBNEI7QUFDNUIscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUNsQiw2QkFBNkI7QUFDN0IscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUNsQiw2QkFBNkI7QUFDN0IscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUNsQiw0QkFBNEI7QUFDNUIscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUNsQiw2QkFBNkI7QUFDN0IscUJBQXFCO0FBQ3JCLG1CQUFtQjtBQUNuQiw0QkFBNEI7QUFDNUIscUJBQXFCO0FBQ3JCLG1CQUFtQjtBQUNuQiw0QkFBNEI7QUFDNUIscUJBQXFCO0FBQ3JCLG1CQUFtQjtBQUNuQiw0QkFBNEI7QUFDNUIscUJBQXFCO0FBQ3JCLFVBQVU7QUFDVixrRUFBa0U7QUFDbEUsMEVBQTBFO0FBQzFFLFNBQVM7QUFDVCx3QkFBd0I7QUFDeEIsd0NBQXdDO0FBQ3hDLFVBQVU7QUFDVixLQUFLO0FBRUwsOENBQThDO0FBQzlDLDhCQUE4QjtBQUM5QixJQUFJO0FBRUosNENBQTRDO0FBQzVDLGlEQUFpRDtBQUNqRCxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhLCBmcm9tT2JqZWN0IH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCAqIGFzIGltYWdlU291cmNlTW9kdWxlIGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGltYWdlcGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuY29uc3QgZ2V0RnJhbWVCeUlkID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIikuZ2V0RnJhbWVCeUlkO1xuaW1wb3J0IHsgQm90dG9tTmF2aWdhdGlvbiwgQm90dG9tTmF2aWdhdGlvblRhYiwgT25UYWJTZWxlY3RlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYm90dG9tLW5hdmlnYXRpb25cIjtcblxuY29uc3Qgcm91dGVzID0gcmVxdWlyZShcIn4vc2hhcmVkL3JvdXRlcy5qc29uXCIpO1xuXG5jb25zdCBNb2RhbFBpY2tlciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIilcbiAgLk1vZGFsRGF0ZXRpbWVwaWNrZXI7XG5cbmNvbnN0IHBpY2tlciA9IG5ldyBNb2RhbFBpY2tlcigpO1xudmFyIHBhZ2U7XG52YXIgZnMgPSByZXF1aXJlKFwiZmlsZS1zeXN0ZW1cIik7XG5cbi8vZ3JhYiBpbWFnZVxubGV0IHZpZXdNb2RlbCA9IGZyb21PYmplY3Qoe1xuICAgIC8vIG15SW1hZ2U6IFwiaHR0cHM6Ly9pMC53cC5jb20vaGlmYWRoaWFmcmljYS5vcmcvd3AtY29udGVudC91cGxvYWRzLzIwMTcvMDEvZGVmYXVsdC1wbGFjZWhvbGRlci5wbmdcIixcbiAgICBkYXRhOiBcIlwiLFxuICAgIHdlaWdodF9pbnB1dDogXCJcIixcbiAgICB3ZWlnaHRfaW5wdXRfaGludDogXCIyMDBcIixcbiAgICBjYWxvcmllX2lucHV0OiBcIlwiLFxuICAgIGNhbG9yaWVfaW5wdXRfaGludDogXCIyMzUwXCIsXG4gICAgcGF0aHM6IFwiXCIsXG4gICAgY3VyckRhdGU6IFwiTWF5IDIwLCAyMDE4XCIsXG4gICAgZ2V0UGljdHVyZTogZnVuY3Rpb24oYXJnczogRXZlbnREYXRhKSB7XG4gICAgICAgIGxldCBpbWFnZSA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJpbWFnZVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJmdWNrXCIpXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IChuZXcgRGF0ZSkuZ2V0VGltZSgpO1xuICAgICAgICBsZXQgY29udGV4dCA9IGltYWdlcGlja2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBtb2RlOlwic2luZ2xlXCJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRleHQuYXV0aG9yaXplKCkudGhlbigoKSA9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5wcmVzZW50KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKHNlbGVjdGVkKXtcbiAgICAgICAgICAgICAgICBpbWFnZVNvdXJjZU1vZHVsZS5mcm9tQXNzZXQoc2VsZWN0ZWQpLnRoZW4oZnVuY3Rpb24oaW1hZ2Vzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBmcy5wYXRoLmpvaW4oZm9sZGVyLnBhdGgsIG1pbGxpc2Vjb25kcytcIi5wbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzYXZlZCA9IGltYWdlc291cmNlLnNhdmVUb0ZpbGUocGF0aCxcInBuZ1wiKTsgXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IHBhdGg7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBzZWxlY3REYXRlOiBmdW5jdGlvbihhcmdzOiBFdmVudERhdGEpIHtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBwaWNrZXJcbiAgICAgICAgLnBpY2tEYXRlKHtcbiAgICAgICAgICB0aXRsZTogXCJzZWxlY3QgdGhlIGRhdGUgb2Ygd2VpZ2gtaW5cIixcbiAgICAgICAgICB0aGVtZTogXCJsaWdodFwiLFxuICAgICAgICAgIG1heERhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgLy8gICBOb3RlIHRoZSBtb250aCBpcyAxLTEyICh1bmxpa2UganMgd2hpY2ggaXMgMC0xMSlcbiAgICAgIGxldCBtb250aCA9IFwiXCI7XG4gICAgICBzd2l0Y2gocmVzdWx0Lm1vbnRoKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIG1vbnRoID0gXCJKYW5cIlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIG1vbnRoID0gXCJGZWJcIlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIG1vbnRoID0gXCJNYXJjaFwiXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgbW9udGggPSBcIkFwcmlsXCJcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICBtb250aCA9IFwiTWF5XCJcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICBtb250aCA9IFwiSnVuZVwiXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgbW9udGggPSBcIkp1bHlcIlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgIG1vbnRoID0gXCJBdWdcIlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIG1vbnRoID0gXCJTZXB0XCJcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgbW9udGggPSBcIk9jdFwiXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgIG1vbnRoID0gXCJOb3ZcIlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICBtb250aCA9IFwiRGVjXCJcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgICB0aGlzLnNldCgnY3VyckRhdGUnLCBtb250aCArXCIgXCIrcmVzdWx0LmRheSArIFwiLFwiICsgcmVzdWx0LnllYXIpO1xuICAgICAgICAgIHZhciBqc2RhdGUgPSBuZXcgRGF0ZShyZXN1bHQueWVhciwgcmVzdWx0Lm1vbnRoIC0gMSwgcmVzdWx0LmRheSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvbkNhbmNlbDogZnVuY3Rpb24oYXJncykge1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiQ29uZmlybVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsIHRoaXMgcHJvZ3Jlc3M/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQ29uZmlybVwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gYXJncy5vYmplY3QucGFnZTsgLy8gWWVzISBhcmdzLm9iamVjdC5wYWdlIGlzIGEgdGhpbmcuIFxuICAgICAgICAgICAgICAgIHBhZ2UuZnJhbWUubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiByb3V0ZXMucHJvZ3Jlc3NWaWV3LCBcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG9uU2F2ZTogZnVuY3Rpb24oYXJncykge1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiY29uZmlybVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc2F2ZSB0aGlzIHByb2dyZXNzP1wiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkNvbmZpcm1cIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53ZWlnaHRfaW5wdXQgIT0gXCJcIil7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdfaGludF93ZWlnaHQgPSB0aGlzLndlaWdodF9pbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld19oaW50X2NhbG9yaWVzID0gdGhpcy5jYWxvcmllX2lucHV0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IG91ciBoaW50cyB0byB0aGUgcHJldmlvdXMgZW50cmllc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCgnd2VpZ2h0X2lucHV0X2hpbnQnLCBuZXdfaGludF93ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCgnY2Fsb3JpZV9pbnB1dF9oaW50JywgbmV3X2hpbnRfY2Fsb3JpZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCgnZGF0YScsIG5ld19oaW50X3dlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9yZXNldCB3ZWlnaHQgdGV4dGZpZWxkc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCgnd2VpZ2h0X2lucHV0JywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdjYWxvcmllX2lucHV0JywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuYXZpZ2F0aW9uRW50cnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBtb2R1bGVOYW1lOiByb3V0ZXMucHJvZ3Jlc3NWaWV3LFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29udGV4dDp7IFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgaW5mbzogdGhpcy5kYXRhIFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGFuaW1hdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNsZWFySGlzdG9yeTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImluZm86IFwiK3RoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHBhZ2UgPSBhcmdzLm9iamVjdC5wYWdlOyAvLyBZZXMhIGFyZ3Mub2JqZWN0LnBhZ2UgaXMgYSB0aGluZy4gXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhZ2UuZnJhbWUubmF2aWdhdGUobmF2aWdhdGlvbkVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5mbzogXCIrdGhpcy5kYXRhKTsgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBhcmdzLm9iamVjdC5wYWdlOyAvLyBZZXMhIGFyZ3Mub2JqZWN0LnBhZ2UgaXMgYSB0aGluZy4gXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UuZnJhbWUubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogcm91dGVzLnByb2dyZXNzVmlldyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHVwIGEgdHJhbnNpdGlvbiBwcm9wZXJ0eSBvbiBwYWdlIG5hdmlnYXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDM4MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlSW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm86IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwieW91IG5lZWQgdG8gZW50ZXIgeW91ciB3ZWlnaHQgdG8gc2F2ZSB5b3VyIHByb2dyZXNzISB0cnkgYWdhaW5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59KVxuXG5mdW5jdGlvbiBwYWdlTG9hZGVkIChhcmdzOiBFdmVudERhdGEpIHtcbiAgICBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG5cbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdmlld01vZGVsO1xufS8vaGVyZSB3ZSBhcmUgbG9hZGluZyB0aGUgcGFnZSBcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGJvdHRvbU5hdmlnYXRpb25Mb2FkZWQoYXJncykge1xuLy8gICAgIGxldCBib3R0b21OYXZpZ2F0aW9uOiBCb3R0b21OYXZpZ2F0aW9uID0gYXJncy5vYmplY3Q7XG4vLyAgICAgYm90dG9tTmF2aWdhdGlvbi5vbigndGFiU2VsZWN0ZWQnLCB0YWJTZWxlY3RlZCk7XG4vLyAgIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRhYlNlbGVjdGVkKGFyZ3M6IE9uVGFiU2VsZWN0ZWRFdmVudERhdGEpIHtcbi8vIGNvbnNvbGUubG9nKCd0YWIgd2FzICcgKyBhcmdzLm5ld0luZGV4KTtcbi8vIHN3aXRjaChhcmdzLm5ld0luZGV4KXtcbi8vICAgICBjYXNlIDA6XG4vLyAgICAgICAgIGNvbnN0IHZpZXdfcHJvZ3Jlc3NfcGFnZSA9IGFyZ3Mub2JqZWN0LnBhZ2U7IC8vIFllcyEgYXJncy5vYmplY3QucGFnZSBpcyBhIHRoaW5nLiBcbi8vICAgICAgICAgdmlld19wcm9ncmVzc19wYWdlLmZyYW1lLm5hdmlnYXRlKHtcbi8vICAgICAgICAgbW9kdWxlTmFtZTogcm91dGVzLnByb2dyZXNzVmlldywgXG4vLyAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcbi8vICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4vLyAgICAgICAgIC8vIFNldCB1cCBhIHRyYW5zaXRpb24gcHJvcGVydHkgb24gcGFnZSBuYXZpZ2F0aW9uLlxuLy8gICAgICAgICB0cmFuc2l0aW9uOiB7XG4vLyAgICAgICAgICAgICBuYW1lOiBcInNsaWRlUmlnaHRcIixcbi8vICAgICAgICAgICAgIGR1cmF0aW9uOiAzODAsXG4vLyAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlSW5cIlxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICBicmVhaztcbi8vICAgICBjYXNlIDI6XG4vLyAgICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXJncy5vYmplY3QucGFnZTsgLy8gWWVzISBhcmdzLm9iamVjdC5wYWdlIGlzIGEgdGhpbmcuIFxuLy8gICAgICAgICBzZXR0aW5ncy5mcmFtZS5uYXZpZ2F0ZSh7XG4vLyAgICAgICAgIG1vZHVsZU5hbWU6IHJvdXRlcy5zZXR0aW5ncywgXG4vLyAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSwgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuLy8gICAgICAgICAvLyBTZXQgdXAgYSB0cmFuc2l0aW9uIHByb3BlcnR5IG9uIHBhZ2UgbmF2aWdhdGlvbi5cbi8vICAgICAgICAgdHJhbnNpdGlvbjoge1xuLy8gICAgICAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcbi8vICAgICAgICAgICAgIGR1cmF0aW9uOiAzODAsXG4vLyAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlSW5cIlxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICBicmVhaztcbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCB7IHBhZ2VMb2FkZWQgfVxuXG5cblxuLy8gLy8gUGljayBUaW1lXG4vLyBleHBvcnRzLnNlbGVjdFRpbWUgPSBmdW5jdGlvbigpIHtcbi8vICAgICBwaWNrZXJcbi8vICAgICAgIC5waWNrVGltZSgpXG4vLyAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlRpbWUgaXM6IFwiICsgcmVzdWx0LmhvdXIgKyBcIjpcIiArIHJlc3VsdC5taW51dGUpO1xuLy8gICAgICAgfSlcbi8vICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xuLy8gICAgICAgfSk7XG4vLyAgIH07XG5cbi8vIGV4cG9ydHMuZ2V0UGljdHVyZSA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGxldCBteUltYWdlID0gcGFnZS5nZXRWaWV3QnlJZChcIm15SW1hZ2VcIik7XG4vLyAgICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSAobmV3IERhdGUpLmdldFRpbWUoKTtcbi8vICAgICAgICAgbGV0IGNvbnRleHQgPSBpbWFnZXBpY2tlci5jcmVhdGUoe1xuLy8gICAgICAgICAgICAgbW9kZTpcInNpbmdsZVwiXG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICBjb250ZXh0LmF1dGhvcml6ZSgpLnRoZW4oKCkgPT57XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucHJlc2VudCgpO1xuLy8gICAgICAgICB9KVxuLy8gICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiB7XG4vLyAgICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihzZWxlY3RlZCl7XG4vLyAgICAgICAgICAgICAgICAgaW1hZ2VTb3VyY2VNb2R1bGUuZnJvbUFzc2V0KHNlbGVjdGVkKS50aGVuKGZ1bmN0aW9uKGltYWdlc291cmNlKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBtaWxsaXNlY29uZHMrXCIucG5nXCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZWQgPSBpbWFnZXNvdXJjZS5zYXZlVG9GaWxlKHBhdGgsXCJwbmdcIik7XG4vLyAgICAgICAgICAgICAgICAgICAgIG15SW1hZ2Uuc3JjID0gcGF0aDtcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfSlcbiAgICBcbi8vICAgICB9ICAgXG5cbi8vIC8vIFBpY2sgRGF0ZVxuLy8gZXhwb3J0cy5zZWxlY3REYXRlID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgbGV0IGN1cnJEYXRlID0gcGFnZS5nZXRWaWV3QnlJZCgnY3VyckRhdGUnKTtcbiAgICBcbi8vICAgcGlja2VyXG4vLyAgICAgLnBpY2tEYXRlKHtcbi8vICAgICAgIHRpdGxlOiBcInNlbGVjdCB0aGUgZGF0ZSBvZiB3ZWlnaC1pblwiLFxuLy8gICAgICAgdGhlbWU6IFwibGlnaHRcIixcbi8vICAgICAgIG1heERhdGU6IG5ldyBEYXRlKClcbi8vICAgICB9KVxuLy8gICAgIC50aGVuKHJlc3VsdCA9PiB7XG4vLyAgICAgICAvLyBOb3RlIHRoZSBtb250aCBpcyAxLTEyICh1bmxpa2UganMgd2hpY2ggaXMgMC0xMSlcbi8vICAgICAgIGxldCBtb250aCA9IFwiXCI7XG4vLyAgICAgICBzd2l0Y2gocmVzdWx0Lm1vbnRoKSB7XG4vLyAgICAgICAgIGNhc2UgMTpcbi8vICAgICAgICAgICAgIG1vbnRoID0gXCJKYW5cIlxuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIGNhc2UgMjpcbi8vICAgICAgICAgICAgIG1vbnRoID0gXCJGZWJcIlxuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIGNhc2UgMzpcbi8vICAgICAgICAgICAgIG1vbnRoID0gXCJNYXJjaFwiXG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgY2FzZSA0OlxuLy8gICAgICAgICAgICAgbW9udGggPSBcIkFwcmlsXCJcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICBjYXNlIDU6XG4vLyAgICAgICAgICAgICBtb250aCA9IFwiTWF5XCJcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICBjYXNlIDY6XG4vLyAgICAgICAgICAgICBtb250aCA9IFwiSnVuZVwiXG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgY2FzZSA3OlxuLy8gICAgICAgICAgICAgbW9udGggPSBcIkp1bHlcIlxuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIGNhc2UgODpcbi8vICAgICAgICAgICAgIG1vbnRoID0gXCJBdWdcIlxuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIGNhc2UgOTpcbi8vICAgICAgICAgICAgIG1vbnRoID0gXCJTZXB0XCJcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICBjYXNlIDEwOlxuLy8gICAgICAgICAgICAgbW9udGggPSBcIk9jdFwiXG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgY2FzZSAxMTpcbi8vICAgICAgICAgICAgIG1vbnRoID0gXCJOb3ZcIlxuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIGNhc2UgMTI6XG4vLyAgICAgICAgICAgICBtb250aCA9IFwiRGVjXCJcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgfVxuLy8gICAgICAgY3VyckRhdGUudGV4dCA9IG1vbnRoICtcIiBcIityZXN1bHQuZGF5ICsgXCIsXCIgKyByZXN1bHQueWVhclxuLy8gICAgICAgdmFyIGpzZGF0ZSA9IG5ldyBEYXRlKHJlc3VsdC55ZWFyLCByZXN1bHQubW9udGggLSAxLCByZXN1bHQuZGF5KTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycm9yKTtcbi8vICAgICB9KTtcbi8vIH07XG4gXG4vLyBleHBvcnQgZnVuY3Rpb24gb25DYW5jZWwoYXJnczogRXZlbnREYXRhKSB7XG4vLyAgICAgYWxlcnQoXCJDYW5jZWxsaW5nLi4uXCIpO1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gb25TYXZlKGFyZ3M6IEV2ZW50RGF0YSkge1xuLy8gICAgIGFsZXJ0KFwiUHJvZ3Jlc3Mgd2FzIHN1Y2Nlc3NmdWxseSBzYXZlZCFcIik7XG4vLyB9XG4gIFxuIl19