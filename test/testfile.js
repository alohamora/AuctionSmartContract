const auction = artifacts.require('./Auction.sol')
const assert = require('assert')

let contractInstance

  contract('auction',  (accounts) => {
    beforeEach(async () => {
      contractInstance = await auction.deployed()
    })
    for(i = 1; i < 5; i+=1) {
      const z =  i;
      it('Check if notary is getting registered', async() => {     
        var prevcnt = await contractInstance.getnotary()
        await contractInstance.register_notary({from: accounts[z]})
        var newcnt = await contractInstance.getnotary()
        assert.equal(prevcnt.c[0] + 1, newcnt.c[0], 'Notary is not registered')
      })
    }

    for(i = 5; i < 9; i+=1){
      const z =  i;
      it('Check if bidder is getting registered', async() => {     
        var prevcnt = await contractInstance.getbidder()
        await contractInstance.register_bidder([19,19],[1,2], 5, 15, {from: accounts[z]})
        var newcnt = await contractInstance.getbidder()
        assert.equal(prevcnt.c[0] + 1, newcnt.c[0], 'Bidder is not registered')
        })
    }

    it('Check if notary not registered on moderator', async() => {     
      var prevcnt = await contractInstance.getnotary()
      try {
        await contractInstance.register_notary({from: accounts[0]});
      }
      catch(err){
      }
      var newcnt = await contractInstance.getnotary()
      assert.equal(prevcnt.c[0] , newcnt.c[0], 'Bidder is not registered')
    })

    it('Check if bidder not registered on moderator', async() => {     
      var prevcnt = await contractInstance.getbidder()
      try {
        await contractInstance.register_bidder({from: accounts[0]});
      }
      catch(err){
      }
      var newcnt = await contractInstance.getbidder()
      assert.equal(prevcnt.c[0] , newcnt.c[0], 'Bidder is not registered')
    })

    it('Check if bidder not registered on notary', async() => {     
      var prevcnt = await contractInstance.getbidder()
      try {
        await contractInstance.register_bidder({from: accounts[2]});
      }
      catch(err){
      }
      var newcnt = await contractInstance.getbidder()
      assert.equal(prevcnt.c[0] , newcnt.c[0], 'Bidder is not registered')
    })

    it('Check if notary not registered on bidder', async() => {     
      var prevcnt = await contractInstance.getnotary()
      try {
        await contractInstance.register_notary({from: accounts[5]});
      }
      catch(err){
      }
      var newcnt = await contractInstance.getnotary()
      assert.equal(prevcnt.c[0] , newcnt.c[0], 'Bidder is not registered')
    })
})