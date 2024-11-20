const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const putObject = async (bucketName, key, body) => {
	const params = {
		Bucket: bucketName,
		Key: `${key}.json`,
		Body: JSON.stringify(body),
		ContentType: "application/json",
	};
	try {
		const command = new PutObjectCommand(params);
		const response = await s3Client.send(command);
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

const getObject = async (bucketName, key) => {
	const params = {
		Bucket: bucketName,
		Key: key,
	};
	try {
		const command = new GetObjectCommand(params);
		const response = await s3Client.send(command);
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	putObject,
	getObject,
};
