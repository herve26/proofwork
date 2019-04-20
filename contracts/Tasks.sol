pragma solidity ^0.5.0;

contract Tasks {
    enum Status {Pending, Completed, Failed }
    
    struct Task {
        string desc;
        Status status;
        uint timelimit;
        uint amount;
        uint timestart;
        address payable charity;
    }

    struct Pledger {
        uint taskCount;
        mapping(uint => Task) taskList;
    }

    struct Charity {
        string name;
        address payable charity;
    }

    mapping (address => Pledger) public Pledgers;
    string public tasks;
    address payable owner;
    address[] users;
    mapping (address => bool ) charities;
    Charity[] public Charities;
    
    constructor () public {
        owner = msg.sender;
    }
    
    function addTask(string memory desc, uint end_time, uint start_time, address payable charity) public payable {
        // TODO: Add check for the value of address (it must exist in the charities mapping)
        // TODO: check the end_time and the start_time
        if(Pledgers[msg.sender].taskCount == 0){
            users.push(msg.sender);
        }
        Pledgers[msg.sender].taskList[Pledgers[msg.sender].taskCount] = Task(desc, Status.Pending, end_time, msg.value, start_time, charity);
        Pledgers[msg.sender].taskCount++;
    }

    function showTask(uint32 taskid) public view returns (uint, uint, string memory, uint, Tasks.Status) {
        require(Pledgers[msg.sender].taskList[taskid].timelimit > 0);

        return (
            Pledgers[msg.sender].taskList[taskid].timelimit,
            Pledgers[msg.sender].taskList[taskid].timestart,
            Pledgers[msg.sender].taskList[taskid].desc,
            Pledgers[msg.sender].taskList[taskid].amount,
            Pledgers[msg.sender].taskList[taskid].status
        );
    }

    // change the task status to completed
    // Send the user the amount they put in as pledge minus 1%
    function completeTask(uint taskid, uint timelimit) public {
        require(Pledgers[msg.sender].taskList[taskid].status != Status.Completed);
        require(Pledgers[msg.sender].taskList[taskid].timelimit > timelimit);

        Pledgers[msg.sender].taskList[taskid].status = Status.Completed;
        uint back_amount = Pledgers[msg.sender].taskList[taskid].amount - Pledgers[msg.sender].taskList[taskid].amount / 100;
        msg.sender.transfer(back_amount);
        owner.transfer(Pledgers[msg.sender].taskList[taskid].amount - back_amount);
    }

    function getUsersLength() public view restricted returns (uint) {
        return users.length;
    }

    function getUserTasksLength(uint userid) public view restricted returns (uint) {
        return Pledgers[users[userid]].taskCount;
    }

    function isTaskStateFailed(uint userid, uint taskid, uint time_now) public view restricted returns (bool) {
        if(Pledgers[users[userid]].taskList[taskid].timelimit < time_now && Pledgers[users[userid]].taskList[taskid].status == Status.Pending) {
            return true;
        }
        return false;
    }

    function payCharities(uint[] memory userids, uint[] memory taskids) public restricted {
        require(userids.length < 150);
        for(uint i=0; i< userids.length; i++){
            if(Pledgers[users[userids[i]]].taskList[taskids[i]].status != Status.Pending){
                continue;
            }
            Pledgers[users[userids[i]]].taskList[taskids[i]].status = Status.Failed;
            Pledgers[users[userids[i]]].taskList[taskids[i]].charity.transfer(Pledgers[users[userids[i]]].taskList[taskids[i]].amount);
        }
    }

    // add a new charity to the list of charity
    function addCharity(string memory name, address payable charity) public restricted {
        require(!charities[charity]);
        charities[charity] = true;
        Charities.push(Charity(name, charity));
    }

    function getCharitiesLength() public view returns (uint) {
        return Charities.length;
    }

    function getCharity(uint index) public view returns (address, string memory) {
        require(index < Charities.length);
        return (Charities[index].charity, Charities[index].name); 
    }

    // Get the address of the owner
    function getOwner() restricted public view returns (address) {
        return owner;
    }

    modifier restricted {
        require(msg.sender == owner);
        _;
    }

}