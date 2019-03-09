import EVMThrow from './helpers/EVMThrow';
import revert from './helpers/revert';

import latestTime from './helpers/latestTime';
import { increaseTimeTo, duration } from './helpers/increaseTime';

const BracketCore = artifacts.require("BracketCore");

const should = require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('BracketCore', function(accounts) {

  describe('Constructor', () => {
    let BracketCoreInstance;

    before(async () => {
      BracketCoreInstance = await BracketCore.new();
    });

    it('ERC721 parameters should be correctly set', async () => {
      let name = await BracketCoreInstance.name();
      let symbol = await BracketCoreInstance.symbol();
      assert.equal(name, "March Madness Bracket");
      assert.equal(symbol, "MMBK");
    });

  });

  describe('Minting & predictions', () => {
    let BracketCoreInstance;

    before(async () => {
      BracketCoreInstance = await BracketCore.new();
    });

    it('Should be able to mint a token id #0 with no predictions', async () => {
      let predictionsArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      await BracketCoreInstance.mint(accounts[0], predictionsArray);
      let owner = await BracketCoreInstance.ownerOf(0);
      assert.equal(owner, accounts[0]);
    });

    it('Should be able to change predictions before tournament starts', async () => {
      let predictionsArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      await BracketCoreInstance.changePredictions(0, predictionsArray);
      let predictions = await BracketCoreInstance.getPredictions(0);
      assert.equal(predictions[0].toNumber(), predictionsArray[0]);
    });

  });

});
