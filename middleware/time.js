import durationCalculator from '../utils/helperFunction.js';
const setTime = async (req,res,next) => {
    var  startTime = "";
    var endTime = "";
    if(req.body.dueDate.startDate){
        startTime = new Date(req.body.dueDate.startDate.slice(0,-1)).toLocaleTimeString();
    }
    if(req.body.dueDate.endDate){
        endTime = new Date(req.body.dueDate.endDate.slice(0,-1)).toLocaleTimeString();
    }
    req.body.dueDate.startTime = startTime;
    req.body.dueDate.endTime = endTime;

    const duration = durationCalculator(req.body.dueDate.startDate, req.body.dueDate.endDate);
    req.body.dueDate.duration = duration.durationPeriod;
    req.body.dueDate.durationType = duration.durationType;

    next();
}
export const updateTime = async (req, res, next) => {
    var startTime = "";
    var endTime = "";

    if (req.body.dueDate == {}) {
        req.body.dueDate = {};
        next();
    } else {
        // Fetch previously existing task to get the due date.
        

        if (req.body.dueDate.startDate) {
            startTime = new Date(req.body.dueDate.startDate.slice(0, -1)).toLocaleTimeString();
            req.body.dueDate.startTime = startTime;
        }

        if (req.body.dueDate.endDate) {
            endTime = new Date(req.body.dueDate.endDate.slice(0, -1)).toLocaleTimeString();
            req.body.dueDate.endTime = endTime;
        }

        if (req.body.dueDate.startDate && req.body.dueDate.endDate && !req.body.dueDate.duration) {
            const duration = durationCalculator(req.body.dueDate.startDate, req.body.dueDate.endDate);
            req.body.dueDate.duration = duration.durationPeriod;
            req.body.dueDate.durationType = duration.durationType;
        }

        next();
    }
}
export default setTime;