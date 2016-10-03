
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
      siteRoot: '/'
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
          { type: 'EO', documentNumber: '10359', title: '', issueDate: new Date(), sectionCode: '123', hasDwg: false, citationNumber: '04-M-BLAH', regulatedBy: 'PSC', description: 'My nonsense description', createdBy: 'CONED\\AHMEATJD', isActive: false },
          { type: 'EO', documentNumber: '10359', title: 'UPDATED', issueDate: new Date(), sectionCode: '123', hasDwg: false, citationNumber: '04-M-BOOHOO', regulatedBy: 'PSC', description: 'My UPDATED NONSENSE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '2643', title: 'DION IS BLEH', issueDate:'2010-01-27', sectionCode: '690', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'PSC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '5027', title: 'DION IS BLEH', issueDate:'2013-10-27', sectionCode: '361', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'NESC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '8837', title: 'DION SMELLS BAD', issueDate:'2015-02-12', sectionCode: '487', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'NESC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '9102', title: 'DION IS QUITE ROTUND', issueDate:'2012-12-28', sectionCode: '937', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '2339', title: 'DION IS BLEH', issueDate:'2013-07-01', sectionCode: '260', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '8993', title: 'DION SMELLS BAD', issueDate:'2014-03-19', sectionCode: '612', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '8231', title: 'DION SMELLS BAD', issueDate:'2012-11-02', sectionCode: '811', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'NESC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '3561', title: 'DION IS BLEH', issueDate:'2012-01-05', sectionCode: '176', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '6316', title: 'DION IS BLEH', issueDate:'2015-12-26', sectionCode: '896', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '4539', title: 'DION SMELLS BAD', issueDate:'2014-11-10', sectionCode: '881', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '4618', title: 'DION SMELLS BAD', issueDate:'2015-07-02', sectionCode: '700', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'NESC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '9482', title: 'DION SMELLS BAD', issueDate:'2013-12-06', sectionCode: '525', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'NESC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '5194', title: 'DION IS QUITE ROTUND', issueDate:'2014-07-20', sectionCode: '278', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '7001', title: 'DION IS BLEH', issueDate:'2010-02-28', sectionCode: '284', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '6135', title: 'DION IS QUITE ROTUND', issueDate:'2010-03-29', sectionCode: '232', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '8629', title: 'DION IS QUITE ROTUND', issueDate:'2012-08-01', sectionCode: '238', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'PSC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '2693', title: 'DION SMELLS BAD', issueDate:'2014-11-29', sectionCode: '548', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'NESC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '8421', title: 'DION SMELLS BAD', issueDate:'2014-06-16', sectionCode: '934', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '3823', title: 'DION IS QUITE ROTUND', issueDate:'2014-04-24', sectionCode: '404', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '3738', title: 'DION SMELLS BAD', issueDate:'2012-10-25', sectionCode: '326', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'PSC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '6447', title: 'DION IS BLEH', issueDate:'2014-09-16', sectionCode: '321', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '1490', title: 'DION IS BLEH', issueDate:'2014-01-03', sectionCode: '216', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '3722', title: 'DION IS BLEH', issueDate:'2010-03-03', sectionCode: '489', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '6490', title: 'DION SMELLS BAD', issueDate:'2012-01-19', sectionCode: '109', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'NESC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '7395', title: 'DION IS QUITE ROTUND', issueDate:'2010-01-03', sectionCode: '599', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'PSC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '8362', title: 'DION IS BLEH', issueDate:'2010-10-28', sectionCode: '202', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '2233', title: 'DION IS QUITE ROTUND', issueDate:'2013-09-25', sectionCode: '195', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '5297', title: 'DION IS QUITE ROTUND', issueDate:'2010-07-09', sectionCode: '534', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '9663', title: 'DION IS QUITE ROTUND', issueDate:'2014-07-10', sectionCode: '724', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '8161', title: 'DION SMELLS BAD', issueDate:'2013-09-23', sectionCode: '179', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'PSC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '8825', title: 'DION IS BLEH', issueDate:'2014-07-01', sectionCode: '543', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '3158', title: 'DION IS QUITE ROTUND', issueDate:'2014-02-01', sectionCode: '261', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '9990', title: 'DION IS QUITE ROTUND', issueDate:'2013-12-07', sectionCode: '560', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '1128', title: 'DION IS BLEH', issueDate:'2011-11-22', sectionCode: '412', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '2535', title: 'DION IS BLEH', issueDate:'2015-04-11', sectionCode: '138', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '5047', title: 'DION IS QUITE ROTUND', issueDate:'2016-05-07', sectionCode: '485', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '1265', title: 'DION SMELLS BAD', issueDate:'2015-07-15', sectionCode: '325', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '7652', title: 'DION IS BLEH', issueDate:'2012-12-04', sectionCode: '998', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'NESC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '1277', title: 'DION SMELLS BAD', issueDate:'2014-05-02', sectionCode: '279', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'PSC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '9173', title: 'DION IS BLEH', issueDate:'2012-07-03', sectionCode: '288', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'NESC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '3990', title: 'DION IS BLEH', issueDate:'2010-11-12', sectionCode: '926', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '8128', title: 'DION SMELLS BAD', issueDate:'2015-02-10', sectionCode: '241', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'PSC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '4922', title: 'DION IS QUITE ROTUND', issueDate:'2011-10-31', sectionCode: '369', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '2787', title: 'DION SMELLS BAD', issueDate:'2015-10-05', sectionCode: '489', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EOP', documentNumber: '8630', title: 'DION IS BLEH', issueDate:'2014-08-05', sectionCode: '689', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '6403', title: 'DION IS QUITE ROTUND', issueDate:'2015-04-15', sectionCode: '564', hasDwg: false, citationNumber: 'WHOO-HOO', regulatedBy: 'PSC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '6955', title: 'DION SMELLS BAD', issueDate:'2016-12-17', sectionCode: '979', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'NESC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '6646', title: 'DION IS BLEH', issueDate:'2016-09-24', sectionCode: '963', hasDwg: false, citationNumber: 'WHAM-BAM', regulatedBy: 'PSC', description: 'HOLD ON TO THAT FEELING', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'B', documentNumber: '1936', title: 'DION IS QUITE ROTUND', issueDate:'2011-12-01', sectionCode: '578', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'PSC', description: 'DIOS MIO THE LEGENDS ARE TRUE', createdBy: 'CONED\\AHMEATJD', isActive: true },
          { type: 'EO', documentNumber: '1933', title: 'DION IS QUITE ROTUND', issueDate:'2011-01-16', sectionCode: '627', hasDwg: false, citationNumber: 'BOO-HOO', regulatedBy: 'NESC', description: 'DON\'T STOP BELIEVING', createdBy: 'CONED\\AHMEATJD', isActive: true }
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
