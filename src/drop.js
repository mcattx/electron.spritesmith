const path = nodeRequire('path')
const sprite = nodeRequire(path.join(__dirname, '/tasks/sprite.js'));

var dropArea = document.getElementById('drop');

function dragHandler(e) {
    console.log(e.type)
    var info = '',
        outputEl = document.getElementById('output'),
        files,
        i,
        len;
    e.preventDefault();
    if (e.type === 'dragenter') {
        dropArea.classList.add('enter')
    }

    if (e.type == 'drop') {
        files = e.dataTransfer.files;
        i = 0;
        len = files.length;
        while (i < len) {
            console.log(files[i])
            info += files[i].name + "( " + files[i].type + ", " + files[i].size + " bytes) <br>";
            i++;
        }
        outputEl.innerHTML = info
    }

    if (e.type === '') {
        // 说明是目录
        spriteTask(e.path, path.join(__dirname, './test'), function() {
            console.log('start spriteTask')
        })
    }
}

dropArea.addEventListener('dragenter', dragHandler, false);
dropArea.addEventListener('dragover', dragHandler, false);
dropArea.addEventListener('drop', dragHandler, false);