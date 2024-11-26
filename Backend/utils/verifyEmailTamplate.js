const verifyEmailTamplate = ({ name, url }) => {
    return `
    <p>Dear ${name},</p>
    <p>Thank you for registering with Binkit.</p>
    <a href="${url}" style="color: white; background: blue; margin-top: 10px; padding:20px,display:block">
        Verify Email
    </a>
    `;
};

export default verifyEmailTamplate;
