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
    
}