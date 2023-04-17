export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const randomDelayBetween = (min: number, max: number) =>
  delay(
    Math.floor(
      Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min),
    ),
  )
