// const nodemailer = require("nodemailer");
// const Mailgen = require("mailgen");
// const { EMAIL, PASSWORD } = require("../env.js");
// const signup = async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount()


//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   });

//   let message = {
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   }
//   transporter.sendMail(message).then((info) => {
//     return res.status(201).json({
//       msg: "you should receive email",
//       info: info.messageId,
//       preview: nodemailer.getTestMessageUrl(info)
//     })
//   }).catch(error => {
//     return res.status(500).json({ msg: error })
//   })
// }

// const getbill = (req, res) => {
//   const { userEmail } = req.body;
//   let config = {
//     service: "gmail",
//     auth: {
//       user: EMAIL,
//       pass: PASSWORD,
//     },
//   };
//   const transporter = nodemailer.createTransport(config);
//   let MailGenerator = new Mailgen({
//     theme: "default",
//     product: {
//       name: "Mailgen",
//       link: "https://mailgen.js/",
//     },
//   });
//   let response = {
//     body: {
//       name: "Sant Club",
//       intro: "your bill is arrived",
//       tableItem: [
//         {
//           item: "Nodemailer stock book",
//           description: "A backend application",
//           price: "$10.99",
//         },
//       ],
//       outro: "looking forward to do more buisness",
//     },
//   };
//   let mail = MailGenerator.generate(response);
//   let message = {
//     from: EMAIL,
//     to: userEmail,
//     suject: "placedOrder",
//     html: mail,
//   };
//   transporter
//     .sendMail(message)
//     .then(() => {
//       return res.status(201).json({
//         msg: "you should recive an email",
//       });
//     })
//     .catch((error) => {
//       return res.status(500).json({msg : error });
//     });

//   // res.status(201).json("getBill Successfully...")
// }

// module.exports = {
//   signup,
//   getbill
// }

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
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
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

  //   res.status(201).json("Signup Successfully...!");
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

  //   res.status(201).json("getBill Successfully...!");
};
module.exports = { signup, getbill };