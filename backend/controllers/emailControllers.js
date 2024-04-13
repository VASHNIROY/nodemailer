import { createTransport } from "nodemailer";
import { createReadStream } from "fs";
import { dirname, join } from "path";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resumePath = join(
  __dirname,
  "..",
  "utils",
  "Vashni Roy Resume Full Stack Developer.pdf"
);

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email, designation, toName, position, companyName } = req.body;

  console.log(req.body);

  const subject = `Application for ${position}`;

  const HRmessage = `Dear ${toName},

I trust this message finds you well. My name is Vashni Roy, and I am writing to express my keen interest in the ${position} position at ${companyName}. Currently, I am employed as a Software Engineer at Labyrinth Global Solutions, where I have gained valuable experience over the past year in software development as a full-stack developer.

Enclosed, please find my resume for your review. I believe that my skills and experience align well with the requirements of the position, and I am eager to contribute my expertise to your esteemed organization.

I would greatly appreciate the opportunity to discuss how my background, skills, and enthusiasm can be of benefit to ${companyName}. Please consider this email as a formal request for an interview at your earliest convenience.

Thank you for considering my application. I look forward to the possibility of contributing to ${companyName}.

Best Regards,
Nallapu Vashni Roy
Contact No: 9866238940
Email: vashniroynallapu@gmail.com`;

  const EmployeeMessage = `Dear ${toName},

I trust this message finds you well. I recently came across an opportunity at ${companyName} for a ${position} role, and I am writing to inquire about the possibility of a referral.

I have over a year of experience in software development, currently serving as a Software Engineer at Labyrinth Global Solutions. My background includes expertise in frontend and backend technologies as well as a strong track record of delivering high-quality projects.

I believe that my skills and experience make me a suitable candidate for the role at ${companyName}. If possible, I would greatly appreciate your support in referring me for this position.

Enclosed, please find my resume for your review.

Thank you for considering my request. I look forward to the possibility of contributing to ${companyName}.

Best Regards,
Nallapu Vashni Roy
Contact No: 9866238940
Email: vashniroynallapu@gmail.com
`;

  let message = HRmessage;

  if (designation === "Employee") {
    message = EmployeeMessage;
  }

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
    attachments: [
      {
        filename: "Vashni Roy Resume Full Stack Developer.pdf",
        path: resumePath,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent successfully!");
      res.status(200).send("Email sent successfully");
    }
  });
});

export default sendEmail;
