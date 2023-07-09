const colors = require("colors");
const messages = require("../util/messages");

module.exports = (req, res, next, customMsg = "") => {
  console.log("ResponseMiddleware => exports");

  const data = req.rData ? req.rData : {};
  const code = req.rCode != undefined ? req.rCode : 1;
  const message = customMsg
    ? customMsg
    : req.msg
    ? messages()[req.msg]
    : "success";

  //logging response
  console.log(
    colors.bgBlue(
      `${req.method} '${req.originalUrl}' => '${message}', Code: ${code}`
    )
  );

  // res.send({ code, message, data });

  if (code == 1) {
    return res.status(200).json({ code, message, data });
    // } else if (code == 2) {
    //   return res.status(200).json({ code, message, data });
  } else {
    return res.status(400).json({ code, message, data });
  }
};
