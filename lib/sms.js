import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

let twilioClient = null;

if (accountSid && authToken) {
  twilioClient = twilio(accountSid, authToken);
}

export async function sendOTP(phone, otp) {
  try {
    if (!twilioClient) {
      console.log(`[SMS Mock] OTP for ${phone}: ${otp}`);
      return { success: true, message: 'OTP sent (mock mode)' };
    }

    const message = await twilioClient.messages.create({
      body: `Your Future Minds Institute OTP is: ${otp}. Valid for 60 seconds.`,
      from: phoneNumber,
      to: phone,
    });

    console.log('SMS sent:', message.sid);
    return { success: true, messageSid: message.sid };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, error: error.message };
  }
}
