export const Constant = {
    MG_Blue: '#1f4e79',
}

export const ThreeStep = /\B(?=(\d{3})+(?!\d))/g

export function ThreeStepComma(string: string) {
    return string.replace(ThreeStep, ',')
}

export const BeefCuts = [
    '윗등심',
    '아랫등심',
    '토마호크',
    '채끝',
    '티본',
    '목심',
    '갈비',
    '양지',
    '우둔',
    '설도',
    '안심',
]

export const PorkCuts = [
    '목살',
    '삼겹살',
    '돈등심',
    '돈안심',
    '갈비',
    '앞다리',
    '뒷다리',
    '돈마호크',
]

export function setUrl(url: string) {
    return process.env.PUBLIC_URL + url
}

export const PERIOD = 'period'

export const WLOSS = 'loss'

export const WLOSSP = 'lossp'

export const PRICE = 'price'
