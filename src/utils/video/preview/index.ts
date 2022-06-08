import findProcess from 'find-process'
import { execSync } from 'node:child_process'
import path from 'path'

import { previewConfigFilepath, previewDirectory, previewPort } from 'constant'
import { createDirectory, fileExists, saveFile } from 'utils/files'

export const preparePreview = async (configJson: string): Promise<void> => {
  if (!fileExists(previewDirectory)) {
    createDirectory(previewDirectory)

    execSync('git clone https://github.com/editframe/editframe-preview .', {
      cwd: path.resolve(previewDirectory),
      stdio: [0, 1, 2],
    })
  } else {
    execSync('git pull', {
      cwd: path.resolve(previewDirectory),
      stdio: [0, 1, 2],
    })
  }

  saveFile(previewConfigFilepath, configJson)

  const processesList = await findProcess('port', previewPort)

  if (!processesList.length) {
    execSync(`cd ${previewDirectory}; yarn; yarn dev`, {
      // using dev server while we dogfood so we can debug
      cwd: path.resolve(previewDirectory),
      stdio: [0, 1, 2],
    })
  }
}
