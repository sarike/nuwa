/**
 * @author SL.
 * @description
 * 2014/9/5
 */
'use strict';
var express = require('express');
var path = require("path");
var APP_PATH = "../../applications";

var router = express.Router();

module.exports = {

    router: router,

    applications:{

    },

    /**
     * 清除模块缓存
     * @param id
     */
    clear: function (id) {
        var curModule = null,
            self = this;
        if (typeof id !== "string" || !(curModule = require.cache[id])) return;

        if (curModule.children && curModule.children.length > 0) {
            // 存在子模块, 先清除子模块缓存
            curModule.children.forEach(function (cM) {
                self.clear(cM.id);
            });
        }
        // 清除当前模块缓存
        delete require.cache[id];
    },

    /**
     * 加载一个 application
     * @param appName application 的名称，必须与所在的目录一致，并且位于 APP_PATH 中
     * @param callback
     */
    loadApplications: function (appName, callback) {
        var messages = {};

        if (!appName) {
            messages.loadMessage = "请指定一个正确的应用名称";
            callback(messages);
            return;
        }
        if (appName in this.applications) {
            messages.loadMessage = "应用已经加载，无需重复加载";
            callback(messages);
            return;
        }
        var url = "/" + appName;
        var appModulePath = this.appModulePath(appName),
            application = require(appModulePath);
        this.router.use(url, application);
        this.applications[appName] = application;
        callback();
    },

    /**
     * 卸载一个 application
     * @param appName
     */
    unLoadApplications: function (appName) {
        var appModulePath = this.appModulePath(appName),
            application = require(appModulePath);
        for (var i = 0; i< this.router.stack.length; i++) {
            if (application === this.router.stack[i].handle) {
                this.router.stack.splice(i, 1);
            }
        }

        this.clear(require.resolve(appModulePath));
        delete this.applications[appName];
    },

    /**
     * 重新加载一个 application
     * @param appName
     */
    reLoadApplications: function (appName) {
        this.unLoadApplications(appName);
        this.loadApplications(appName);
    },

    /**
     * application 对应的node模块目录
     * @param appName
     * @returns {*}
     */
    appModulePath: function (appName) {
        return path.join(APP_PATH,  appName);
    }

};
