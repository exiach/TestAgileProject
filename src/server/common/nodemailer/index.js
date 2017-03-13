var nodemailer = require('nodemailer');
var nodemailerConfig = require('../../config/nodemailer');
var mg = require('nodemailer-mailgun-transport');
var templates = require('../templates');

var auth = {
    auth: nodemailerConfig
};
var mailer = nodemailer.createTransport(mg(auth));

var sendUserAddedToProjectNotification = function(user, project) {
    var templateValues = {
        projectTitle: project.title,
        userName: user.firstName + ' ' + user.lastName
    };

    var valuesObj = {
        templateValues: templateValues,
        templateName: 'notification-email',
        email: user.email,
        subject: 'Agile-app - You have been added to a project!'
    };

    sendNotificationEmail(valuesObj);
};

var sendSignUpUserNotification = function(user) {
    var templateValues = {
        userName: user.firstName + ' ' + user.lastName
    };

    var valuesObj = {
        templateValues: templateValues,
        templateName: 'new-user-notification',
        email: user.email,
        subject: 'Agile-app - Your account was created!'
    };

    sendNotificationEmail(valuesObj);
};

function sendNotificationEmail(valuesObj) {
    var templateName = valuesObj.templateName;
    var templateValues = valuesObj.templateValues;
    var email = valuesObj.email;
    var subject = valuesObj.subject;

    templates.getCompiledTemplate(templateName, templateValues)
        .then(onSuccess);

    function onSuccess (template) {
        mailer.sendMail({
            from: 'notifications@example.com',
            to: email,
            subject: subject,
            html: template
        });
    }
}

module.exports = {
    mailer: mailer,
    sendUserAddedToProjectNotification: sendUserAddedToProjectNotification,
    sendSignUpUserNotification: sendSignUpUserNotification
};