var mongoose = require('mongoose');

var BBDiarySchema = mongoose.Schema({
    babyName: String,
    babyBirthday:  { type: Date },
    babyGender: String,
    pageUrl: String,
    openDate: String,
    creator: String,
    adminList: Array
});

/**
 * 开通BBDairy
 * @param creator 开通者
 * @param callback 回调函数，参数列表：error, isHaveOpened, BBDiary
 */
BBDiarySchema.statics.openBBDiary = function (creator, callback) {
    var BBDiary = this;
    this.findOne({creator: creator}, function (error, bbdiary) {
        if (error) {
            callback(error);
            return;
        }

        if (!bbdiary) {
            bbdiary = new BBDiary({
                creator: creator,
                adminList: [creator]
            });
            bbdiary.save(function(error, bbdiary) {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, null, bbdiary);
            });
        } else {
            callback(null, true, bbdiary);
        }
    });
};

module.exports.BBDiary = mongoose.model('BBDiary', BBDiarySchema);