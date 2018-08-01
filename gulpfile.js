/* Gulpfile.js
 * Defines the Gulp tasks to be executed on npm start.
*/

let gulp = require('gulp');
let sass = require('gulp-sass');
let webserver = require('gulp-webserver');
let path = require('path');
let postcss     = require('gulp-postcss');
let reporter    = require('postcss-reporter');
let stylelint   = require('stylelint');
let syntax_scss = require('postcss-scss');
let uglify = require('gulp-uglify');
let eslint = require('gulp-eslint');
let babel = require('gulp-babel');

/*gulp.task(
    name : String,
    deps : [] :: optional,
    cb : fn
  )*/

/* Styles task.
 * Compiles login SaSS and sends CSS to build.
*/
gulp.task('styles', () => {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({
            includePaths: [
                path.join(__dirname, 'node_modules/bootstrap/scss/'),
                path.join(__dirname, 'node_modules/font-awesome/fonts/'),
                path.join(__dirname, 'src/scss')]
            , outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('build/css/'))
});

/* HTML task.
 * Copies HTML files to build.
*/
gulp.task('html', () => {
    return gulp.src('src/**/*.html').pipe(gulp.dest('build/'))
});

/* JS task.
 * Copies and uglifies JS files to build.
*/
gulp.task('js', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/'))
});

/* Bootstrap JS task.
 * Copies bootstrap javascript files to build.
*/
gulp.task('bootstrap-js', () => {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(gulp.dest('build/js/'))});

/* Jquery task.
 * Copies jquery min to build.
*/
gulp.task('jquery', function() {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('build/js/'))});

/* Assets task.
 * Copies assets to build.
*/
gulp.task('assets', () => {
    return gulp.src('assets/**/*.png').pipe(gulp.dest('build/assets/'))
});

/* Font awesome task.
 * Copies fonts to build.
*/
gulp.task('font-awesome', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('build/fonts'))
});

/* Favicon task.
 * Copies favicon to build.
*/
gulp.task('favicon', () => {
    return gulp.src('favicon.ico')
        .pipe(gulp.dest('build/'))
});

/* Watch task.
 * Watches for changes on SCSS, HTML and PNG files. If a change is done, call the proper copying task.
*/
gulp.task('watch', () => {
    gulp.watch('src/scss/main.scss', ['styles'], cb => cb);
    gulp.watch('src/**/*.html', ['html'], cb => cb);
    gulp.watch('src/**/*.js', ['js'], cb => cb);
    gulp.watch('assets/**/*.png', ['assets'], cb => cb);
});

/* Server task.
 * Starts a live server for development.
*/
gulp.task('server', () => {
    gulp.src('build/')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
});

