const Account = require('./accounts-model')
const router = require('express').Router()

const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require("../accounts/accounts-middleware")

router.get('/', (req, res, next) => {
  Account.getAll(req.query)
  .then(accounts =>{
    res.status(200).json(accounts)
  })
  .catch(err =>{
    res.status(500).json({message: ""})
  })
})

router.get('/:id', checkAccountId , (req, res, next) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Account.create(req.body)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(error =>{
      next(error)
    })
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Account.updateById(req.params.id, req.body)
    .then(account =>{
      res.status(200).json(account)
    })
    .catch(error =>{
      next(error)
    })
});

router.delete('/:id',checkAccountId, async (req, res, next) => {
  Account.deleteById(req.params.id)
    .then(() => {
      res.status(200).json({message: "deleted"})
    })
    .catch(error =>{
      res.status(500).json({ message: "Error removing user"})
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router; 
