import { LeadFormData, ContactFormData } from '../validators/formValidators.js';

/**
 * Generate email content for lead forms
 */
export const generateLeadEmailContent = (data: LeadFormData): string => {
  const timestamp = new Date().toLocaleString();
  
  return `
New Lead Form Submission - ${timestamp}

CONTACT INFORMATION:
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Website: ${data.website || 'Not provided'}

BUSINESS DETAILS:
Revenue Stage: ${data.revenue || 'Not specified'}
Industry: ${data.industry || 'Not specified'}
Team Size: ${data.teamSize || 'Not specified'}
Timeline: ${data.timeline || 'Not specified'}

MARKETING CHALLENGE:
${data.specificIssue}

CURRENT MARKETING:
${data.currentMarketing || 'Not provided'}

---
Submitted: ${timestamp}
Source: Reboot Media Website
`.trim();
};

/**
 * Generate email content for contact forms
 */
export const generateContactEmailContent = (data: ContactFormData): string => {
  const timestamp = new Date().toLocaleString();
  
  return `
New Contact Form Submission - ${timestamp}

FROM: ${data.name} <${data.email}>
SUBJECT: ${data.subject}

MESSAGE:
${data.message}

---
Submitted: ${timestamp}
Source: Reboot Media Website
`.trim();
};

/**
 * Simulate email sending (replace with actual email service)
 * In production, replace this with your email service (SendGrid, Mailgun, etc.)
 */
export const sendEmail = async (
  to: string,
  subject: string,
  content: string,
  fromEmail?: string
): Promise<boolean> => {
  try {
    // Log email for development/testing
    console.log('📧 Email would be sent:');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${content.substring(0, 200)}...`);
    
    // TODO: Replace with actual email service
    // Example with SendGrid:
    // const msg = {
    //   to,
    //   from: fromEmail || process.env.FROM_EMAIL,
    //   subject,
    //   text: content,
    // };
    // await sgMail.send(msg);
    
    // Simulate async email sending
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

/**
 * Process lead form submission
 */
export const processLeadSubmission = async (data: LeadFormData): Promise<boolean> => {
  const emailContent = generateLeadEmailContent(data);
  const subject = `New Lead: ${data.company} - ${data.name}`;
  
  // Send to your business email
  const businessEmail = process.env.BUSINESS_EMAIL || 'leads@rebootmedia.com';
  
  return await sendEmail(businessEmail, subject, emailContent);
};

/**
 * Process contact form submission
 */
export const processContactSubmission = async (data: ContactFormData): Promise<boolean> => {
  const emailContent = generateContactEmailContent(data);
  const subject = `Contact Form: ${data.subject}`;
  
  // Send to your business email
  const businessEmail = process.env.BUSINESS_EMAIL || 'contact@rebootmedia.com';
  
  return await sendEmail(businessEmail, subject, emailContent);
};