import fs from 'fs'

import { createDirectory, createReadStream, removeDirectory } from './'

describe('createDirectory', () => {
  const directory = 'directory'
  let existsSyncSpy: jest.SpyInstance
  let mkdirSyncSpy: jest.SpyInstance

  beforeEach(() => {
    existsSyncSpy = jest.spyOn(fs, 'existsSync')
    mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => 'path')
  })

  it('does nothing when the provided directory exists', () => {
    existsSyncSpy.mockReturnValue(true)

    createDirectory(directory)

    expect(mkdirSyncSpy).not.toHaveBeenCalled()
  })

  it('calls the `mkdirSync` function with the correct arguments when the provided directory does not exist', () => {
    existsSyncSpy.mockReturnValue(false)

    createDirectory(directory)

    expect(mkdirSyncSpy).toHaveBeenCalledWith(directory, { recursive: true })
  })
})

describe('createReadStream', () => {
  const path = 'path'
  let createReadStreamSpy: jest.SpyInstance

  beforeEach(() => {
    createReadStreamSpy = jest.spyOn(fs, 'createReadStream').mockReturnValue({} as any)
  })

  it('calls the `createReadStream` function with the correct arguments', () => {
    createReadStream(path)

    expect(createReadStreamSpy).toHaveBeenCalledWith(path)
  })
})

describe('removeDirectory', () => {
  const directory = 'directory'
  let existsSyncSpy: jest.SpyInstance
  let rmdirSyncSpy: jest.SpyInstance

  beforeEach(() => {
    existsSyncSpy = jest.spyOn(fs, 'existsSync')
    rmdirSyncSpy = jest.spyOn(fs, 'rmdirSync').mockImplementation(() => 'path')
  })

  it('does nothing when the provided directory does not exist', () => {
    existsSyncSpy.mockReturnValue(false)

    removeDirectory(directory)

    expect(rmdirSyncSpy).not.toHaveBeenCalled()
  })

  it('calls the `mkdirSync` function with the correct arguments when the provided directory does not exist', () => {
    existsSyncSpy.mockReturnValue(true)

    removeDirectory(directory)

    expect(rmdirSyncSpy).toHaveBeenCalledWith(directory, { recursive: true })
  })
})
