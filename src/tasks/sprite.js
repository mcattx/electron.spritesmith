const path = nodeRequire('path')
const gulp = nodeRequire('gulp')
const spritesmith = nodeRequire('gulp.spritesmith')

function spriteTask(sourcePath, destPath, callback) {
    console.log(sourcePath)
    console.log(destPath)
    
    function run() {
        let spriteData = gulp.src(sourcePath + '/*.png')
                .on('error', function (error) {
                    console.log(error.message);
                })
                .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }));
        spriteData.pipe(gulp.dest(destPath));
        callback && callback();
    }
    
    run();
}

module.exports = spriteTask