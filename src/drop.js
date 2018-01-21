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
}

dropArea.addEventListener('dragenter', dragHandler, false);
dropArea.addEventListener('dragover', dragHandler, false);
dropArea.addEventListener('drop', dragHandler, false);