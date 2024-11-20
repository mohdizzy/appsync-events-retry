const {
  SchedulerClient,
  CreateScheduleCommand,
  FlexibleTimeWindowMode,
  ActionAfterCompletion,
} = require("@aws-sdk/client-scheduler");

exports.handler = async (event, context) => {
  console.log("Event :", event);
  const eventID = event.detail.eventID;

  //remove event from scheduler
};
