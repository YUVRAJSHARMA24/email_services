const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../env.js");
const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let message = {
    from: '"Yuvraj" <yuvraj.june2002@gmail.com>', // sender address
    to: "pearlThought@example.com, baz@example.com", // list of receivers
    subject: "Application for SDE role", // Subject line
    text: "Good Evening PearlThought team", // plain text body
    html: "<b>Hi! Nice to meet you</b>", // html body
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should recive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ msg: error });
    });

};
const getbill = (req, res) => {
  const { userEmail } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: "uvcan",
      intro: "your bill is arrived",
      tableItem: [
        {
          item: "Nodemailer stock book",
          description: "A backend application",
          price: "$10.99",
        },
      ],
      outro: "looking forward to do more buisness",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: EMAIL,
    to: userEmail,
    suject: "placedOrder",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should recive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ msg: error });
    });
};
module.exports = { signup, getbill };