import NotFoundError from "../Errors.js/NotFoundError.js";
import BadRequestError from "../Errors.js/BadRequestError.js";
import TagModel from "../models/tag.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const addTag = asyncWrapper(async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        next(new BadRequestError(errors.array([0].msg)));
    }

    const newTag = await TagModel.create(req.body);
    return res.status(201).json(newTag);
});

const getTag = asyncWrapper(async (req,res,next) => {
    const tags = await TagModel.find({});
    if(tags){
        return res.status(200).json({
            nbHits: tags.length,
            tags
        });
    }
})

const updateTag = asyncWrapper(async (req,res,next) => {
    const tagId = req.query.id;
    const updates = req.body;

    const updatedTag = await TagModel.findByIdAndUpdate(tagId, updates, {new: true});
    if(!updatedTag){
        return next(new NotFoundError('Tag not found'));
    }
    return res.status(200).json(updatedTag);
});

const findById = asyncWrapper(async (req,res,next) => {
    const tagId = req.query.id;
    const foundTag = await TagModel.findById(tagId);
    if(!foundTag){
        return next(new NotFoundError("Tag not found"));
    }
    return res.status(200).json(foundTag);
    
});

const deleteTag = asyncWrapper(async (req,res,next) => {
    const tagId = req.query.id;
    const deletedTag = await TagModel.findByIdAndDelete(tagId);
    if(!deletedTag){
        return next(new NotFoundError('Tag not found'));
    }
    return res.status(200).json({message: 'Tag deleted'});
});

const TagControllers = {
    addTag,
    getTag,
    updateTag,
    findById,
    deleteTag
};
export default TagControllers;