/* SCSS lint task.
 * Checks for SCSS code quality.
*/
gulp.task("scss-lint", () => {

    // Stylelint config rules
    const stylelintConfig = {
        rules: {
            'at-rule-empty-line-before': [ 'always', {
                except: ['blockless-after-blockless'],
                ignore: ['after-comment'],
            } ],
            'at-rule-name-case': 'lower',
            'at-rule-name-space-after': 'always-single-line',
            "at-rule-no-unknown": [true, {
                "ignoreAtRules": ["function", "if", "else", "each", "include", "mixin"]
            }],
            'at-rule-semicolon-newline-after': 'always',
            'block-closing-brace-newline-after': 'always',
            'block-closing-brace-newline-before': 'always',
            'block-opening-brace-newline-after': 'always',
            'block-opening-brace-space-before': 'always',
            'color-hex-case': 'lower',
            'color-hex-length': 'short',
            'color-named': 'never',
            'comment-empty-line-before': [ 'always', {
                ignore: ['stylelint-commands'],
            } ],
            'declaration-bang-space-after': 'never',
            'declaration-bang-space-before': 'always',
            'declaration-block-no-duplicate-properties': [ true, {
                ignore: ['consecutive-duplicates'],
            } ],
            'declaration-block-semicolon-newline-after': 'always',
            'declaration-block-semicolon-space-before': 'never',
            'declaration-block-trailing-semicolon': 'always',
            'declaration-colon-newline-after': 'always-multi-line',
            'declaration-colon-space-after': 'always-single-line',
            'declaration-colon-space-before': 'never',
            'declaration-property-unit-whitelist': {
                'line-height': ['px'],
            },
            'font-family-name-quotes': 'always-where-recommended',
            'font-weight-notation': [ 'numeric', {
                ignore: ['relative'],
            } ],
            'function-comma-space-after': 'always',
            'function-comma-space-before': 'never',
            'function-max-empty-lines': 1,
            'function-name-case': [ 'lower', {
                ignoreFunctions: ['/^DXImageTransform.Microsoft.*$/'],
            } ],
            'function-parentheses-space-inside': 'never',
            'function-url-quotes': 'never',
            'function-whitespace-after': 'always',
            indentation: 2, //this is for JetBrains default identation.
            'length-zero-no-unit': true,
            'max-empty-lines': 2,
            'max-line-length': [ 80, {
                ignore: 'non-comments',
                ignorePattern: ['/(https?://[0-9,a-z]*.*)|(^description\\:.+)|(^tags\\:.+)/i'],
            } ],
            'media-feature-colon-space-after': 'always',
            'media-feature-colon-space-before': 'never',
            'media-feature-range-operator-space-after': 'always',
            'media-feature-range-operator-space-before': 'always',
            'media-query-list-comma-newline-after': 'always-multi-line',
            'media-query-list-comma-space-after': 'always-single-line',
            'media-query-list-comma-space-before': 'never',
            'no-eol-whitespace': true,
            'no-missing-end-of-source-newline': true,
            'number-leading-zero': 'always',
            'number-no-trailing-zeros': true,
            'property-case': 'lower',
            'rule-empty-line-before': [ 'always', {
                ignore: ['after-comment'],
            } ],
            'selector-attribute-brackets-space-inside': 'never',
            'selector-attribute-operator-space-after': 'never',
            'selector-attribute-operator-space-before': 'never',
            'selector-attribute-quotes': 'always',
            'selector-class-pattern': [
                '^[a-z]+(-[a-z]+)*',
                {
                    message: 'Selector should use lowercase and separate words with hyphens (selector-class-pattern)',
                },
            ],
            'selector-id-pattern': [
                '^[a-z]+(-[a-z]+)*',
                {
                    message: 'Selector should use lowercase and separate words with hyphens (selector-id-pattern)',
                },
            ],
            'selector-combinator-space-after': 'always',
            'selector-combinator-space-before': 'always',
            'selector-list-comma-newline-after': 'always',
            'selector-list-comma-space-before': 'never',
            'selector-max-empty-lines': 0,
            'selector-pseudo-class-case': 'lower',
            'selector-pseudo-class-parentheses-space-inside': 'never',
            'selector-pseudo-element-case': 'lower',
            'selector-pseudo-element-colon-notation': 'double',
            'selector-type-case': 'lower',
            'string-quotes': 'double',
            'unit-case': 'lower',
            'value-keyword-case': 'lower',
            'value-list-comma-newline-after': 'always-multi-line',
            'value-list-comma-space-after': 'always-single-line',
            'value-list-comma-space-before': 'never',
        } //taken from: https://github.com/WordPress-Coding-Standards/stylelint-config-wordpress/blob/master/index.js
    };

    const processors = [
        stylelint(stylelintConfig),
        reporter({
            clearMessages: true,
            throwError: true
        })
    ];

    return gulp.src(
        ['src/scss/**/*.scss', '!src/scss/vendor/**/*.scss']).pipe(postcss(processors, {syntax: syntax_scss}));
});


/* JS lint task.
 * Checks for JS code quality.
*/
gulp.task("js-lint", () => {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/* Start task.
 * Starts all of the above tasks.
*/
gulp.task('start',
    ['scss-lint', 'js-lint', 'html', 'styles', 'js', 'bootstrap-js',
        'jquery', 'assets', 'font-awesome', 'favicon', 'server', 'watch'],
        cb => cb);

/* Start deploy task.
 * Deploys the app.
*/
gulp.task('deploy',
    ['html', 'styles', 'js', 'bootstrap-js', 'jquery', 'assets', 'font-awesome', 'favicon'],
    cb => cb);
