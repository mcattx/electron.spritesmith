import { remote } from "electron";

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
        label: '编辑',
        submenu: [
            {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
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
                    electron.shell.openExternal('https://www.baid.com')
                }
            },
            {
                label: 'Esprite 官网',
                click: () => {
                    electron.shell.openExternal('https://github.com/titancat/esprite')
                }
            },
            {
                label: '建议或者反馈',
                click: () => {
                    electron.shell.openExternal('https://github.com/titancat/esprite/issues')
                }
            },
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
