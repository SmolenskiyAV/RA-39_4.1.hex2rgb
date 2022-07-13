// ### функция-конвертер HEX-кода в RGB-код цветого параметра CSS

export default function hex2rgb(c) {
    var bigint = parseInt(c.split('#')[1], 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}