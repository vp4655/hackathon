module.exports = GulpConfig;

/**
 * @name GulpConfig
 * @namespace GulpConfiguration
 * @desc Configures folder paths for gulp script
 * @returns {{folders: {js: {angularModules: string[], angular: string}, css: {all: string, modules: string, ico: string}, html: string, images: {images: string}, production: {js: string, css: string, images: string}}}}
 * @constructor
 */
function GulpConfig(){
    var config = {
        folders: {
            js: {
                angularModules: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/lodash/lodash.js',
                    'bower_components/moment/moment.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-aria/angular-aria.min.js',
                    'bower_components/angular-messages/angular-messages.min.js',
                    'bower_components/angular-material/angular-material.min.js',
                    'bower_components/restangular/dist/restangular.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-permission/dist/angular-permission.min.js',
                    'bower_components/ngstorage/ngStorage.min.js',
                    'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
                    'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
                    'bower_components/angular-spinner/dist/angular-spinner.min.js',
                    'bower_components/angular-file-upload/dist/angular-file-upload.min.js'
                ],
                angular: 'js/**/*.js'
            },
            sass: {
                all: 'assets/scss/style.scss',
                modules: 'assets/scss/**/*.scss'
            },
            html: 'js/modules/**/*.html',
            images: {
                images: 'images/*.+(jpg|png|svg)'
            },
            production: {
                js: 'production',
                css: 'production',
                images: 'production/images'
            }
        }
    };

    return config;
}