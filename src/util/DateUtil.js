
export function isEmpty(input) { return (input == null || input == ''); }
export function isNotEmpty(input) { return !this.isEmpty(input); }
export function isBlank(input) { return (input == null || /^\s*$/.test(input)); }
export function isNotBlank(input) { return (!this.isBlank(input)); }
export function trim(input) { return input.replace(/^\s+|\s+$/, ''); }
export function trimToEmpty(input) { return input == null ? "" : this.trim(input); }
export function startsWith(input, prefix) { return (input.indexOf(prefix) === 0); }
export function endsWith(input, suffix) { return (input.lastIndexOf(suffix) === 0); }
export function contains(input, searchSeq) { return (input.indexOf(searchSeq) >= 0); }
export function equals(input1, input2) {
    return input1 == input2;
}
export function equalsIgnoreCase(input1, input2) {
    return input1.toLocaleLowerCase() == input2.toLocaleLowerCase();
}
export function containsWhitespace(input) {
    return this.contains(input, ' ');
}
export function repeat(ch, repeatTimes) {
    var result = "";
    for (var i = 0; i < repeatTimes; i++) {
        result += ch;
    }
    return result;
}
export function deleteWhitespace(input) {
    return input.replace(/\s+/g, '');
}
export function rightPad(input, size, padStr) {
    return input + this.repeat(padStr, size);
}
export function leftPad(input, size, padStr) {
    return this.repeat(padStr, size) + input;
}
export function capitalize(input) {
    var strLen = 0;
    if (input == null || (strLen = input.length) == 0) {
        return input;
    }
    return input.replace(/^[a-z]/, function (matchStr) {
        return matchStr.toLocaleUpperCase();
    });
}
export function uncapitalize(input) {
    var strLen = 0;
    if (input == null || (strLen = input.length) == 0) {
        return input;
    }
    return input.replace(/^[A-Z]/, function (matchStr) {
        return matchStr.toLocaleLowerCase();
    });
}
export function swapCase(input) {
    return input.replace(/[a-z]/ig, function (matchStr) {
        if (matchStr >= 'A' && matchStr <= 'Z') {
            return matchStr.toLocaleLowerCase();
        }
        else if (matchStr >= 'a' && matchStr <= 'z') {
            return matchStr.toLocaleUpperCase();
        }
    });
}
export function countMatches(input, sub) {
    if (this.isEmpty(input) || this.isEmpty(sub)) {
        return 0;
    }
    var count = 0;
    var index = 0;
    while ((index = input.indexOf(sub, index)) != -1) {
        index += sub.length;
        count++;
    }
    return count;
}
export function isAlpha(input) {
    return /^[a-z]+$/i.test(input);
}
export function isAlphaSpace(input) {
    return /^[a-z\s]*$/i.test(input);
}
export function isAlphanumeric(input) {
    return /^[a-z0-9]+$/i.test(input);
}
export function isAlphanumericSpace(input) {
    return /^[a-z0-9\s]*$/i.test(input);
}
export function isNumeric(input) {
    return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input);
}
export function isDecimal(input) {
    return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input);
}
export function isNegativeDecimal(input) {
    return /^\-?(?:0|[1-9]\d*)\.\d+$/.test(input);
}
export function isPositiveDecimal(input) {
    return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input);
}
export function isInteger(input) {
    return /^[-+]?(?:0|[1-9]\d*)$/.test(input);
}
export function isPositiveInteger(input) {
    return /^\+?(?:0|[1-9]\d*)$/.test(input);
}
export function isNegativeInteger(input) {
    return /^\-?(?:0|[1-9]\d*)$/.test(input);
}
export function isNumericSpace(input) {
    return /^[\d\s]*$/.test(input);
}
export function isWhitespace(input) {
    return /^\s*$/.test(input);
}
export function isAllLowerCase(input) {
    return /^[a-z]+$/.test(input);
}
export function isAllUpperCase(input) {
    return /^[A-Z]+$/.test(input);
}
export function defaultString(input, defaultStr) {
    return input == null ? defaultStr : input;
}
export function defaultIfBlank(input, defaultStr) {
    return this.isBlank(input) ? defaultStr : input;
}
export function defaultIfEmpty(input, defaultStr) {
    return this.isEmpty(input) ? defaultStr : input;
}
export function reverse(input) {
    if (this.isBlank(input)) {
        input;
    }
    return input.split("").reverse().join("");
}
export function removeSpecialCharacter(input) {
    return input.replace(/[!-/:-@\[-`{-~]/g, "");
}
export function isSpecialCharacterAlphanumeric(input) {
    return /^[!-~]+$/.test(input);
}
export function isPatternMustExcludeSomeStr(input, conditions) {
    //参数
    let matcherFlag = conditions.matcherFlag;
    let excludeStrArr = conditions.excludeStrArr;
    let length = conditions.length;
    let ignoreCase = conditions.ignoreCase;
    //拼正则
    let size = excludeStrArr.length;
    let regex = (size == 0) ? "^" : "^(?!.*(?:{0}))";
    let subPattern = "";
    for (let i = 0; i < size; i++) {
        excludeStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(excludeStrArr[i]);
        subPattern += excludeStrArr[i];
        if (i != size - 1) {
            subPattern += "|";
        }
    }
    regex = this.format(regex, [subPattern]);
    switch (matcherFlag) {
        case "0":
            regex += "\\d";
            break;
        case "1":
            regex += "[a-zA-Z]";
            break;
        case "2":
            regex += "[a-z]";
            break;
        case "3":
            regex += "[A-Z]";
            break;
        case "4":
            regex += "[!-/:-@[-`{-~]";
            break;
        case "5":
            regex += "[\u4E00-\u9FA5]";
            break;
        case "6":
            regex += "[a-zA-Z0-9]";
            break;
        case "7":
            regex += "[a-z0-9]";
            break;
        case "8":
            regex += "[A-Z0-9]";
            break;
        case "9":
            regex += "[!-~]";
            break;
        case "10":
            regex += "[0-9\u4E00-\u9FA5]";
            break;
        case "11":
            regex += "[a-z!-/:-@[-`{-~]";
            break;
        case "12":
            regex += "[A-Z!-/:-@[-`{-~]";
            break;
        case "13":
            regex += "[a-zA-Z!-/:-@[-`{-~]";
            break;
        case "14":
            regex += "[a-z\u4E00-\u9FA5]";
            break;
        case "15":
            regex += "[A-Z\u4E00-\u9FA5]";
            break;
        case "16":
            regex += "[a-zA-Z\u4E00-\u9FA5]";
            break;
        case "17":
            regex += "[\u4E00-\u9FA5!-/:-@[-`{-~]";
            break;
        case "18":
            regex += "[\u4E00-\u9FA5!-~]";
            break;
        case "19":
            regex += "[a-z\u4E00-\u9FA5!-/:-@[-`{-~]";
            break;
        case "20":
            regex += "[A-Z\u4E00-\u9FA5!-/:-@[-`{-~]";
            break;
        case "100":
            regex += "[sS]";
            break;
        default:
            alert(matcherFlag + ":This type is not supported!");
    }
    regex += this.isNotBlank(length) ? "{" + length + "}" : "+";
    regex += "$";
    const pattern = new RegExp(regex, ignoreCase ? "i" : "");
    return pattern.test(input);
}
export function format(message, arr) {
    return message.replace(/{(\d+)}/g, function (matchStr, group1) {
        return arr[group1];
    });
}
export function isPatternMustContainSomeStr(input, conditions) {
    //参数
    let matcherFlag = conditions.matcherFlag;
    let containStrArr = conditions.containStrArr;
    let length = conditions.length;
    let ignoreCase = conditions.ignoreCase;
    //创建正则
    let size = containStrArr.length;
    let regex = "^";
    let subPattern = "";
    for (var i = 0; i < size; i++) {
        containStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(containStrArr[i]);
        subPattern += "(?=.*" + containStrArr[i] + ")";
    }
    regex += subPattern;
    switch (matcherFlag) {
        case '0':
            regex += "\\d";
            break;
        case '1':
            regex += "[a-zA-Z]";
            break;
        case '2':
            regex += "[a-z]";
            break;
        case '3':
            regex += "[A-Z]";
            break;
        case '4':
            regex += "[!-/:-@\[-`{-~]";
            break;
        case '5':
            regex += "[\u4E00-\u9FA5]";
            break;
        case '6':
            regex += "[a-zA-Z0-9]";
            break;
        case '7':
            regex += "[a-z0-9]";
            break;
        case '8':
            regex += "[A-Z0-9]";
            break;
        case '9':
            regex += "[!-~]";
            break;
        case '10':
            regex += "[0-9\u4E00-\u9FA5]";
            break;
        case '11':
            regex += "[a-z!-/:-@\[-`{-~]";
            break;
        case '12':
            regex += "[A-Z!-/:-@\[-`{-~]";
            break;
        case '13':
            regex += "[a-zA-Z!-/:-@\[-`{-~]";
            break;
        case '14':
            regex += "[a-z\u4E00-\u9FA5]";
            break;
        case '15':
            regex += "[A-Z\u4E00-\u9FA5]";
            break;
        case '16':
            regex += "[a-zA-Z\u4E00-\u9FA5]";
            break;
        case '17':
            regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
            break;
        case '18':
            regex += "[\u4E00-\u9FA5!-~]";
            break;
        case '19':
            regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
            break;
        case '20':
            regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
            break;
        case '100':
            regex += "[\s\S]";
            break;
        default:
            alert(matcherFlag + ":This type is not supported!");
    }
    regex += this.isNotBlank(length) ? "{" + length + "}" : "+";
    regex += "$";
    const pattern = new RegExp(regex, ignoreCase ? "i" : "");
    return pattern.test(input);
}
export function isChinese(input) {
    return /^[\u4E00-\u9FA5]+$/.test(input);
}
export function removeChinese(input) {
    return input.replace(/[\u4E00-\u9FA5]+/gm, "");
}
export function escapeMetacharacter(input) {
    var metacharacter = "^$()*+.[]|\\-?{}|";
    if (metacharacter.indexOf(input) >= 0) {
        input = "\\" + input;
    }
    return input;
}
export function escapeMetacharacterOfStr(input) {
    return input.replace(/[\^\$\*\+\.\|\\\-\?\{\}\|]/gm, "\\$&");
}