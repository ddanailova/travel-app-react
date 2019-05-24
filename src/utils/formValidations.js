const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
const passwordRegex =/(?=^.{6,24}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/g;
const imageUrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

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
        case 'email':if(emailRegex.test(value.trim()) || value.trim()==="") return null;
         return 'Please provide a valid email in the format: example@example.com';
        case 'password':if(passwordRegex.test(value)) return null;
         return 'Password should be between 6 an 24 chars and have at least one number and one uppercase!';
        case 'confirmPassword':if(value === other.password) return null;
         return 'Passwords should match! Try again';
        case 'image':if(imageUrlRegex.test(value) || value.trim()==="") return null;
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
      }
   }
   const inputCount = Object.keys(errors).length;
   return validCount===inputCount;
}

export {validateInput, validateForm};