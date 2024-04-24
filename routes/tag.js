import express from "express";
import TagControllers from "../controllers/tag.js";
// import addTagValidation from "../utils/validation";
const tagRouter = express.Router();

tagRouter.post('/add',TagControllers.addTag);
tagRouter.get('/list',TagControllers.getTag);
tagRouter.put('/update',TagControllers.updateTag);
tagRouter.get('/findById',TagControllers.findById);
tagRouter.delete('/delete',TagControllers.deleteTag);

export default tagRouter;

