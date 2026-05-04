import nodemailer from "nodemailer";

export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { GMAIL_USER, GMAIL_PASS } = process.env;

  if (!GMAIL_USER || !GMAIL_PASS) {
    console.warn("📧 GMAIL_USER or GMAIL_PASS not found in environment variables. Skipping email sending.");
    return;
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("📧 Mail transport verified:", testResult);
  } catch (error) {
    console.error("📧 Mail transport error:", error);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: GMAIL_USER,
      to,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${body}</p>
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888; text-align: center;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    });
    console.log("📧 Email sent successfully:", sendResult.messageId);
    return sendResult;
  } catch (error) {
    console.error("📧 Error sending email:", error);
  }
}
