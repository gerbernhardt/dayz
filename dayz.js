/*
* 2015 by German Bernhardt
* E-mail: <german.bernhardt@gmail.com>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License.
*/
console.log('> Glitch for DayZ Standalone');
console.log('> Autor: <german.bernhardt@gmail.com>');


const LIB = '../lib64/';
const wapi = require(LIB + 'wapi.node');
const WAPI = require(LIB + 'wapi.js');
const cv = require(LIB + 'cv.node');
const CV = require(LIB + 'cv.js');
const gdi = require(LIB + 'gdiplus.node');

var cmd = true;
var process = false;
var left = false;
var middle = false;
var right = false;
var automatic = false;
var delay = 1000000;

var main = {
    process : function() {
        var p = wapi.getListProcessId();
        var name = 'DayZ_x64.exe';
        if(p[name]) {
            var handle = wapi.openProcess(p[name]);
            if(process == false) {
                process = true;
                wapi.suspendProcess(handle);
                console.log('DayZ  Stop! pid: ' + p[name])
            } else {
                process = false;
                wapi.resumeProcess(handle);
                console.log('DayZ  Resume! pid: ' + p[name]);
            }
        }
        wapi.usleep(delay);
    },

    left : function() {
        if(!left) {
            left = true;
            wapi.mouseEvent(WAPI.MOUSE_LEFTDOWN, 0, 0, 0, 0);
        } else {
            left = false;
            wapi.mouseEvent(WAPI.MOUSE_LEFTUP, 0, 0, 0, 0);
        }
        wapi.usleep(delay);
    },

    middle : function() {
        wapi.sendkeys('9');
        wapi.usleep(delay);
    },

    right : function() {
        if(!right) {
            right = true;
            wapi.mouseEvent(WAPI.MOUSE_RIGHTDOWN, 0, 0, 0, 0);
        } else {
            right = false;
            wapi.mouseEvent(WAPI.MOUSE_RIGHTUP, 0, 0, 0, 0);
        }
        wapi.usleep(delay);
    },

    help : function() {
        console.log('\n\tCRL + P: Suspend & Resume Process');
        console.log('\n\tCRL + U: Click mouse left');
        console.log('\n\tCRL + I: Keypress 9, configure game for run!');
        console.log('\n\tCRL + O: Click mouse right');
        console.log('\n\tCRL + F12: Exit\n');
        wapi.usleep(delay);
    },

    automatic : function() {
        if(!automatic) {
            automatic = true;
            wapi.mouseEvent(WAPI.MOUSE_MIDDLEDOWN, 0, 0, 0, 0);
        } else {
            automatic = false;
            wapi.mouseEvent(WAPI.MOUSE_MIDDLEUP, 0, 0, 0, 0);
        }
        wapi.usleep(delay);
    }
}

while(true) {
    if(wapi.getKeyState(WAPI.VK_CONTROL) && wapi.getKeyState(WAPI.VK_F12)) break;
    if(wapi.getKeyState(WAPI.VK_CONTROL) && wapi.getKeyState(WAPI.VK_0)) {
        if(!cmd) {
            cmd = true;
            wapi.sendkeys("{BEEP 900 200}{BEEP 900 200}");
            console.log('Command active!');
        } else {
            cmd = false;
            wapi.sendkeys("{BEEP 900 200}");
            console.log('Command block!');
        }
        wapi.usleep(delay);
    }
    if(cmd) {
        if(wapi.getKeyState(WAPI.VK_CONTROL) && wapi.getKeyState(WAPI.VK_P)) main.process();
        if(wapi.getKeyState(WAPI.VK_CONTROL) && wapi.getKeyState(WAPI.VK_U)) main.left();
        if(wapi.getKeyState(WAPI.VK_CONTROL) && wapi.getKeyState(WAPI.VK_I)) main.middle();
        if(wapi.getKeyState(WAPI.VK_CONTROL) && wapi.getKeyState(WAPI.VK_O)) main.right();
        if(wapi.getKeyState(WAPI.VK_CONTROL) && wapi.getKeyState(WAPI.VK_H)) main.help();
        if(wapi.getKeyState(WAPI.VK_L)) main.automatic();
    }
}