pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';

contract BracketCore is ERC721Full, ERC721Mintable {
  mapping (uint=>uint8[63]) predictions;

  uint public nextTokenId = 0;
  // Thursday 21 March 2019 16:00:00 GMT
  uint public submissionsDeadline = 1553184000;
  uint bracketPrice = 10 finney;

  event NewSubmissions(uint tokenId, uint8[63] predictions);
  event UpdatedSubmissions(uint tokenId, uint8[63] predictions);

  constructor() ERC721Full("March Madness Bracket", "MMBK") public {
  }

  modifier submissionsAllowed() {
    require(now < submissionsDeadline);
    _;
  }

  function mintBracket(address to, uint8[63] memory bracketPredictions) public payable submissionsAllowed
  {
    require(msg.value >= bracketPrice, "price paid not enough");

    predictions[nextTokenId] = bracketPredictions;
    executeMinting(to, nextTokenId);

    emit NewSubmissions(nextTokenId, bracketPredictions);

    nextTokenId++;
  }

  function executeMinting(address to, uint id) internal {
    _mint(to, id);
  }

  function changePredictions(uint tokenId, uint8[63] memory bracketPredictions) public submissionsAllowed {
    require(ownerOf(tokenId) == msg.sender);

    predictions[tokenId] = bracketPredictions;
    emit UpdatedSubmissions(tokenId, bracketPredictions);
  }

  function getPredictions(uint256 tokenId) public view returns(uint8[63] memory) {
    return predictions[tokenId];
  }

  function getNextTokenId() public view returns(uint) {
    return nextTokenId;
  }
}