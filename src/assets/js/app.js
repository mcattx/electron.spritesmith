const path = nodeRequire('path')
const spriteTask = nodeRequire(path.join(__dirname, '/_tasks/sprite.js'))
const fsHelper = nodeRequire(path.join(__dirname, '../js/_helpers/fs_helper.js'))

const $ = function(el) {
    return document.querySelectorAll(el)[0]
}

/**
 * 
 * @param {String} info - Toast content
 * @param {String} type - Toast type. including 'error' and 'info' as default.
 */
function showToast(info, type) {
    $('.toast').innerHTML = info
    if (type === 'error') {
        $('.toast').classList.add('error')
    }
    $('.toast').classList.add('show')

    setTimeout(() => {
        if (type === 'error') {
            $('.toast').classList.remove('error')
        }
        $('.toast').classList.remove('show')
        $('.toast').innerHTML = ''
    }, 2000);
}

document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
        const sourePath = f.path;
        const destPath = path.join(__dirname, '../../../output', f.name);
    
        fsHelper.checkEmptyDir(sourePath).then(() => {
            if (f.name) {
                $('.dir-info').innerHTML = 'Directory ' + f.name + ' loaded.'
                $('.dir-info').classList.add('show')
            }
            spriteTask(sourePath, destPath, function() {
                showToast('Build Sprite Successfully.')
            })
        }).catch((err) => {
            if (err) {
                showToast(err.message, 'error')
            }
        })
        
        return false;
        if (f.name) {
            $('.dir-info').innerHTML = 'Directory ' + f.name + ' loaded.'
            $('.dir-info').classList.add('show')
        }
        spriteTask(sourePath, destPath, function() {
            showToast('Build Sprite Successfully.')
        })
    }
})

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
})
