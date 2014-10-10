/**
 * @author SL.
 * @description
 * 2014/10/10
 */
'use strict';


seajs.config({

    alias: {
        index: "index/0.0.1/index"
    },

    // Sea.js 的基础路径
    base: '/javascripts',

    // 文件编码
    charset: 'utf-8'
});

seajs.data.debug && seajs.config({
    alias: {
        index: "index/index"
    },
    base: '/javascripts/src'
});