const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const faker = require('faker');


const writeToStream = (stream, writeables) => {
  const w = writeables;
  w.forEach((i) => {
    stream.write(i);
  });
};

const genServiceProviders = (today) => {
  const a = 0;
  
  var startDate = new Date(today.setDate(today.getDate() - _.random(1, 60)));
  var endDate = new Date(today.setDate(today.getDate() + _.random(1, 20)));
  return {
    _id: faker.random.uuid(),
    title: faker.lorem.words(),
    description: faker.lorem.sentences(),
    start_date: startDate,
    end_date: endDate,
    addressId: '3c0596f4-80ca-466b-a39c-1272a9ff7438',
    parentId: null,
    createdBy: faker.name.firstName(),
    created: Date.now,
    lastUpdated: '2019-04-28T12:17:07.021',
    

  };
};

const telecom = ['Airtel', 'Vodafone', 'Reliance Jio', 'BSNL'];
const genLocale = () => {
  const txnStream = fs.createWriteStream(path.join(__dirname, 'newServiceProviders.json'));
  if (!txnStream) console.log('Error creating stream');
  writeToStream(txnStream, ['[']);
  let ctr = 0;
  var today = new Date();
  _.times(100, (i) => {
    
    const event = genServiceProviders(today);
    if (ctr === 0) writeToStream(txnStream, [JSON.stringify(event, null, '\t')]);
    else writeToStream(txnStream, [', ', JSON.stringify(event, null, '\t')]);
    ctr += 1;
  })
//   _.map(finalList, (final) => {
//     console.log('<><>final', final);
//     const contactAcct = _.find(contactAccts, ['name', final]);
//     console.log('<><>final', contactAcct);
    
//     // const contactAcct = contactAccts[final];
//     const contact = _.find(contacts, ['_id', contactAcct.contact.id]);
//     const modLocale = genServiceProviders(contactAcct, contact);
    
//   });

  writeToStream(txnStream, [']']);
  txnStream.end();
};

// Generate
genLocale();