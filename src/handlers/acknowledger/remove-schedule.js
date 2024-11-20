const {
  SchedulerClient,
  DeleteScheduleCommand,
} = require("@aws-sdk/client-scheduler");
const schedulerClient = new SchedulerClient({ region: process.env.AWS_REGION });
const deleteSchedule = async (eventId) => {
  const input = {
    Name: eventId,
  };

  try {
    const command = new DeleteScheduleCommand(input);
    const response = await schedulerClient.send(command);
    console.log("Scheduler remove :", response);
  } catch (error) {
    console.error(global, "Error in removing Scheduler :", Error(error));
    throw new Error(error);
  }
};

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};
