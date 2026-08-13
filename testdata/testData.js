const testData = {
  // ==================== Customer Data ====================
  customer: {
    companyName: `Automation Company ${Date.now()}`,
    firstName: 'Automation',
    lastName: 'Customer',
    email: `automation${Date.now()}@example.com`,
    primaryPhone: '9876543210',
    phoneExtension: '101',
    secondaryPhone: '9123456780',
    phone2Extension: '102',
    cell: '9988776655'
  },


  // ==================== Estimate Lead Data ====================
   estimateLead: {
    LeadsCompanyName: `Automation Lead ${Date.now()}`,
    firstName: 'Automation',
    lastName: 'Lead',
    primaryPhone: '9876543210',
    phoneExt: '101',
    secondaryPhone: '9123456780',
    phone2Ext: '102',
    cell: '9988776655',
    email: `automationlead${Date.now()}@example.com`,
    street: 'Maharana Pratap Garden',
    street2: 'Near Main Gate',
    city: 'Ahmedabad',
    state: 'Gujarat',
    zip: '380001'
  },

  opportunity:{
opportunityNumber: `OPP-${Date.now().toString().slice(-6)}`,
opportunityTitle: `OPP Title-${Date.now().toString().slice(-6)}`





  }




  
};

module.exports = testData;