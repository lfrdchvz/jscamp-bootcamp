import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const allArgs    = process.argv.slice(2)
const targetDir  = allArgs.find(arg => !arg.startsWith('--')) ?? '.'
const onlyFiles  = allArgs.includes('--only-files')
const onlyDirs   = allArgs.includes('--only-dirs')
const extFlag    = allArgs.find(arg => arg.startsWith('--ext='))
const extFilter  = extFlag ? extFlag.split('=')[1] : null

// =============
// EJERCICIO 4
// =============
const colors = {
    dir:   '\x1b[34m',  // azul
    file:  '\x1b[32m',  // verde
    size:  '\x1b[33m',  // amarillo
    reset: '\x1b[0m'
}

const formatBytes = (fileSize) => {
    if (fileSize < 1024) return `${fileSize} B`
    return `${(fileSize / 1024).toFixed(2)} KB`
}

// Agregamos un error handling para el caso de que el directorio no exista
let fileNames
try {
    fileNames = await readdir(targetDir)
} catch (error) {
    console.error('Error al leer el directorio:', error.message)
    process.exit(1)
}

const entries = await Promise.all(
    fileNames.map(async (fileName) => {
        const fullPath  = join(targetDir, fileName)
        const fileInfo  = await stat(fullPath)
        return {
            name:  fileName,
            isDir: fileInfo.isDirectory(),
            size:  formatBytes(fileInfo.size)
        }
    })
)

// =============
// EJERCICIO 1 
// =============

entries.sort((entryA, entryB) => {
    if (entryA.isDir && !entryB.isDir) return -1
    if (!entryA.isDir && entryB.isDir) return 1
    return entryA.name.localeCompare(entryB.name)
})

// ================
// EJERCICIO 2 y 3
// ================
const filteredEntries = entries.filter(entry => {
    if (onlyFiles) return !entry.isDir
    if (onlyDirs)  return entry.isDir
    if (extFilter) return entry.name.endsWith(`.${extFilter}`)
    return true
})

for (const entry of filteredEntries) {
    const icon       = entry.isDir ? '📁' : '📄'
    const sizeLabel  = entry.isDir ? '-' : entry.size
    const color      = entry.isDir ? colors.dir : colors.file
    console.log(`${color}${icon} ${entry.name.padEnd(25)}${colors.reset}   ${colors.size}${sizeLabel}${colors.reset}`)
}