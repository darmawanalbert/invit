export const sortColorDarker = (a, b) => {
    const meanA = (a[0] + a[1] + a[2] + a[3] + a[4] + a[5] + a[8] + a[9] + a[10]) / 9;
    const meanB = (b[0] + b[1] + b[2] + b[3] + b[4] + b[5] + b[8] + b[9] + b[10]) / 9;
    return meanA - meanB;
}

export const sortColorLighter = (a, b) => {
    const meanA = (a[0] + a[1] + a[2] + a[3] + a[4] + a[5] + a[8] + a[9] + a[10]) / 9;
    const meanB = (b[0] + b[1] + b[2] + b[3] + b[4] + b[5] + b[8] + b[9] + b[10]) / 9;
    return meanB - meanA;
}

export const sortPatternDenser = (a, b) => {
    return a[6] - b[6];
}

export const sortPatternSparser = (a, b) => {
    return b[6] - a[6];
}

export const sortTextSmaller = (a, b) => {
    return a[11] - b[11];
}

export const sortTextBigger = (a, b) => {
    return b[11] - a[11];
}
