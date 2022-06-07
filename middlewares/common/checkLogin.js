const jwt = require("jsonwebtoken");

// auth guard to protect routes that need authentication
const checkLogin = (req, res, next) => {
  
    const token = req.headers.authorization;

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } else {
        throw new Error("jwt token not find")
    }


//   if (cookies) {
//     try {
//       token = cookies[process.env.COOKIE_NAME];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;

//       // pass user info to response locals
//       if (res.locals.html) {
//         res.locals.loggedInUser = decoded;
//       }
//       next();
//     } catch (err) {
//       if (res.locals.html) {
//         res.redirect("/");
//       } else {
//         res.status(500).json({
//           errors: {
//             common: {
//               msg: "Authentication failure!",
//             },
//           },
//         });
//       }
//     }
//   } else {
//     if (res.locals.html) {
//       res.redirect("/");
//     } else {
//       res.status(401).json({
//         error: "Authetication failure!",
//       });
//     }
//   }
};


// guard to protect routes that need role based authorization
// function requireRole(role) {
//   return function (req, res, next) {
//     if (req.user.role && role.includes(req.user.role)) {
//       next();
//     } else {
//       if (res.locals.html) {
//         next(createError(401, "You are not authorized to access this page!"));
//       } else {
//         res.status(401).json({
//           errors: {
//             common: {
//               msg: "You are not authorized!",
//             },
//           },
//         });
//       }
//     }
//   };
// }

module.exports = {
  checkLogin
};