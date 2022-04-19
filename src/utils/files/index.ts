import { fetch } from 'cross-fetch'
import fs, { createWriteStream, existsSync, mkdirSync, rmdirSync, writeFileSync } from 'fs'
import { parse, resolve } from 'path'
import { Readable } from 'stream'

import { FetchResponse } from 'constant'
import { uuid } from 'utils/strings'

export const createDirectory = (directory: string): void => {
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true })
  }
}

export const createReadStream = (path: string): Readable => fs.createReadStream(path)

export const createTemporaryDirectory = (): string => {
  const directory = resolve(`./tmp/${uuid()}`)

  createDirectory(directory)

  return directory
}

export const downloadFile = async (url: string, directory: string): Promise<{ temporaryFilePath: string }> => {
  const temporaryFilePath = resolve(`${directory}/${uuid()}${getExtension(url)}`)
  const res = (await fetch(url)) as FetchResponse
  const fileStream = createWriteStream(temporaryFilePath)

  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream)
    res.body.on('error', reject)
    fileStream.on('finish', resolve)
  })

  return { temporaryFilePath }
}

export const fileExists = (filepath: string): boolean => existsSync(filepath)

export const getExtension = (filepath: string): string => parse(filepath).ext

export const removeDirectory = (directory: string): void => {
  if (fileExists(directory)) {
    rmdirSync(directory, { recursive: true })
  }
}

export const saveFile = (filepath: string, data: string): void => writeFileSync(filepath, data)
