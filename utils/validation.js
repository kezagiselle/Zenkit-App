import {body} from "express-validator";

const addTaskValidation = [
    body("name", "Task name is required").not().isEmpty(),
    // body("email","Email is required").isEmail()
];

const addTagValidation = [
    body("name", "Tag name is required").not().isEmpty(),
];

const addCheckListItemValidation = [
    body("name", "Item name is required").not().isEmpty(),
];
const testValidation = [
    body("name", "Test name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email" , "Invalid email").isEmail(),
];
const signUpValidation = [
    body("firstName", "First name is required").not().isEmpty(),
    body("lastName", "Last name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "invalid email").isEmail(),
    body("password", "password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lowercase letters").isStrongPassword()
];
const signInValidation = [
  body("email", "Email is required").not().isEmpty(),
  body("email", "invalid email").isEmail(),
  body("password", "password is required").not().isEmpty(),
  body("password", "invalid password").isStrongPassword()
];
const otpValidation = [
    body("otp","otp must be provided").not().isEmpty()
];

const allValidations = {
    addTaskValidation,
    addTagValidation,
    addCheckListItemValidation,
    testValidation,
    signUpValidation,
    signInValidation,
    otpValidation
};
export default allValidations;


