
module.exports = {
  production: {
    deployPath: 'C:\\inetpub\\wwwroot\\spectrak',
    debug: false,
    express: {
      port: process.env.PORT || 3000,
      host: process.env.WEBSITE_HOSTNAME || `localhost:${process.env.PORT || 3000}`,
      siteRoot: '/spectrak/'
    },
    sequelize: {
      host: 'SQLDEN12R4E01',
      database: 'FIS_CONED',
      username: 'netstorm_ro',
      password: 'netstorm_ro',
      schema: 'spectrak',
      logging: false,
      forceSync: false
    }
  },
  development: {
    deployPath: 'C:\\inetpub\\wwwroot\\spectrak',
    debug: true,
    express: {
      port: process.env.PORT || 3000,
      host: process.env.WEBSITE_HOSTNAME || `localhost:${process.env.PORT || 3000}`,
      siteRoot: '/spectrak/'
    },
    sequelize: {
      host: 'SQLDEN12R4E01',
      database: 'FIS_CONED',
      username: 'netstorm_ro',
      password: 'netstorm_ro',
      schema: 'spectrak',
      logging: true,
      forceSync: false,
      initialData: {
        specifications: [
          { type: 'EO', documentNumber: '10359', title: '', issueDate: new Date(), sectionCode: '123', hasDwg: false, citationNumber: '04-M-BLAH', regulatedBy: 'PSC', description: 'My nonsense description', createdBy: 'AHMETAJD' },
          { type: 'EOP', documentNumber: '28237', title: '', issueDate: new Date(), sectionCode: '1AB', hasDwg: null, citationNumber: '299BN-BLAH', regulatedBy: 'PSC', description: 'My nonsense description', createdBy: 'AHMETAJD' },
          { type: 'EO', documentNumber: '28671', title: '', issueDate: new Date(), sectionCode: '004', hasDwg: true, citationNumber: '30-MA-1aw', regulatedBy: 'NESC', description: 'My nonsense description', createdBy: 'AHMETAJD' },
          { type: 'B', documentNumber: '48593', title: '', issueDate: new Date(), sectionCode: 'B82', hasDwg: true, citationNumber: 'WHOO-HOO', regulatedBy: 'PSC', description: 'My nonsense description', createdBy: 'AHMETAJD' },
          { type: 'EO', documentNumber: '02938', title: '', issueDate: new Date(), sectionCode: '281', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'NESC', description: 'My nonsense description', createdBy: 'AHMETAJD' }
        ],
        regulations: [
          { code: 'WHOOHOO', name: 'Whoo Hoo', shortDescription: 'really fun', longDescription: 'really really fun', regulatedBy: 'PSC', citationNumber: '021-cvwe-f338', isTrainingRequired: false, regulationText: 'boring', requiredActivity: 'i have no clue'},
          { code: 'ABC', name: 'ABC regulation', shortDescription: 'the alphabet', longDescription: 'this regulation is zzzZZZ', regulatedBy: 'PSC', citationNumber: '292fdjjhf', isTrainingRequired: true, regulationText: 'boring', requiredActivity: 'i have no clue'},
          { code: 'NOOB', name: 'Noobz', shortDescription: 'rizzo', longDescription: 'joe rizzo', regulatedBy: 'PSC', citationNumber: 'd0uch3', isTrainingRequired: null, regulationText: 'boring', requiredActivity: 'i have no clue'}
        ]
      }
    }
  }
};
