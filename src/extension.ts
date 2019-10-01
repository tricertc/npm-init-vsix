import { ExtensionContext, commands } from 'vscode'
import generatePackageJson from './commands/generatePackageJson'

/**
 * Register commands on activation.
 *
 * @export
 * @param {vscode.ExtensionContext} ctx
 */
export function activate (ctx: ExtensionContext) {
  const command = commands.registerCommand('extension.npmInit', generatePackageJson)
  ctx.subscriptions.push(command)
}

/**
 * No action on deactiviation.
 *
 * @export
 */
export function deactivate () {
  console.log('deactivated')
}
