import {EMAIL_REGEX, PASSWORD_REGEX, IMAGE_URL_REGEX, NOT_REQUIRED_INPUTS_WITH_VALIDITY_CHECKS} from './../static/formInputConstants';

 const validateInput = (name, value, required, other)=>{
      const isTextValueRequired = typeof value === 'string' && value.trim().length <= 0 && required;
      const isValueRequired = typeof value !== 'string' && value && required;
     if(isTextValueRequired){
        return 'This field is required!';
     }

     if(isValueRequired){
      return 'This field is required!';
      }
      
     switch(name){
        // case 'username':if(value.trim().length > 0) return null;
        //     return 'This field is required!';
        case 'email':if(EMAIL_REGEX.test(value.trim()) || value.trim()==="") return null;
         return 'Please provide a valid email in the format: example@example.com';
        case 'password':if(PASSWORD_REGEX.test(value)){
           console.log(`this ${value} is ${PASSWORD_REGEX.test(value)}`)
           return null } else {
            console.log(`this ${value} is ${PASSWORD_REGEX.test(value)}`)
            return 'Password should be between 6 an 24 chars and have at least one number and one uppercase!';
            }
         
        case 'confirmPassword':if(value === other.password) return null;
         return 'Passwords should match! Try again';
        case 'image':if(IMAGE_URL_REGEX.test(value) || value.trim()==="") return null;
         return 'Please provide a valid URL starting with http and ending with jpg, gif or png.';
        default: return null;
     }

}

//TODO fix the form validation
const validateForm = (errors, data)=>{
   let validCount = 0;
   for (const inputName in errors) {
      if(errors[inputName] === null){
         validCount++;
      }else if(NOT_REQUIRED_INPUTS_WITH_VALIDITY_CHECKS.includes(inputName) && errors[inputName] === ''){
         validCount++;
      }
   }
   const inputCount = Object.keys(errors).length;
   return validCount===inputCount;
}

export {validateInput, validateForm};