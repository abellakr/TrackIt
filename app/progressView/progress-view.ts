import {Observable, EventData, fromObject} from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { Page } from 'ui/frame';
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view"; 
const routes = require("~/shared/routes.json");


import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from "nativescript-bottom-navigation";


class Item {
    name: string;
    id: string;

    constructor(name: string) {
        this.name = name;
        this.id = new Date().getTime().toString();
    }
}

class ViewModel extends Observable {
    items: ObservableArray<Item>
    newItem: string = ''
    averageWeight: string = ''
    allWeights = [];

    constructor() {
        super();

        this.items = new ObservableArray<Item> ([
            // new Item('item1'),
            // new Item('item2')
        ])

        this.averageWeight = '0.0 lbs'

    }

    addItem() {
        this.items.reverse();
        this.items.push(new Item(this.newItem));
        this.items.reverse();
        this.set('newItem', '');
    }

    onAdd(args) {
        const page = args.object.page; // Yes! args.object.page is a thing. 
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
    }

    public addNavigatedItem(args){
        var newitem = parseFloat(args);
        var roundedItem = newitem.toFixed(1);

        this.items.reverse();
        this.items.push(new Item(roundedItem+" lbs"));
        this.items.reverse();

        //average the weights
        this.allWeights.push(parseFloat(args));
        let sum = 0;
        for(var i = 0; i < this.allWeights.length; i++){
            sum += this.allWeights[i];
        }
        let avg = sum / this.allWeights.length;
        this.set('averageWeight',avg.toFixed(1)+" lbs");
    
    }

}//viewmodel

let viewmodel = new ViewModel();

let pageLoaded = (args: EventData) => {
    let page = <Page>args.object;

    page.bindingContext = viewmodel;    
}

export function onNavigatingTo(args: EventData): void {
    const page: Page = <Page>args.object;
    // You can access `info` property from the navigationEntry
    const context: any = page.navigationContext;

    if(typeof context != 'undefined'){
        var newData = parseFloat(context.info);
        viewmodel.addNavigatedItem(newData+"\tlbs")
    }

} 

export { pageLoaded }


// export function bottomNavigationLoaded(args) {
//     let bottomNavigation: BottomNavigation = args.object;
//     bottomNavigation.on('tabSelected', tabSelected);
//   }

// export function tabSelected(args: OnTabSelectedEventData) {
// console.log('tab was ' + args.newIndex);
// switch(args.newIndex){
//     case 1:
//         const add_progress_page = args.object.page; // Yes! args.object.page is a thing. 
//         add_progress_page.frame.navigate({
//         moduleName: routes.addProgress, 
//         clearHistory: true,
//         animated: true,
//         // Set up a transition property on page navigation.
//         transition: {
//             name: "slideLeft",
//             duration: 380,
//             curve: "easeIn"
//         }
//         }); 
//         break;
//     case 2:
//         const settings_page = args.object.page; // Yes! args.object.page is a thing. 
//         settings_page.frame.navigate({
//         moduleName: routes.settings, 
//         clearHistory: true,
//         animated: true,
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
