const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
const PASSWORD_REGEX =/(?=^.{6,24}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/g;
const IMAGE_URL_REGEX = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
const NOT_REQUIRED_INPUTS_WITH_VALIDITY_CHECKS = ['email', 'image'];

const DEFAULT_INPUTS = {
    _id:'',
    destination:'',
    image:'',
    places:'',
    startDate:'',
    endDate:'',
    privacy:false
}

const DEFAULT_ERROR_FIELDS = {
    destination:'',
    image:'',
    startDate:'',
    endDate:'',
}

const ERROR_FIELDS_FOR_VALID_FORM = {
    destination:null,
    image:null,
    startDate:null,
    endDate:null,
}

export {EMAIL_REGEX, PASSWORD_REGEX, IMAGE_URL_REGEX, NOT_REQUIRED_INPUTS_WITH_VALIDITY_CHECKS, DEFAULT_INPUTS, DEFAULT_ERROR_FIELDS, ERROR_FIELDS_FOR_VALID_FORM }