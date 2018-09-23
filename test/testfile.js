const auction = artifacts.require('./Auction.sol')
const assert = require('assert')

let contractInstance

  contract('auction',  (accounts) => {
    beforeEach(async () => {
      contractInstance = await auction.deployed()
    })

    // it('Check if notary not registered on moderator', async() => {

    // })
   
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
        await contractInstance.register_bidder([19,19],[1,2], 5, 15, {from: accounts[z+1]})
        var newcnt = await contractInstance.getbidder()
        assert.equal(prevcnt.c[0] + 1, newcnt.c[0], 'Bidder is not registered')
        })
    }
    // it('Check if notary not registered on moderator', async() => {     
    //   var prevcnt = await contractInstance.getnotary()
    //   console.log(prevcnt);
    //   var event=contractInstance.register_notary({from: accounts[0]})
    //   console.log(event);
    //   var newcnt =contractInstance.getnotary()


    // })
   

   // it('Check if bidder is getting registered', async() => {     
   //  var prevcnt = await contractInstance.getbidder()
   //  console.log(prevcnt)
   //  await contractInstance.register_bidder([2,3],[18,18], 5, 15, {from: p[z+1]})
   //  var newcnt = await contractInstance.getbidder()
   //  console.log(newcnt)      
   //  assert.equal(prevcnt.c[0] + 1, newcnt.c[0], 'Bidder is not registered')
   //  })   

})