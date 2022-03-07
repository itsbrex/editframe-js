import { fetch } from 'cross-fetch'
import fs, { createWriteStream, existsSync, mkdirSync, rmdirSync } from 'fs'
import { Readable } from 'stream'

import { FetchResponse } from 'constant'
import { uuid } from 'utils/strings'

export const createDirectory = (directory: string): void => {
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true })
  }
}

export const createReadStream = (path: string): Readable => fs.createReadStream(path)

export const downloadFile = async (
  url: string
): Promise<{ temporaryFileDirectory: string; temporaryFilePath: string }> => {
  const temporaryFileDirectory = `./tmp/${uuid()}`
  const temporaryFilePath = `${temporaryFileDirectory}/${uuid()}`

  createDirectory(temporaryFileDirectory)

  const res = (await fetch(url)) as FetchResponse
  const fileStream = createWriteStream(temporaryFilePath)

  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream)
    res.body.on('error', reject)
    fileStream.on('finish', resolve)
  })

  return { temporaryFileDirectory, temporaryFilePath }
}

export const removeDirectory = (directory: string): void => {
  if (existsSync(directory)) {
    rmdirSync(directory, { recursive: true })
  }
}
