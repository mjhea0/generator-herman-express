function validateUsers(req, res, next) {
  if (req.method === 'POST') {
    req.checkBody('username', 'Username cannot be empty').notEmpty();
    req.checkBody('password', 'Password cannot be empty').notEmpty();
  }
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      message: 'Validation failed',
      failures: errors,
    });
  }
  return next();
}

module.exports = validateUsers;
