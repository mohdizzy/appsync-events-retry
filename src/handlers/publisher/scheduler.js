const createEventScheduler = async (eventId) => {
	const currentDateTime = new Date();
	const input = {
		Name: eventId,
		Description: 'Scheduler to Published event',
		ScheduleExpression: 'rate(1 minute)',
		Target: {
			Arn: process.env.BOARDING_START_SQS_ARN,
			RoleArn: process.env.SERVICE_ROLE,
			DeadLetterConfig: {
				// DeadLetterConfig
				Arn: process.env.BOARDING_START_DLQ_ARN,
			},
			Input: JSON.stringify(sqsMessage),
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
		console.log('Scheduler Created :', createScheduleResponse);
	} catch (error) {
		logger(global, 'Error In Creating Scheduler :', Error(error));
		throw new Error(error);
	}
};

const addMinutes = (date, minutes) => {
	return new Date(date.getTime() + minutes * 60000);
};
