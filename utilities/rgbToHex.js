// Taken from https://css-tricks.com/converting-color-spaces-in-javascript/#:~:text=RGB%20to%20Hex,to%20a%20single%20return%20statement.
const rgbToHex = (r, g, b) => {
    let rString = r.toString(16);
    let gString = g.toString(16);
    let bString = b.toString(16);
    if (rString.length === 1) {
        rString = "0" + rString;
    }
    if (gString.length === 1) {
        gString = "0" + gString;
    }
    if (bString.length === 1) {
        bString = "0" + bString;
    }

    const hexString = "#" + rString + gString + bString;
    return hexString.toUpperCase();
};

export default rgbToHex;
