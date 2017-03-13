var swig  = require('swig');
var Q = require('q');
var tplsDir = 'src/server/common/templates/';
var tplsExt = '.html';

function getCompiledTemplate (templateName, valuesObj) {
    var deferred = Q.defer();
    var path = tplsDir + templateName + '/' + templateName + tplsExt;
    swig.renderFile(path, valuesObj, function (error, output) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(output);
        }
    });
    return deferred.promise;
}

module.exports = {
    getCompiledTemplate: getCompiledTemplate
};