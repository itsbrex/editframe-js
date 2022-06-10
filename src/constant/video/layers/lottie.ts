export enum LottieMethod {
  setAnimationData = 'setAnimationData',
}

export interface LottieFont {
  ascent: number
  fFamily: string
  fName: string
  fStyle: string
}

export interface LottieAnimationFontData {
  list: [LottieFont]
}

export interface LottieAnimationData {
  assets: any[]
  ddd: number
  fonts?: LottieAnimationFontData
  fr: number
  h: number
  ip: number
  layers: any[]
  markers?: any[]
  nm: string
  op: number
  v: string
  w: number
}
