const { electron, remote, shell } = nodeRequire('electron')

const Menu = remote.Menu

const template = [
    {
        label: '文件',
        submenu: [
            {
                label: '打开...',
                accelerator: 'CmdOrCtrl+O',
                click: (item, focusedWindow) => {
                    let projectPath = remote.dialog.showOpenDialog({
                        properties: ['openDirectory']
                    })

                    if (projectPath && projectPath.length) {
                        openProject(projectPath[0])
                    }
                }
            },
            {
                label: '刷新',
                accelerator: 'CmdOrCtrl+R',
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.reload()
                    }
                }
            }
        ]
    },
    {
        label: '帮助',
        role: 'help',
        submenu: [
            {
                label: 'Esprite 使用帮助',
                click: () => {
                    shell.openExternal('https://github.com/titancat/electron.spritesmith')
                }
            },
            {
                label: 'Esprite 官网',
                click: () => {
                    shell.openExternal('https://github.com/titancat/electron.spritesmith')
                }
            },
            {
                label: '建议或者反馈',
                click: () => {
                    shell.openExternal('https://github.com/titancat/electron.spritesmith/issues')
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    const name = remote.app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: '关于 Esprite',
                click: (item, focusedWindow) => {
                    showAbout()
                }
            },
            {
                type: 'separator'
            },
            {
                label: '偏好设置',
                accelerator: 'Command+,',
                click: () => {
                    settingFn()
                }
            },
            {
                label: '检查更新...',
                accelerator: '',
                click: () => {
                    checkForUpdate()
                }
            },
            {
                type: 'separator',
            },
            {
                label: '退出',
                accelerator: 'Command+Q',
                click: () => {
                    remote.app.quit()
                }
            }
        ]
    })
} else if(process.platform === 'win32') {
    let helpItem = template[template.length - 1]

    helpItem.submenu.unshift({
        label: '检查更新...',
        accelerator: '',
        click: () => {
            checkForUpdate()
        }
    })

    helpItem.submenu.unshift({
        label: '关于 Esprite',
        click: (item, focusedWindow) => {
            showAbout()
        }
    })
}


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
