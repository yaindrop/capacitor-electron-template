// electron/electron-builder.config.ts
import { Configuration } from 'electron-builder'

/**
 * @see https://www.electron.build/configuration
 */
const config: Configuration = {
  appId: 'com.capacitordemo.app',
  productName: 'Capacitor Electron Template',
  directories: {
    output: 'electron/release',
  },
  files: ['electron/dist', 'www'],
  win: {
    target: ['nsis'],
  },
  mac: {
    target: ['dmg'],
  },
  linux: {
    target: ['AppImage'],
  },
  extraMetadata: {
    main: 'electron/dist/main.mjs',
  },
}

export default config
