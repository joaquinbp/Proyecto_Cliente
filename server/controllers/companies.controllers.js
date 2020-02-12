const Company = require('../models/company');
const companiesController = {};

companiesController.getCompanies = async (req, res) => {
    try{
        const companies = await Company.find();
    res.json(companies);
    }catch(error){
        res.json({status: 'Get companies failed'});
    } 
   
};

companiesController.createCompany = async (req, res) =>{
    try{
        const company = new Company(req.body);
        await company.save();
        res.json({
            status: 'Company save'
        });  
    } catch(error){
        res.json({status: 'Create company failed'});
    }     
};

companiesController.getCompany = async (req, res) =>{
    try{
        const company = await Company.findById(req.params.id);
    res.json(company);
    }catch(error){
        res.json({status: 'Get company failed'});
    }     
};

companiesController.editCompany = async (req, res) =>{
    try{
        const {id} = req.params;
        const company = {
            user: req.body.user,
            password: req.body.password,
            name : req.body.name,
            CIF : req.body.CIF,
            email : req.body.email,
            logo : req.body.logo,
            address : req.body.address,
            city: req.body.city,
            sector : req.body.sector,
            address : req.body.address,
            sector : req.body.sector,
            score: req.body.score,
            comments : req.body.comments
    
        }
    
        await Company.findByIdAndUpdate(id,{$set:company},{new:true});
        res.json({status:'Company update'});
    } catch(error){
        res.json({status: 'Update company failed'});
    } 
};

companiesController.deleteCompany = async (req, res) =>{
    try{
        await Company.findByIdAndDelete(req.params.id);
    res.json({status:'Company delete'});
    }catch(error){
        res.json({status: 'Delete company failed'});
    } 
    
    
}

module.exports = companiesController;