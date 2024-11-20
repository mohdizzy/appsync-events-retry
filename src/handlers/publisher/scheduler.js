const {
  SchedulerClient,
  CreateScheduleCommand,
  FlexibleTimeWindowMode,
  ActionAfterCompletion,
} = require("@aws-sdk/client-scheduler");
const { logger } = require("../../utils/logger");
const schedulerClient = new SchedulerClient({ region: process.env.AWS_REGION });

const createEventScheduler = async (eventId) => {
  const currentDateTime = new Date();
  const input = {
    Name: eventId,
    Description: "Scheduler to Published event",
    ScheduleExpression: "rate(1 minute)",
    Target: {
      Arn: process.env.RETRIER_LAMBDA,
      RoleArn: process.env.SERVICE_ROLE,
      //   DeadLetterConfig: {
      //     // DeadLetterConfig
      //     Arn: process.env.DLQ_ARN,
      //   },
      Input: JSON.stringify({ eventId }),
    },
    FlexibleTimeWindow: {
      // FlexibleTimeWindow
      Mode: FlexibleTimeWindowMode.OFF,
    },
    StartDate: currentDateTime,
    EndDate: addMinutes(currentDateTime, 10),
    ActionAfterCompletion: ActionAfterCompletion.DELETE,
  };

  try {
    const command = new CreateScheduleCommand(input);
    const createScheduleResponse = await schedulerClient.send(command);
    logger.info("Scheduler Created", createScheduleResponse);
  } catch (error) {
    logger.error("Error in creating schedule", error);
    throw new Error(error);
  }
};

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

module.exports = {
  createEventScheduler,
};
