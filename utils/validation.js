import {body} from "express-validator";

const addTaskValidation = [
    body("name", "Task name is required").not().isEmpty(),
    body("email","Email is required").isEmail()
];
export default addTaskValidation;