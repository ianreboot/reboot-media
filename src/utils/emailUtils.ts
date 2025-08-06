// Utility to obfuscate email addresses from crawlers while maintaining functionality
export const getContactEmail = (): string => {
  const parts = ['info', 'rebootmedia', 'net'];
  return `${parts[0]}@${parts[1]}.${parts[2]}`;
};

export const getObfuscatedEmailDisplay = (): string => {
  return 'info [at] rebootmedia [dot] net';
};

// Generate email content for form submissions
export const generateEmailContent = (formData: any, formType: string = 'Contact') => {
  const timestamp = new Date().toLocaleString();
  
  return `
New ${formType} Form Submission - Reboot Media

CONTACT INFORMATION:
Name: ${formData.name || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Website: ${formData.website || 'Not provided'}

${formType === 'Lead Generation' ? `
BUSINESS DETAILS:
Primary Challenge: ${formData.challenge || 'Not specified'}
Current Revenue: ${formData.revenue || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}
Industry: ${formData.industry || 'Not specified'}
Team Size: ${formData.teamSize || 'Not specified'}
Specific Issue: ${formData.specificIssue || 'Not provided'}
Current Marketing: ${formData.currentMarketing || 'Not provided'}
` : `
INQUIRY DETAILS:
Service Interest: ${formData.serviceInterest || 'General inquiry'}
Subject: ${formData.subject || 'Not provided'}
Message: ${formData.message || 'Not provided'}
`}

---
Submitted: ${timestamp}
Form Type: ${formType}
Source: www.rebootmedia.net
IP: [Server will capture]
User Agent: [Server will capture]
  `;
};