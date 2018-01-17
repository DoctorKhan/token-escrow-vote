pragma solidity ^0.4.15;
/* 1. should release funds to company when yes vote complete
   2. should retain funds when no vote
   3. should refund if 
      a. tokens passed and b. no vote and c. company agrees.
 */
import "../../MiniPre/contracts/ERC20.sol";

contract Escrow {
  uint public numVotes; //this can be a functions.. yesVotes+noVotes
  //  uint public yesVotes;
  //  uint public noVotes;
  uint public roundNum;
  uint public numRounds;
  address public company;
  uint public baseExchange;

  struct Fraction {
    uint num;
    uint denom;
  }

  // threshold approval
  uint public threshNum;
  uint public threshDen;
  uint public minVotes;
  ERC20 public tokenContract;
  
  // allow revoting?
  mapping (uint => mapping (address => bool)) public hasVoted; // round -> user -> hasVoted
  mapping (uint => uint) public funds2beReleased;              // round -> amount-sent-to-company
  mapping (uint => bool) public roundOpen;                     // round -> closed/open
  mapping (uint => uint) public endTime;                       // round -> vote-end-time
  mapping (uint => uint) public startTime;                     // round -> vote-start-time
  mapping (uint => uint) public yesVotes;                      // round -> yes-votes
  mapping (uint => uint) public noVotes;                       // round -> no-votes  
  mapping (address => uint) public voteWeight;                 // user  -> vote-weight

  event VotingResult(bool indexed releasedFunds);

  function Escrow(uint _numRounds, address _controller, address _token) {
    tokenContract = ERC20(_token);
    numRounds = _numRounds;
  }

  // should we include self destruct after usefulness of escrow has expired?

  // fix this
  function sqrt(uint a) returns (uint) { return 1; }

  // consider a minimum voting power fn = sqrt(userToken) / SIGMA_u sqrt(u)
  // could be really useful. would have to be calculate offchain
  function minVotingPower(address user) public constant returns (string) {
    // return alloc[user] / maxVoteCount;
    return "1.421%";
  }

  // consider privledges
  function startVoteRound() public {
    require(now >= startTime[roundNum + 1] && now <= endTime[roundNum + 1]); // make sure in voting window
    roundNum = roundNum + 1;
  }

  function allocVotes() public {
    uint tokenNum = tokenContract.balanceOf(msg.sender);
    voteWeight[msg.sender] = sqrt(tokenNum); 
  }
  
  // voting based on balances at certain point in BC? e.g. minime token? consider people not using it
  function singleVote(bool votedYes) public {
    // Error check
    require(hasVoted[roundNum][msg.sender] == false);
    require(now >= startTime[roundNum] && now <= endTime[roundNum]); // make sure in voting window

    // State changes
    if (votedYes) {
      yesVotes[roundNum] = yesVotes[roundNum] + voteWeight[msg.sender];
    }
    else {
      noVotes[roundNum] = noVotes[roundNum] + voteWeight[msg.sender];
    }
    numVotes++;
    hasVoted[roundNum][msg.sender] = true;
   }

  // ======
  // ADMIN:
  // ======


  // ========
  // COMPANY:
  // ========
  
  //
  // function () isController {  }

  // open voting round
  function openVote(uint round) public {
    // need time window here. if we help out ico's, then probably good to remodify this if they want
  }

  // close voting round
  function closeVote() public {
    //    if (thresholdReached()) releaseFunds();
    //    else failRound(roundNum);
  }

  // big thing here, make sure this fn is safe if roundNum changes, or don't let roundNum change
  function thresholdReached() public constant returns (bool) {
    // this should be related to noVotes too. Or, what if voting is only 10% turnout? this is valid, but might be rejected b/c didn't reach threshold
    return numVotes > minVotes
        && (yesVotes[roundNum] * threshDen) > threshNum;
  }

  // keep track of failures
  function failRound() public {
    // failures[roundNum]++;
  }

  // releases funds to company
  function releaseFunds() internal {
    require(company.send(funds2beReleased[roundNum]));
    // require so it doesn't eat gas
  }

  // =====
  // USER:
  // =====  
  // note. consider where tokens go. if tokens go to company, then they can cheat system. if tokens go to this contract, then they are stuck here unless we send them back to company

  function getExchangeRate() returns (uint){
    // minimi previous balance, oracle token discount, etc
    // minime balanceOfAt(msg.sender,  _blockNumber)
    // baseExchange hardcoded
    // tokeRatio should be between 0 and 2
    uint tokenRatio = 1;
    
    return baseExchange * tokenRatio;
  }

  event RefundAmount(address indexed user, uint refundAmount);

  // Require approval of entire balanceOf?
  function refund() public {
    // add this    require(inRefundState);
    
    // Get tokens, then refund remaining ether
    
    uint tokenCount = tokenContract.balanceOf(msg.sender);
    uint refundAmount = tokenCount * getExchangeRate();
    // uint refundAmount = tokenCount * currentExchangeRate;  // Num and denom style is probably better. Probably need be careful in what gets divided and multiplied first.. e.g. (1/4)*8 vs (1*8)/4
    require(tokenContract.transferFrom(msg.sender, this, tokenCount));  // make sure params are right
    msg.sender.send(refundAmount);
    RefundAmount(msg.sender, refundAmount);
  }

  // =====
  // MISC:
  // =====
  modifier isCompany() {
    require(msg.sender == company);
    _;
  }

  modifier isAdmin() {  // should this be a controlled contract? isController might be same
    require(msg.sender == company);
    _;
  }

  // Use these times for testing
  
  function getBlockTime()   internal constant returns  (uint) { return block.timestamp; }
  function getBlockNumber() internal constant returns (uint) { return block.number;    }
}
