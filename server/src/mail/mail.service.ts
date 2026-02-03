import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface MeetingInvitationParams {
  to: string;
  studentName: string;
  facultyName: string;
  subjectName: string;
  subjectCode: string;
  meetLink: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  meetingTitle?: string;
  meetingDescription?: string;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendStudentCredentials(email: string, name: string, password: string) {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your Campus Management System Credentials',
      html: `
        <h1>Welcome to Campus Management System, ${name}!</h1>
        <p>Your account has been created successfully. Here are your login credentials:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>Please login and change your password as soon as possible.</p>
        <p>Best regards,<br>Administration</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Credentials email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send credentials email to ${email}:`, error);
    }
  }

  async sendMeetingInvitation(params: MeetingInvitationParams): Promise<void> {
    const {
      to,
      studentName,
      facultyName,
      subjectName,
      subjectCode,
      meetLink,
      scheduledDate,
      startTime,
      endTime,
      meetingTitle,
      meetingDescription,
    } = params;

    const title = meetingTitle || `Online Class: ${subjectName}`;
    const description = meetingDescription || `Join the online class for ${subjectName} (${subjectCode})`;

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject: `📹 ${title} - ${scheduledDate}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meeting Invitation</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📹 Online Class Invitation</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; color: #444;">Dear <strong>${studentName}</strong>,</p>
            
            <p style="font-size: 15px; color: #555;">You are invited to join an online class session. Please find the details below:</p>
            
            <div style="background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); border-radius: 10px; padding: 25px; margin: 25px 0; border-left: 4px solid #667eea;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <strong style="color: #667eea;">📚 Subject:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd; text-align: right;">
                    ${subjectName} (${subjectCode})
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <strong style="color: #667eea;">👨‍🏫 Faculty:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd; text-align: right;">
                    ${facultyName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <strong style="color: #667eea;">📅 Date:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd; text-align: right;">
                    ${scheduledDate}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #667eea;">⏰ Time:</strong>
                  </td>
                  <td style="padding: 10px 0; text-align: right;">
                    ${startTime} - ${endTime}
                  </td>
                </tr>
              </table>
            </div>

            ${description ? `<p style="font-size: 14px; color: #666; font-style: italic; margin: 20px 0;">"${description}"</p>` : ''}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${meetLink}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                🎥 Join Online Class
              </a>
            </div>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 13px; color: #856404;">
                <strong>⚠️ Important:</strong> Please join the meeting 5 minutes before the scheduled time. Make sure your audio and video are working properly.
              </p>
            </div>
            
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #888; margin: 0;">
                <strong>Meeting Link:</strong><br>
                <a href="${meetLink}" style="color: #667eea; word-break: break-all;">${meetLink}</a>
              </p>
            </div>
            
            <p style="margin-top: 25px; font-size: 14px; color: #666;">
              Best regards,<br>
              <strong style="color: #667eea;">Campus Management System</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
            <p>This is an automated message from Campus Management System.</p>
            <p>Please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Meeting invitation email sent to ${to}`);
    } catch (error) {
      console.error(`Failed to send meeting invitation to ${to}:`, error);
      throw error;
    }
  }
}
