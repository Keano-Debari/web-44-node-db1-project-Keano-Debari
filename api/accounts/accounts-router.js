const router = require('express').Router()

const router = require('express').Router()

const Account = require('./accounts-model');

const imports = require('./accounts-middleware');
const checkAccountId = imports.checkAccountId;
const checkAccountPayload = imports.checkAccountPayload;
const checkAccountNameUnique = imports.checkAccountNameUnique;

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll() 
    console.log('accounts: ', accounts)
    res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  try {
    const accountById = await Account.getById(id)
    console.log('accountById: ', accountById);
    res.status(200).json(accountById);
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
  const newAccount = req.body;
  console.log('newAccount: ', newAccount);
  try {
    const postedAccount = await Account.create(newAccount)
    console.log('postedAccount: ', postedAccount);
    res.status(201).json(postedAccount);
  } catch (err) {
    console.log('Error in create: ', err)
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  const changes = req.body;
  try {
    const updatedAccount = await Account.updateById(id, changes);
    console.log('updatedAccount: ', updatedAccount);
    res.status(200).json(updatedAccount);
  } catch (err) {
    console.log('Error in updateById: ', err)
    next(err)
  }
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  try {
    const deletedAccount = await Account.deleteById(id);
    console.log('deletedAccount: ', deletedAccount);
    res.status(200).json(deletedAccount);
  } catch (err) {
    console.log('Error in deleteById: ', err)
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  const status = err.status || 500
  res.status(status).json({
    message: err.message,
  })
})

module.exports = router;
