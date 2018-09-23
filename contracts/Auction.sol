pragma solidity ^0.4.24;

contract Auction{
    /* 
        moderator -> address of auctioneer
        m -> the no of items i.e if m = 4 items = [1,2,3,4]
        q -> the large prime no.
    
    */
    address public moderator;
    uint public m;
    uint public q;

    /*
        free_notaries -> no of notaries available for assigning to bidders.
        input_deadline -> The deadline for placing bids and registering as notary. 
    */
    uint private free_notaries;
    uint private input_deadline;
    /*
        Bidder -> The struct to store the address of bidder, the itemset and value provided by bidder.
        Notary -> The struct to store the address of each notary.
    */
    struct Bidder{
        address account_id;
        uint[] u;
        uint[] v;
        uint w1;
        uint w2;
    }
    struct Notary{
        address account_id;
    }
    /*
        bidder_of -> mapping of notary and and bidder assigned to notary:
            if  bidder_of(notary_address) = 0 i.e. no bidder assigned
            else    bidder_of(notary_address) = assigned_bidder_address
        valid_bidders -> mapping of bidders registered till now.
        valid_notaries -> mapping of notaries registered till now and also if notary is assigned to a bidder or not
            e.g valid_notaries(notary_add) = 1 i.e. notary is registered.
                valid_notaries(notary_add) = 2 i.e. notary has been assigned a bidder
    */
    mapping(address => address) private bidder_of;
    mapping(address => uint) private valid_bidders;
    mapping(address => uint) private valid_notaries;
    mapping(uint => uint) private items_sold;

    /*
        The arrays for storing registered bidders, notaries and the final winners of the auction
    */
    Bidder[] private bidders;
    Bidder[] public winners;
    Notary[] private notaries;
    Bidder temp;
    
    constructor (uint _items, uint _q, uint _deadline) public{
        input_deadline = now + _deadline;
        moderator = msg.sender;
        m = _items;
        q = _q;
        free_notaries = 0;
    }

    modifier before_deadline {
        require(now < input_deadline, "Deadline passed"); _;
    }
    modifier not_moderator(address user){
        require(msg.sender != moderator, "Moderator cannot register for auction"); _;
    }
    // The function to generate a random no in range [0,n)
    function random(uint n) private view returns (uint8) {
        return uint8(uint256(keccak256(block.timestamp, block.difficulty))%n);
    }
    // length getter functions for notary and bidder used in testing
    function getnotary() public view returns (uint){
        return notaries.length;
    }
    function getbidder() public view returns (uint){
        return bidders.length;
    }
    /*
        The function to assign a random notary among the free_notaries available
    */
    function assign_notary(Bidder x) private {
        uint8 ind = random(free_notaries);
        free_notaries -= 1;
        for(uint i=0;i<notaries.length;i++){
            if(valid_notaries[notaries[i].account_id]==1){
                if(ind == 0){
                    bidder_of[notaries[i].account_id] = x.account_id;
                    valid_notaries[notaries[i].account_id] = 2;
                }
                ind--;
            }
        }
    }
    // Testing function to test if bidder is assigned a notary
    function bidder_of_a(address x) public view returns (address a) {
        return bidder_of[x];
    }
    /*
        The function to register a valid distinct notary which is not an auctioneer and
        is registered before the input_deadline.
    */
    function register_notary() external before_deadline not_moderator(msg.sender) {
        require(valid_notaries[msg.sender] == 0, "Notary already registered");
        require(valid_bidders[msg.sender] == 0, "Bidder cannot be a notary");
        notaries.push(Notary({account_id: msg.sender}));
        valid_notaries[msg.sender] = 1;
        free_notaries += 1;
    }
    /*
        The function to register a bidder before input_deadline and with all the preconditions satisfied
        i.e. The input set contains valid and distinct items.
            A bidder cannot register multiple times.
            A bidder cannot be registered as a notary before.
    */
    function register_bidder(uint[] _u,uint[] _v,uint _w1, uint _w2) external before_deadline not_moderator(msg.sender) {
        require(_u.length == _v.length, "Wrong input set");
        require(_u.length <= m, "invalid size");
        require(valid_bidders[msg.sender]==0, "Bidder already registered");
        require(free_notaries > 0, "Notaries not available");
        require(valid_notaries[msg.sender] == 0, "Notary cannot be bidder");
        uint item;
        uint[] memory bid_items = new uint[](m);
        bool is_item;
        for(uint i=0;i<_u.length;i++){
            item = (_u[i] + _v[i])%q;
            require(item <= m && item > 0, "Input set does not contain a valid item");
            if(i>0){
                is_item = false;
                for(uint j=0;j<i;j++){
                    if(bid_items[j] == item){
                        is_item = true;
                        break;
                    }
                }
                require(is_item == false, "The set should contain distince elements");                
            }
            bid_items[i] = item;
        }
        assign_notary(Bidder({account_id: msg.sender, u: _u, v:_v, w1: _w1, w2: _w2}));
        bidders.push(Bidder({account_id: msg.sender, u: _u, v:_v, w1: _w1, w2: _w2}));
        valid_bidders[msg.sender] = 1;
    }

    // The helper function to compare values in quick sort
    function compare(uint x, uint y) internal view returns(bool){
        uint val1 = bidders[x].w1 - bidders[y].w1;
        uint val2 = bidders[x].w2 - bidders[y].w2;
        val1 = (val1+val2)%q;
        if(val1 < (q/2)){
            return true;    // x >= y
        }
        else
            return false;   // x < y
    }
    
    // The quick sort function to sort bidders
    function qsort(uint l, uint r) private{
        uint i = l;
        uint j = r;
        uint pivot = uint(l + (r - l) / 2);
        while(i <= j){
            while(compare(i, pivot) == false) i++;
            while(compare(pivot, j) == false) j--; 
            if(i <= j){
                temp = bidders[i];
                bidders[i] = bidders[j];
                bidders[j] = temp;
                i++;
                j--;
            }
        }
        if(i < r){
            qsort(i, r);
        }
        if(l < j){
            qsort(l, j);
        }
    }
}