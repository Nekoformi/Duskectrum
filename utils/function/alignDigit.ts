type option = {
    intDigit?: number;
    decDigit?: number;
    fixDigit?: boolean;
    forcePositiveSymbol?: boolean;
};

export default function alignDigit(val: number, option: option): string {
    const intDigit = option.intDigit || -1;
    const decDigit = option.decDigit || -1;
    const fixDigit = option.fixDigit;
    const forcePositiveSymbol = option.forcePositiveSymbol;

    const isNegativeVal = val < 0;
    const symbol = forcePositiveSymbol || isNegativeVal ? (isNegativeVal ? '-' : '+') : '';

    const intRoundVal = Math.round(val); // 12.3456 => 12
    const decRoundVal = decDigit > 0 ? Math.round(val * Math.pow(10, decDigit)) / Math.pow(10, decDigit) : intRoundVal; // 12.3456 => 12.35

    const intPartString = String(Math.abs(decRoundVal)).split('.')[0] || String(Math.abs(decRoundVal)); // 12.35 => "12"
    const decPartString = String(decRoundVal).split('.')[1] || ''; // 12.35 => "35"

    const intAlignString = symbol + (intDigit > 0 ? intPartString.padStart(intDigit - symbol.length, '0') : intDigit === 0 ? '' : intPartString);
    const decAlignString = decPartString.padEnd(decDigit, '0');

    const intString = !(intAlignString.length > intDigit) || intDigit < 0 ? intAlignString : ''.padStart(intDigit, '#');
    const decString = !(val === intRoundVal && fixDigit) || decDigit > 0 ? decAlignString : '';

    return intString + decString;
}
