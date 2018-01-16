const path = require('path')
const fs = require('fs')


class Config {}

Config.NAME = 'SpriteTool'
Config.ROOT = path.join(__dirname, '../')
Config.WROKSPACE = `${Config.NAME}_workspace`
Config.CONFIGFILE = 'config.json'
Config.CONFIGPATHH = path.join(__dirname, '../', Config.CONFIGFILE)
Config.PLATFORM = process.platform
Config.DEFAULT_PATH = Config.PLATFORM === 'win32' ? 'desktop' : 'home'
Config.CHECKURL = ''
Config.DOWNLOADURL = ''
Config.debug = true

Config.getStorage = () => {
    const storage = window && window.localStorage

    if (storage.getItem(Config.NAME)) {
        return JSON.parse(storage.getItem(Config.NAME))
    } else {
        return false
    }
}

Config.setStorage = (value) => {
    const storage = window && window.localStorage

    storage.setItem(Config.NAME, JSON.stringif(value))
}

Config.removeStorage = () => {
    const storage = window && window.localStorage
    let value = storage.getItem(Config.NAME)

    if (value) {
        storage.removeItem(Config.NAME)
    }
}

module.exports = Config