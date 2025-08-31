import type { ExtensionContext } from 'vscode'

import { commands, workspace } from 'vscode'

import packageJson from '../package.json'
import { getConfig } from './utils/configuration'
import { logger } from './utils/debugger'

export function activate(context: ExtensionContext) {
  logger.info('🧹 Tidy Space extension starting...')
  logger.info(`Extension Name: ${packageJson.publisher}.${packageJson.name}`)
  logger.info(`Extension Version: ${packageJson.version}`)
  logger.info(`Workspace Configuration: ${JSON.stringify(workspace.getConfiguration(packageJson.name), null, 2)}`)

  const maybeClosePanel = async () => {
    if (getConfig('closePanel')) {
      await commands.executeCommand('workbench.action.closePanel')
    }
  }

  // Primary Side Bar
  const togglePrimarySidebar = commands.registerCommand('tidySpace.toggleSidebarVisibility', async () => {
    await commands.executeCommand('workbench.action.closeAuxiliaryBar')
    await commands.executeCommand('workbench.action.toggleSidebarVisibility')
    await maybeClosePanel()
  })

  // Secondary Side Bar
  const toggleSecondarySidebar = commands.registerCommand('tidySpace.toggleAuxiliaryBar', async () => {
    await commands.executeCommand('workbench.action.closeSidebar')
    await commands.executeCommand('workbench.action.toggleAuxiliaryBar')
    await maybeClosePanel()
  })

  context.subscriptions.push(togglePrimarySidebar, toggleSecondarySidebar)
}

export function deactivate() {
  logger.info('🧹 Tidy Space extension deactivated')
}
