import * as path from 'path'
import { exec } from 'child_process'
import { Uri, window, workspace, FileType } from 'vscode'

/**
 * Run 'npm init -y' on the selected folder.
 *
 * @export
 * @param {vscode.ExtensionContext} ctx
 */
export default async function generatePackageJson (uri: Uri) {
  const packageJsonUri = uri.with({
    path: path.join(uri.path, 'package.json')
  })

  try {
    // tslint:disable-next-line: await-promise
    const stats = await workspace.fs.stat(packageJsonUri)

    if (stats.type === FileType.File) {
      window.showErrorMessage('A package.json file already exists')
    }
  } catch (ex) {
    exec('npm init -y', { cwd: uri.path }, err => {
      return !err
        ? window.showInformationMessage('package.json created')
        : window.showErrorMessage(err.message)
    })
  }
}
