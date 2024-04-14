import {body} from "express-validator";

const addTaskValidation = [
    body("name", "Task name is required").not().isEmpty(),
];
export default addTaskValidation;