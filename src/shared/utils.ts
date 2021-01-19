export function uuid() : string {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  }).slice(0, 6);
}

export function sizeForApsectRatio(aspectRatio: string, hd: boolean) : object {
  let size = {}
  if (aspectRatio == '1:1')
    size = hd ? { width: 1024, height: 1024 } : { width: 700, height: 700 }
  if (aspectRatio == '16:9')
    size = hd ? { width: 1920, height: 1080 } : { width: 1024, height: 576 }
  if (aspectRatio == '5:4')
    size = hd ? { width: 1280, height: 1024 } : { width: 640, height: 512 }
  if (aspectRatio == '4:5')
    size = hd ? { width: 1024, height: 1280 } : { width: 512, height: 640 }
  if (aspectRatio == '9:16')
    size = hd ? { width: 1080, height: 1920 } : { width: 576, height: 1024 }
  return size
} 