export const generateLeadEmailContent = (data) => {
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
export const generateContactEmailContent = (data) => {
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
export const sendEmail = async (to, subject, content, fromEmail) => {
    try {
        console.log('📧 Email would be sent:');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Content: ${content.substring(0, 200)}...`);
        await new Promise(resolve => setTimeout(resolve, 100));
        return true;
    }
    catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
};
export const processLeadSubmission = async (data) => {
    const emailContent = generateLeadEmailContent(data);
    const subject = `New Lead: ${data.company} - ${data.name}`;
    const businessEmail = process.env.BUSINESS_EMAIL || 'leads@rebootmedia.com';
    return await sendEmail(businessEmail, subject, emailContent);
};
export const processContactSubmission = async (data) => {
    const emailContent = generateContactEmailContent(data);
    const subject = `Contact Form: ${data.subject}`;
    const businessEmail = process.env.BUSINESS_EMAIL || 'contact@rebootmedia.com';
    return await sendEmail(businessEmail, subject, emailContent);
};
//# sourceMappingURL=emailService.js.map