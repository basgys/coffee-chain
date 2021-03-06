// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// import "./Set.sol";

// Define a contract 'Supplychain'
contract SupplyChain is Ownable, AccessControl {
    // Define a variable called 'upc' for Universal Product Code (UPC)
    uint256 upc;

    // Define a variable called 'sku' for Stock Keeping Unit (SKU)
    uint256 sku;

    // Define a public mapping 'items' that maps the UPC to an Item.
    mapping(uint256 => Item) items;

    // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash,
    // that track its journey through the supply chain -- to be sent from DApp.
    mapping(uint256 => string[]) itemsHistory;

    // Registered farms
    // For now we assume each farm has a single address
    // TODO: Use a set to iterate over farms
    mapping(address => Farm) farms;

    // Roles
    bytes32 public constant ROLE_FARMER = keccak256("ROLE_FARMER");
    bytes32 public constant ROLE_DISTRIBUTOR = keccak256("ROLE_DISTRIBUTOR");
    bytes32 public constant ROLE_RETAILER = keccak256("ROLE_RETAILER");

    // Define enum 'State' with the following values:
    enum State {
        Unknown, // 0
        Harvested, // 1
        Processed, // 2
        Packed, // 3
        ForSale, // 4
        Sold, // 5
        Shipped, // 6
        Received, // 7
        Purchased // 8
    }

    State constant defaultState = State.Harvested;

    // Define a struct 'Item' with the following fields:
    struct Item {
        uint256 sku; // Stock Keeping Unit (SKU)
        uint256 upc; // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
        address ownerID; // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        address payable originFarmerID; // Metamask-Ethereum address of the Farmer
        string originFarmName; // Farmer Name
        string originFarmInformation; // Farmer Information
        string originFarmLatitude; // Farm Latitude
        string originFarmLongitude; // Farm Longitude
        string productID; // Product ID potentially a combination of upc + sku
        string productNotes; // Product Notes
        uint256 productPrice; // Product Price
        State itemState; // Product State as represented in the enum above
        address payable distributorID; // Metamask-Ethereum address of the Distributor
        address payable retailerID; // Metamask-Ethereum address of the Retailer
        address payable consumerID; // Metamask-Ethereum address of the Consumer
    }

    struct Farm {
        address payable id;
        string name;
        string information;
        string latitude;
        string longitude;
    }

    // Define 8 events with the same 8 state values and accept 'upc' as input argument
    event Harvested(uint256 upc);
    event Processed(uint256 upc);
    event Packed(uint256 upc);
    event ForSale(uint256 upc);
    event Sold(uint256 upc);
    event Shipped(uint256 upc);
    event Received(uint256 upc);
    event Purchased(uint256 upc);

    // Define a modifer that verifies the Caller
    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }

    // Define a modifer that verifies the caller role
    modifier verifyRole(bytes32 role) {
        string memory info = "Sender does not have the appropriate role to perform that action";
        if (role == ROLE_FARMER) {
            info = "Sender needs to be a farmer";
        } else if (role == ROLE_DISTRIBUTOR) {
            info = "Sender needs to be a distributor";
        } else if (role == ROLE_RETAILER) {
            info = "Sender needs to be a retailer";
        }
        require(hasRole(role, msg.sender), info);
        _;
    }

    // Define a modifier that checks if the paid amount is sufficient to cover the price
    modifier paidEnough(uint256 _price) {
        require(msg.value >= _price);
        _;
    }

    // Define a modifier that checks the price and refunds the remaining balance
    modifier checkValue(uint256 _upc) {
        _;
        uint256 _price = items[_upc].productPrice;
        uint256 amountToReturn = msg.value - _price;
        items[_upc].consumerID.transfer(amountToReturn);
    }

    // Define a modifier that checks if an item.state of a upc is Harvested
    modifier harvested(uint256 _upc) {
        require(items[_upc].itemState == State.Harvested);
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Processed
    modifier processed(uint256 _upc) {
        require(items[_upc].itemState == State.Processed);
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Packed
    modifier packed(uint256 _upc) {
        require(items[_upc].itemState == State.Packed);
        _;
    }

    // Define a modifier that checks if an item.state of a upc is ForSale
    modifier forSale(uint256 _upc) {
        require(items[_upc].itemState == State.ForSale);
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Sold
    modifier sold(uint256 _upc) {
        require(items[_upc].itemState == State.Sold);
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Shipped
    modifier shipped(uint256 _upc) {
        require(items[_upc].itemState == State.Shipped);
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Received
    modifier received(uint256 _upc) {
        require(items[_upc].itemState == State.Received);
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Purchased
    modifier purchased(uint256 _upc) {
        require(items[_upc].itemState == State.Purchased);
        _;
    }

    // In the constructor set 'owner' to the address that instantiated the contract
    // and set 'sku' to 1
    // and set 'upc' to 1
    constructor() public payable {
        sku = 1;
        upc = 1;

        // Make owner an admin. An admin can manage ACLs.
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Define a function 'kill' if required
    function kill() public onlyOwner {
        selfdestruct(msg.sender);
    }

    // roles returns the roles for address `addr`
    function roles(address addr)
        public
        view
        returns (bool admin, bool farmer, bool distributor, bool retailer)
    {
        admin = hasRole(DEFAULT_ADMIN_ROLE, addr);
        farmer = hasRole(ROLE_FARMER, addr);
        distributor = hasRole(ROLE_DISTRIBUTOR, addr);
        retailer = hasRole(ROLE_RETAILER, addr);
    }

    function registerFarm(
        address payable id,
        string memory name,
        string memory information,
        string memory latitude,
        string memory longitude
    )
        public
        verifyRole(DEFAULT_ADMIN_ROLE)
    {
        require(farms[id].id == address(0), "farm has already been registered");

        // Grant farmer role
        grantRole(ROLE_FARMER, id);

        // Register farm
        farms[id].id = id;
        farms[id].name = name;
        farms[id].information = information;
        farms[id].latitude = latitude;
        farms[id].longitude = longitude;
    }

    function registerDistributor(
        address payable id
    )
        public
        verifyRole(DEFAULT_ADMIN_ROLE)
    {

        // Grant role
        grantRole(ROLE_DISTRIBUTOR, id);
    }

    function registerRetailer(
        address payable id
    )
        public
        verifyRole(DEFAULT_ADMIN_ROLE)
    {

        // Grant role
        grantRole(ROLE_RETAILER, id);
    }

    // Define a function 'harvestItem' that allows a farmer to mark an item 'Harvested'
    function harvestItem(
        uint256 _upc,
        string memory _productNotes
    )
        public
        verifyRole(ROLE_FARMER)
    {
        require(items[_upc].itemState == State.Unknown, "upc already registered");
        require(farms[msg.sender].id != address(0), "farmer must have its farm registered first");
        Farm memory farm = farms[msg.sender];

        string memory skuStr = uintToStr(sku);
        string memory upcStr = uintToStr(_upc);
        string memory productID = string(abi.encodePacked(skuStr, ":", upcStr));

        // Add the new item as part of Harvest
        items[_upc].itemState = State.Harvested;
        items[_upc].sku = sku;
        items[_upc].upc = _upc;
        items[_upc].productID = productID;
        items[_upc].ownerID = msg.sender;
        items[_upc].originFarmerID = farm.id;
        items[_upc].originFarmName = farm.name;
        items[_upc].originFarmInformation = farm.information;
        items[_upc].originFarmLatitude = farm.latitude;
        items[_upc].originFarmLongitude = farm.longitude;
        items[_upc].productNotes = _productNotes;

        // Increment sku
        sku = sku + 1;

        // Emit the appropriate event
        emit Harvested(_upc);
    }

    // Define a function 'processtItem' that allows a farmer to mark an item 'Processed'
    function processItem(uint256 _upc)
        public
        harvested(_upc)
        verifyCaller(items[_upc].originFarmerID)
    {
        // Update the appropriate fields
        items[_upc].itemState = State.Processed;
        // Emit the appropriate event
        emit Processed(_upc);
    }

    // Define a function 'packItem' that allows a farmer to mark an item 'Packed'
    function packItem(uint256 _upc)
        public
        processed(_upc)
        verifyCaller(items[_upc].originFarmerID)
    {
        // Update the appropriate fields
        items[_upc].itemState = State.Packed;
        // Emit the appropriate event
        emit Packed(_upc);
    }

    // Define a function 'sellItem' that allows a farmer to mark an item 'ForSale'
    function sellItem(uint256 _upc, uint256 _price)
        public
        packed(_upc)
        verifyCaller(items[_upc].originFarmerID)
    {
        // Update the appropriate fields
        items[_upc].itemState = State.ForSale;
        items[_upc].productPrice = _price;
        // Emit the appropriate event
        emit ForSale(_upc);
    }

    // Define a function 'buyItem' that allows the disributor to mark an item 'Sold'
    // Use the above defined modifiers to check if the item is available for sale, if the buyer has paid enough,
    // and any excess ether sent is refunded back to the buyer
    function buyItem(uint256 _upc)
        public
        payable
        verifyRole(ROLE_DISTRIBUTOR)
        forSale(_upc)
        paidEnough(items[_upc].productPrice)
        checkValue(_upc)
    {
        // Update the appropriate fields - ownerID, distributorID, itemState
        items[_upc].itemState = State.Sold;
        items[_upc].ownerID = msg.sender;
        items[_upc].distributorID = msg.sender;
        // Transfer money to farmer
        uint256 price = items[_upc].productPrice;
        items[_upc].originFarmerID.transfer(price);
        // emit the appropriate event
        emit Sold(_upc);
    }

    // Define a function 'shipItem' that allows the distributor to mark an item 'Shipped'
    // Use the above modifers to check if the item is sold
    function shipItem(uint256 _upc)
        public
        // Call modifier to check if upc has passed previous supply chain stage
        sold(_upc)
        // Call modifier to verify caller of this function
        verifyCaller(items[_upc].distributorID)
    {
        // Update the appropriate fields
        items[_upc].itemState = State.Shipped;
        // Emit the appropriate event
        emit Shipped(_upc);
    }

    // Define a function 'receiveItem' that allows the retailer to mark an item 'Received'
    // Use the above modifiers to check if the item is shipped
    function receiveItem(uint256 _upc)
        public
        payable
        // Call modifier to check if upc has passed previous supply chain stage
        shipped(_upc)
        // Access Control List enforced by calling Smart Contract / DApp
        verifyRole(ROLE_RETAILER)
        paidEnough(items[_upc].productPrice)
        checkValue(_upc)
    {
        // Update the appropriate fields - ownerID, retailerID, itemState
        items[_upc].itemState = State.Received;
        items[_upc].ownerID = msg.sender;
        items[_upc].retailerID = msg.sender;
        // Transfer money to distributor
        uint256 price = items[_upc].productPrice;
        items[_upc].distributorID.transfer(price);
        // Emit the appropriate event
        emit Received(_upc);
    }

    // Define a function 'purchaseItem' that allows the consumer to mark an item 'Purchased'
    // Use the above modifiers to check if the item is received
    function purchaseItem(uint256 _upc)
        public
        payable
        // Call modifier to check if upc has passed previous supply chain stage
        received(_upc)
        // Access Control List enforced by calling Smart Contract / DApp
        paidEnough(items[_upc].productPrice)
        checkValue(_upc)
    {
        // Update the appropriate fields - ownerID, consumerID, itemState
        items[_upc].itemState = State.Purchased;
        items[_upc].ownerID = msg.sender;
        items[_upc].consumerID = msg.sender;
        // Transfer money to retailer
        uint256 price = items[_upc].productPrice;
        items[_upc].retailerID.transfer(price);
        // Emit the appropriate event
        emit Purchased(_upc);
    }

    // Define a function 'fetchItemBufferOne' that fetches the data
    function fetchItemBufferOne(uint256 _upc)
        public
        view
        returns (
            uint256 itemSKU,
            uint256 itemUPC,
            address ownerID,
            address originFarmerID,
            string memory originFarmName,
            string memory originFarmInformation,
            string memory originFarmLatitude,
            string memory originFarmLongitude
        )
    {
        Item storage item = items[_upc];
        originFarmName = item.originFarmName;
        originFarmInformation = item.originFarmInformation;
        originFarmLatitude = item.originFarmLatitude;
        originFarmLongitude = item.originFarmLongitude;
        return (
            item.sku,
            item.upc,
            item.ownerID,
            item.originFarmerID,
            originFarmName,
            originFarmInformation,
            originFarmLatitude,
            originFarmLongitude
        );
    }

    // Define a function 'fetchItemBufferTwo' that fetches the data
    function fetchItemBufferTwo(uint256 _upc)
        public
        view
        returns (
            uint256 itemSKU,
            uint256 itemUPC,
            string memory productID,
            string memory productNotes,
            uint256 productPrice,
            uint256 itemState,
            address distributorID,
            address retailerID,
            address consumerID
        )
    {
        Item storage item = items[_upc];
        productNotes = item.productNotes;
        return (
            item.sku,
            item.upc,
            item.productID,
            productNotes,
            item.productPrice,
            uint256(item.itemState),
            item.distributorID,
            item.retailerID,
            item.consumerID
        );
    }

    /// @notice converts number to string
    /// @dev source: https://github.com/provable-things/ethereum-api/blob/master/oraclizeAPI_0.5.sol#L1045
    /// @param _i integer to convert
    /// @return _uintAsString
    function uintToStr(uint _i) internal pure returns (string memory _uintAsString) {
        uint number = _i;
        if (number == 0) {
            return "0";
        }
        uint j = number;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (number != 0) {
            bstr[k--] = byte(uint8(48 + number % 10));
            number /= 10;
        }
        return string(bstr);
    }
}
