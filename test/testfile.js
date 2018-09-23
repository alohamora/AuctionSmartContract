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
    var arr = [0,0,0,0,0,7,6,5,4];
    // for(i = 5; i < 9; i+=1){
      // const z =  i;
      it('Check if bidder is getting registered', async() => {     
        var prevcnt = await contractInstance.getbidder()
        await contractInstance.register_bidder([19,19],[1,2], 30, 11, {from: accounts[5]})
        var newcnt = await contractInstance.getbidder()
        assert.equal(prevcnt.c[0] + 1, newcnt.c[0], 'Bidder is not registered')
        })
      it('Check if bidder is getting registered', async() => {     
        var prevcnt = await contractInstance.getbidder()
        await contractInstance.register_bidder([19,19],[1,2], 30, 9, {from: accounts[6]})
        var newcnt = await contractInstance.getbidder()
        assert.equal(prevcnt.c[0] + 1, newcnt.c[0], 'Bidder is not registered')
        })
      it('Check if bidder is getting registered', async() => {     
        var prevcnt = await contractInstance.getbidder()
        await contractInstance.register_bidder([19,19],[4,3], 30, 10, {from: accounts[7]})
        var newcnt = await contractInstance.getbidder()
        assert.equal(prevcnt.c[0] + 1, newcnt.c[0], 'Bidder is not registered')
        })
      it('Check if bidder is getting registered', async() => {     
        var prevcnt = await contractInstance.getbidder()
        await contractInstance.register_bidder([19,19],[1,2], 30, 12, {from: accounts[8]})
        var newcnt = await contractInstance.getbidder()
        assert.equal(prevcnt.c[0] + 1, newcnt.c[0], 'Bidder is not registered')
        })
    // }

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

    it('Only moderator can call winner', async() => {
      try{
        await contractInstance.declare_winners({from: accounts[0]});
        // console.log(temp);
        console.log("Emitted");     
      }
      catch(err){
        console.log(err);
      }
    })

    it('Declare winner', async() => {
      // var result=contractInstance.declare_winners({from: accounts[0]});
    //  var arr= new Array();
    //  for(i=0;i<4;i++){
      var temp=await contractInstance.get_winner_w1();
      console.log(temp);
      assert.equal(temp.c[0] , 12, 'Bidder is not registered')
      
    //  }
    })
})