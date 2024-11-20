const { logger } = require("../../utils/logger");
const { deleteSchedule } = require("./remove-schedule");

exports.handler = async (event, context) => {
  logger.info("Acknowledger started", event);

  try {
    const eventId =
      typeof event.body === "string"
        ? JSON.parse(event.body).eventId
        : event.body.eventId;

    //remove event from scheduler
    await deleteSchedule(eventId);

    logger.info("Acknowledger completed");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message acknowledged" }),
    };
  } catch (error) {
    logger.error("Something went wrong", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error acknowledging message" }),
    };
  }
};
