module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const { createUserValidation, updateUserValidation, userStatusValidation, getUserValidation } = require("../validations/user.validation");
    const { authMiddlware } = require("../middlewares/auth.middleware");
    const { checkpermissionMiddlware } = require("../middlewares/checkpermission.middleware");

    prefix = "/api/v1/user"

    // app.post(prefix + "/user-status-update", checkpermissionMiddlware('user update'), userStatusValidation, user.userStatusUpdate);
    // app.post(prefix + "/user-status-update", authMiddlware, checkpermissionMiddlware('user update'), userStatusValidation, user.userStatusUpdate);
    app.post(prefix + "/getUser", authMiddlware, getUserValidation, user.getUser);
    // app.post(prefix + "/getUser", authMiddlware, checkpermissionMiddlware('user list'), getUserValidation, user.getUser);
    // app.post(prefix + "/getAllUsers_p", authMiddlware, checkpermissionMiddlware('user list'), user.getAllUsers_p);
    // app.post(prefix + "/createUser", authMiddlware, checkpermissionMiddlware('user create'), createUserValidation, user.createUser);
    // app.post(prefix + "/updateUser", authMiddlware, checkpermissionMiddlware('user update'), updateUserValidation, user.updateUser);
    
    // excel
//     app.post(prefix + "/getAllUsers_csv_custom_instant", authMiddlware, checkpermissionMiddlware('user list'), user.getAllUsers_csv_custom_instant);
//     app.post(prefix + "/getAllUsers_exceljs_excel_instant", authMiddlware, checkpermissionMiddlware('user list'), user.getAllUsers_exceljs_excel_instant);
};