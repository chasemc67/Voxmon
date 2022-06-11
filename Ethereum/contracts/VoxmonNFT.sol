//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract VoxmonNFT is ERC721URIStorage, AccessControl, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokensMinted;
      
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN");
    uint16 private maxTotal = 10000;
    uint private MINT_COST = 100000000000000000;
    string public __baseURI = "";
    address adminAddress;
   
    constructor(address payable addr) ERC721("VoxmonNFT", "NFT") {
      _setupRole(ADMIN_ROLE, addr);
      adminAddress = addr;
    }
    
    mapping (uint256 => address) internal tokenIdToOwner;
    mapping (uint256 => string) private _tokenURIs;

    mapping (address => uint256) pendingWithdrawals;
  
    function _isOwner(address sender, uint256 tokenId) 
    internal view
    returns (bool) {
        return ownerOf(tokenId) == sender;
    }

    function _updateBaseURI(string calldata uri) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "unauthorized: cannot update base URI");
        __baseURI = uri;
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return __baseURI;
    }

    function getTotalMinted() external view returns (uint256) {
        return _tokensMinted.current();
    }

    function cost() external view returns (uint) {
        return MINT_COST;
    }

    function totalSupply() public view returns (uint256) {
        return maxTotal;
    }

    
    function _isTokenAvailable() internal view returns (bool) {
        return _tokensMinted.current() < maxTotal;
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override (AccessControl, ERC721) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }
    
    function withdraw() public {
        require(hasRole(ADMIN_ROLE, msg.sender), "unauthorized: cannot withdraw");
        
        // IMPORTANT: casting msg.sender to a payable address is only safe if ALL members of the minter role are payable addresses.
        address payable receiver = payable(msg.sender);
    
        uint amount = pendingWithdrawals[receiver];
        // zero account before transfer to prevent re-entrancy attack
        pendingWithdrawals[receiver] = 0;
        receiver.transfer(amount);
    }
    
    function availableToWithdraw() public view returns (uint256) {
        return pendingWithdrawals[msg.sender];
    }

    function mint(address recipient) payable
        public onlyOwner
        returns (uint256)
    {
        
        require(
            _isTokenAvailable(),
            "ERC721: All Tokens have been minted"
        );

        require(msg.value >= MINT_COST, "Not enough ETH to mint");

        pendingWithdrawals[adminAddress] += msg.value;
            
        _tokensMinted.increment();
        

        uint256 newItemId = _tokensMinted.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, Strings.toString(newItemId));

        return newItemId;
    }
}