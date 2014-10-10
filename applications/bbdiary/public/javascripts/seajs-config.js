/**
 * @author SL.
 * @description
 * 2014/10/10
 */
'use strict';


seajs.config({

    // Sea.js 的基础路径
    base: '/javascripts/spm_modules',

    // 文件编码
    charset: 'utf-8'
});

seajs.data.debug && seajs.config({
    alias: {
        jquery: "jquery/2.1.1/jquery"
    }
});