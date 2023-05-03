import {PROJECT_STATUS} from '../config/constants'

const getProjectStatus = (startDate, endDate) => {
  const diff = new Date(endDate) - new Date(startDate);
  return diff > 0 ? PROJECT_STATUS.inProcess : PROJECT_STATUS.completed
};


export default getProjectStatus;