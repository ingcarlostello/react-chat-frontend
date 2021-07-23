// @momentjs
import moment from 'moment';

export const hourMonth = (theDate) => {
    const today = moment(theDate);
    return today.format('HH:mm a | MMM Do');
}