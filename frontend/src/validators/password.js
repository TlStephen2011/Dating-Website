export function hasMinimumOneLowercase(val) {
    let re = /[a-z]/;
    return re.test(val);
}

export function hasMinimumOneUppercase(val) {
    let re = /[A-Z]/;
    return re.test(val);
}

export function hasMinimumOneNumeric(val) {
    let re = /[0-9]/;
    return re.test(val);
}

export function hasMinimumOneSpecial(val) {
    let re = /[!@#\$%\^&\*]/;
    return re.test(val);
}



