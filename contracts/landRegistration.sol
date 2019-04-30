pragma solidity >=0.4.0 <0.6.0;

//Land Details
contract landRegistration{
    struct landDetails{
        string state;
        string district;
        string village;
        uint256 surveyNumber;
        address payable CurrentOwner;
        uint marketValue;
        bool isAvailable;
        address requester;
        reqStatus requestStatus;

    }
    

    //request status
    enum reqStatus {Default,pending,reject,approved}



    //profile of a client
    struct profiles{
        uint[] assetList;   
        }

 
    mapping(uint => landDetails) land;
    address owner;
    mapping(string => address) superAdmin;
    mapping(address => profiles) profile;
    
    //contract owner
    constructor() public{
        owner = msg.sender;
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    //adding village admins
    function addSuperAdmin(address _superAdmin,string memory _village ) onlyOwner public {
        superAdmin[_village]=_superAdmin;
    }
    //Registration of land details.
    function Registration(string memory _state,string memory _district,
        string memory _village,uint256 _surveyNumber,
        address payable _OwnerAddress,uint _marketValue,uint id
        ) public returns(bool) {
        require(superAdmin[_village] == msg.sender || owner == msg.sender);
        land[id].state = _state;
        land[id].district = _district;
        land[id].village = _village;
        land[id].surveyNumber = _surveyNumber;
        land[id].CurrentOwner = _OwnerAddress;
        land[id].marketValue = _marketValue;
        profile[_OwnerAddress].assetList.push(id);
        return true;
    }
    //to view details of land for the owner
    function landInfoOwner(uint id) public view returns(string memory,string memory,string memory,uint256,bool,address,reqStatus){
        return(land[id].state,land[id].district,land[id].village,land[id].surveyNumber,land[id].isAvailable,land[id].requester,land[id].requestStatus);
    }
        //to view details of land for the buyer
        function landInfoUser(uint id) public view returns(address,uint,bool,address,reqStatus){
        return(land[id].CurrentOwner,land[id].marketValue,land[id].isAvailable,land[id].requester,land[id].requestStatus);
    }

    // to compute id for a land.
    function computeId(string memory _state,string memory _district,string memory _village,uint _surveyNumber) public view returns(uint){
        return uint(keccak256(abi.encodePacked(_state,_district,_village,_surveyNumber)))%10000000000000;
    }

    //push a request to the land owner
    function requstToLandOwner(uint id) public {
        require(land[id].isAvailable);
        land[id].requester=msg.sender;
        land[id].isAvailable=false;
        land[id].requestStatus = reqStatus.pending; //changes the status to pending.
    }
    //will show assets of the function caller 
    function viewAssets()public view returns(uint[] memory){
        return (profile[msg.sender].assetList);
    }
    //viewing request for the lands
    function viewRequest(uint property)public view returns(address){
        return(land[property].requester);
    }
    //processing request for the land by accepting or rejecting
    function processRequest(uint property,reqStatus status)public {
        require(land[property].CurrentOwner == msg.sender);
        land[property].requestStatus=status;
        if(status == reqStatus.reject){
            land[property].requester = address(0);
            land[property].requestStatus = reqStatus.Default;
        }
    }
    //availing land for sale.
    function makeAvailable(uint property)public{
        require(land[property].CurrentOwner == msg.sender);
        land[property].isAvailable=true;
    } 
    //buying the approved property
    function buyProperty(uint property)public payable{
        require(land[property].requestStatus == reqStatus.approved);
        require(msg.value >= (land[property].marketValue+((land[property].marketValue)/10)));
        land[property].CurrentOwner.transfer(land[property].marketValue);
        removeOwnership(land[property].CurrentOwner,property);
        land[property].CurrentOwner=msg.sender;
        land[property].isAvailable=false;
        land[property].requester = address(0);
        land[property].requestStatus = reqStatus.Default;
        profile[msg.sender].assetList.push(property); //adds the property to the asset list of the new owner.
        
    }
    //removing the ownership of seller for the land. and it is called by the buyProperty function
    function removeOwnership(address previousOwner,uint id)private{
        uint index = findId(id,previousOwner);
        profile[previousOwner].assetList[index]=profile[previousOwner].assetList[profile[previousOwner].assetList.length-1];
        delete profile[previousOwner].assetList[profile[previousOwner].assetList.length-1];
        profile[previousOwner].assetList.length--;
    }
    //for finding the index of a perticular id
    function findId(uint id,address user)public view returns(uint){
        uint i;
        for(i=0;i<profile[user].assetList.length;i++){
            if(profile[user].assetList[i] == id)
                return i;
        }
        return i;
    }
}