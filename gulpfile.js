const path = require('path')
const gulp = require('gulp')
const electronConnect = require('electron-connect').server.create()

const codeSourcePath = path.join(__dirname, '../../src')
const jsPath = path.join(codeSourcePath, 'assets/js/**/*.js')

console.log(codeSourcePath)

gulp.task('dev', () => {
    electronConnect.start()
    gulp.watch(['src/main.js', 'src/assets/js/**/*.js'], electronConnect.restart)
    gulp.watch('src/**/*.{html,css}', electronConnect.reload)
})