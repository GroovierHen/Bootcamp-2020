import { messaging } from "./firebaseInit";

type Data = { [key: string]: string };

export const sendNotificationToClient = async (
  tokens: string[],
  data: Data
) => {
  try {
    const msgResponse = await messaging.sendMulticast({ tokens, data });
    const successes = msgResponse.responses.filter((r) => r.success === true);
    const failures = msgResponse.responses.filter(
      (r) => r.success === false
    ).length;
    console.log(
      "Notifications sent:",
      `${successes} successful, ${failures} failed`
    );
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
