import {Observable, EventData} from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { Page } from 'ui/frame';

import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from "nativescript-bottom-navigation";
 

const routes = require("~/shared/routes.json");


class ViewModel extends Observable {

}//viewmodel

let viewmodel = new ViewModel();

let pageLoaded = (args: EventData) => {
    let page = <Page>args.object;

    page.bindingContext = viewmodel;
}

export function bottomNavigationLoaded(args) {
    let bottomNavigation: BottomNavigation = args.object;
    bottomNavigation.on('tabSelected', tabSelected);
  }

export function tabSelected(args: OnTabSelectedEventData) {
console.log('tab was ' + args.newIndex);
    switch(args.newIndex){
        case 0:
            const view_progress_page = args.object.page; // Yes! args.object.page is a thing. 
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
            const add_progress_page = args.object.page; // Yes! args.object.page is a thing. 
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

export { pageLoaded }