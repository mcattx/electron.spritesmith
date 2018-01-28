const path = nodeRequire('path')
const spriteTask = nodeRequire(path.join(__dirname, '/_tasks/sprite.js'));

const $ = function(el) {
    return document.querySelectorAll(el)[0]
}

document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
        const sourePath = f.path;
        const destPath = path.join(__dirname, '../../../output', f.name);
        if (f.name) {
            $('.dir-info').innerHTML = 'Directory ' + f.name + ' loaded.'
            $('.dir-info').classList.add('show')
        }
        spriteTask(sourePath, destPath, function() {

            $('.toast').innerHTML = 'Build Sprite Successfully.'
            $('.toast').classList.add('show')

            setTimeout(() => {
                $('.toast').classList.remove('show')
                $('.toast').innerHTML = ''
            }, 2000);
        })
    }
})

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
})
