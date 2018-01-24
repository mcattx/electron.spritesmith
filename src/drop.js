const path = nodeRequire('path')
const spriteTask = nodeRequire(path.join(__dirname, '/tasks/sprite.js'));

var dropArea = document.getElementById('drop');

function dragHandler(e) {

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

        if (len == 1) {
            let temp = files[0];
            if (temp.type === '') {
                // 说明是目录
                spriteTask(temp.path, path.join(__dirname, '/testSprite'), function() {
                    console.log('SpriteTask Done')
                })
            }
        }

        // while (i < len) {
        //     console.log(files[i])
        //     info += files[i].name + "( " + files[i].type + ", " + files[i].size + " bytes) <br>";
        //     i++;
        // }
        // outputEl.innerHTML = info
    }

    
}

dropArea.addEventListener('dragenter', dragHandler, false);
dropArea.addEventListener('dragover', dragHandler, false);
dropArea.addEventListener('drop', dragHandler, false);