const path = nodeRequire('path')
const spriteTask = nodeRequire(path.join(__dirname, '/tasks/sprite.js'));

document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
        const sourePath = f.path;
        const destPath = path.join(__dirname, '/output', f.name);
        spriteTask(sourePath, destPath, function() {
            console.log('SpriteTask Done')
        })
    }
})

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
})
