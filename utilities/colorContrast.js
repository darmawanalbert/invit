// Taken from https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors

const luminance = (r, g, b) => {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

const colorContrast = (backgroundColor, foregroundColor) => {
    var lum1 = luminance(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
    var lum2 = luminance(foregroundColor[0], foregroundColor[1], foregroundColor[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

export default colorContrast;
