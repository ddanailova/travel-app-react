const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
const passwordRegex =/(?=^.{6,24}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/g;

 const inputValidation = (name, value)=>{
     switch(name){
        case 'userName':if(value.trim().length > 0) return null;
            return 'This field is required!';
        case 'email':if(emailRegex.test(value.trim())) return null;
        return 'Please provide a valid email in the format: example@example.com';
        case 'password':if(passwordRegex.test(value)) return null;
        return 'Password should be between 6 an 24 chars and have at least one number and one uppercase!';
        case 'confirmPassword':if(value.trim().length > 0) return null;
        return 'This field is required!';
        default: return;
     }

}

export default inputValidation;