import { audioExtensions, imageExtensions, videoExtensions } from 'constant'

export const isAudioExtension = (extension: string): boolean => audioExtensions.includes(extension.replace(/\./g, ''))

export const isImageExtension = (extension: string): boolean => imageExtensions.includes(extension.replace(/\./g, ''))

export const isVideoExtension = (extension: string): boolean => videoExtensions.includes(extension.replace(/\./g, ''))
