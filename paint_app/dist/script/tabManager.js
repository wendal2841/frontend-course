"use strict";

class TabManager{
    constructor(){
        this.paintPanel = document.getElementById('paintPanel');

        this.tabArray = [];
        this.currentSettings = {
            color: "",
            size: "",
            isBrushStatus: "",
            figure: ""
        }
    }

    setCurrentSettings(settings){
        this.currentSettings = settings;
    }

    unActivateTab(tab){
        tab.unActivateTab();
    }

    activateTab(tab){
        this.tabArray.forEach((tab) => {
            this.unActivateTab(tab);
        });
        tab.activateTab();
    }

    addTab(){
        this.tabArray.forEach((tab) => {
            this.unActivateTab(tab);
        });
        let currentCount = this.tabArray.length;
        let tab = new PaintTab({color: this.currentSettings.color,
                            brushSize: this.currentSettings.size,
                            isBrushStatus: this.currentSettings.isBrushStatus,
                            figure: this.currentSettings.figure,
                            numId: currentCount+1,
                            parent: this.paintPanel});
        this.tabArray.push(tab);
    }
}