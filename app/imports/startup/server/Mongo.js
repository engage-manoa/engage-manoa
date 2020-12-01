import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Contacts } from '../../api/contact/Contacts';
import { Clubs } from '../../api/club/Clubs';
/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}
function addContacts(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Contacts.collection.insert(data);
}
function addClubs(data) {
  console.log(`  Adding: ${data.clubName} (${data.Admin})`);
  Clubs.collection.insert(data);
}

function csvJSON(csv) {
  const lines = csv.split('\n');
  const ans = {
    Clubs: [],
  };

  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length - 1; i++) {

    const obj = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    ans.Clubs.push(obj);
  }
  return ans; // JSON
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contacts');
    Meteor.settings.defaultContacts.map(data => addContacts(data));
  }
}
if (Clubs.collection.find().count() === 0) {
  if (Meteor.settings.defaultClubs) {
    console.log('Creating default clubs');
    Meteor.settings.defaultClubs.map(data => addClubs(data));
  }
}

if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName2 = 'data.json';
  console.log(`Loading data from private/${assetsFileName2}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName2));
  console.log(jsonData);
  jsonData.Clubs.map(club => addClubs(club));
}
if (Meteor.settings.loadCSV) {
  const assetsFileName = 'rio.csv';
  console.log(`Loading data from private/${assetsFileName}`);
  const csv = Assets.getText(assetsFileName);
  const ans = csvJSON(csv);
  ans.Clubs.map(club => addClubs(club));
}
