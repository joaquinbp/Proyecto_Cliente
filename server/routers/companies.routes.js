const express = require('express');
const router = express.Router();
const companiesController=require('../controllers/companies.controllers');
const md_auth = require('../middleware/authenticated');

router.get('/', md_auth.ensureAuth, companiesController.getCompanies);
router.post('/', md_auth.ensureAuth, companiesController.createCompany);
router.get('/:id', md_auth.ensureAuth, companiesController.getCompany);
router.put('/:id', md_auth.ensureAuth, companiesController.editCompany);
router.delete('/:id', md_auth.ensureAuth, companiesController.deleteCompany);

module.exports = router;