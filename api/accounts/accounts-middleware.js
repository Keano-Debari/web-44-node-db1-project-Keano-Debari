const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {title, contents} = req.body
  if(title && contents) {
    next()
  } else {
    res.status(400).json("title and contents required")
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  let newName = req.body.name;
  newName = newName.trim().toLowerCase();

  Account.getAll()
    .then ((accounts) => {
      const existingAccount = accounts.find((account) => {
        return account.name.trim().toLowerCase() === newName;
      })

      if (existingAccount) {
        return res.status(400).json({ message: "that account name is taken" });
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await Account.getById(req.params.id)
    if(account){
      req.account = account
      next()
    } else {
      res.status(404).json("Account not found")
    }
  } catch (err) {
    next(err)
  }
}
