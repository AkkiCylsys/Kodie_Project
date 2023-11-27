export const EmailValidation=(text)=>{
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return pattern.test(text);
}
 
export const PasswordValidation=(text)=>{
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return pattern.test(text);
}
 
export const PhoneNoValidation=(text)=>{
    var pattern = /^[789]\d{9}$/;
    return pattern.test(text);
}
export const CGPAValidation=(text)=>{
    var pattern = /^(10|\d)(\.\d{1,2})?$/;
    return pattern.test(text);
}
export const PercentageValidation=(text)=>{
    var pattern = /^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.0?0)?)$/;
    return pattern.test(text);
}