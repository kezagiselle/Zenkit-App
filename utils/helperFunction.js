const durationCalculator = (startDate, endDate) => {
    const duration = {
        durationPeriod:0,
        durationType:""
    };
    var startDateAsNumber = new Date(startDate).getTime();
    var endDateAsNumber = new Date(endDate).getTime();
    var oneHour = 1000*60*60;
    var difference = endDateAsNumber - startDateAsNumber;
    var numberOfHours = difference/oneHour;

    if(numberOfHours < 1){
        let numberOfMinutes = difference/(1000*60);
        duration.durationPeriod = numberOfMinutes;
        duration.durationType = "Minutes";
    } else if(numberOfHours >= 1 && numberOfMinutes < 24){
        duration.durationPeriod = numberOfHOurs;
        duration.durationType = "Hours";
    } else if(numberOfHours >= 24 && numberOfHours < 168){
        duration.durationPeriod = numberOfMinutes/24;
        duration.durationType = "Days";
    }
    return duration;
};
export default durationCalculator;