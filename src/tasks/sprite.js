const path = nodeRequire('path')
const gulp = nodeRequire('gulp')
const spritesmith = nodeRequire('gulp.spritesmith')

function spriteTask(sourcePath, destPath, callback) {
    gulp.task('sprite', function (sourcePath, destPath) {
        console.log(sourcePath)
        console.log(destPath)
        let spriteData = gulp.src(sourcePath + '/*.png').pipe(spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.css'
        }));
        return spriteData.pipe(gulp.dest(destPath));
    });
}

module.exports = spriteTask