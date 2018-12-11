import { EventData, fromObject } from 'data/observable';
import { Page } from 'ui/page';
import * as imageSourceModule from "image-source";
import * as imagepicker from "nativescript-imagepicker";
import * as dialogs from "tns-core-modules/ui/dialogs";
const getFrameById = require("tns-core-modules/ui/frame").getFrameById;
import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from "nativescript-bottom-navigation";

const routes = require("~/shared/routes.json");

const ModalPicker = require("nativescript-modal-datetimepicker")
  .ModalDatetimepicker;

const picker = new ModalPicker();
var page;
var fs = require("file-system");

//grab image
let viewModel = fromObject({
    // myImage: "https://i0.wp.com/hifadhiafrica.org/wp-content/uploads/2017/01/default-placeholder.png",
    data: "",
    weight_input: "",
    weight_input_hint: "200",
    calorie_input: "",
    calorie_input_hint: "2350",
    paths: "",
    currDate: "May 20, 2018",
    getPicture: function(args: EventData) {
        let image = page.getViewById("image");
        console.log("fuck")
        var that = this;
        var milliseconds = (new Date).getTime();
        let context = imagepicker.create({
            mode:"single"
        });
        context.authorize().then(() =>{
                return context.present();
        })
        .then((selection) => {
            selection.forEach(function(selected){
                imageSourceModule.fromAsset(selected).then(function(imagesource) {
                    let folder = fs.knownFolders.documents();
                    var path = fs.path.join(folder.path, milliseconds+".png");
                    var saved = imagesource.saveToFile(path,"png"); 
                    image.src = path;
                })
            })
        })
    },
    selectDate: function(args: EventData) {
        let that = this;
        picker
        .pickDate({
          title: "select the date of weigh-in",
          theme: "light",
          maxDate: new Date()
        })
        .then(result => {
        //   Note the month is 1-12 (unlike js which is 0-11)
      let month = "";
      switch(result.month) {
        case 1:
            month = "Jan"
            break;
        case 2:
            month = "Feb"
            break;
        case 3:
            month = "March"
            break;
        case 4:
            month = "April"
            break;
        case 5:
            month = "May"
            break;
        case 6:
            month = "June"
            break;
        case 7:
            month = "July"
            break;
        case 8:
            month = "Aug"
            break;
        case 9:
            month = "Sept"
            break;
        case 10:
            month = "Oct"
            break;
        case 11:
            month = "Nov"
            break;
        case 12:
            month = "Dec"
            break;
      }
        this.set('currDate', month +" "+result.day + "," + result.year);
          var jsdate = new Date(result.year, result.month - 1, result.day)
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    onCancel: function(args) {
        dialogs.confirm({
            title: "Confirm",
            message: "Are you sure you want to cancel this progress?",
            okButtonText: "Confirm",
            cancelButtonText: "Cancel",
        }).then(result => {
            if(result){
                const page = args.object.page; // Yes! args.object.page is a thing. 
                page.frame.navigate({
                    moduleName: routes.progressView, 
                    clearHistory: true,
                });
            }
        });
    },
    onSave: function(args) {
        dialogs.confirm({
            title: "confirm",
            message: "Are you sure you want to save this progress?",
            okButtonText: "Confirm",
            cancelButtonText: "Cancel",
        }).then(result => {
            if(result){
                if(this.weight_input != ""){
                    var new_hint_weight = this.weight_input;
                    var new_hint_calories = this.calorie_input;

                    //set our hints to the previous entries
                    this.set('weight_input_hint', new_hint_weight);
                    this.set('calorie_input_hint', new_hint_calories);
                    this.set('data', new_hint_weight);

                    //reset weight textfields
                    this.set('weight_input', "");
                    this.set('calorie_input', "");
                    
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
                    
                    console.log("info: "+this.data); 
                    const page = args.object.page; // Yes! args.object.page is a thing. 
                    page.frame.navigate({
                        moduleName: routes.progressView,
                        clearHistory: true,
                        animated: true,
                        // Set up a transition property on page navigation.
                        transition: {
                            name: "slideRight",
                            duration: 380,
                            curve: "easeIn"
                        },
                        context:{
                            info: this.data,
                        }
                    });
                }else{
                    alert("you need to enter your weight to save your progress! try again");
                }
            }
        });
    }
})

function pageLoaded (args: EventData) {
    page = <Page>args.object;

    page.bindingContext = viewModel;
}//here we are loading the page 

// export function bottomNavigationLoaded(args) {
//     let bottomNavigation: BottomNavigation = args.object;
//     bottomNavigation.on('tabSelected', tabSelected);
//   }

// export function tabSelected(args: OnTabSelectedEventData) {
// console.log('tab was ' + args.newIndex);
// switch(args.newIndex){
//     case 0:
//         const view_progress_page = args.object.page; // Yes! args.object.page is a thing. 
//         view_progress_page.frame.navigate({
//         moduleName: routes.progressView, 
//         clearHistory: true,
//         animated: true,
//         // Set up a transition property on page navigation.
//         transition: {
//             name: "slideRight",
//             duration: 380,
//             curve: "easeIn"
//         }
//         });
//         break;
//     case 2:
//         const settings = args.object.page; // Yes! args.object.page is a thing. 
//         settings.frame.navigate({
//         moduleName: routes.settings, 
//         clearHistory: true,        animated: true,
//         // Set up a transition property on page navigation.
//         transition: {
//             name: "slideLeft",
//             duration: 380,
//             curve: "easeIn"
//         }
//         });
//         break;
//     }
// }

export { pageLoaded }



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
  
