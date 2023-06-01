// SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;

contract TwitterDapp {
    uint public twitterId = 1;    
    Twitter[] public tweet; 
    Like[] public like; 
    Comment[] public comment; 
    User[] public userInfo; 
    mapping(uint256 => address) public users;

    struct User{        
        string name; 
        string location; 
        uint date; 
        address author; 
    }

    struct Twitter{
        uint id; 
        string hash; 
        string description;
        uint datetime; 
        bool isActive; 
        address payable author; 
    }

    struct Like{
        uint id;
        address likedBy; 
        bool status;
        uint datetime;         
    }

    struct Comment{
        uint id; 
        address commentedBy; 
        string comments; 
        uint datetime; 
    }

    //event
    event TweetPosted(uint id); 
    event TweetUpdated(uint id); 
    event TweetToggle(uint id); 
    event  TweetLikeDislike(uint id);    
    event  TweetComment(uint id);  
    event ProfileCreated(address author);  

//[0, "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", "Desc", 1635790237, true, "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"]    //Create Tweet
    //userInfo
    function createUser(string memory _name, string memory _location) public {
        userInfo.push(User(_name, _location, block.timestamp, msg.sender));    
        emit ProfileCreated(msg.sender);
    }
        
    
    // post tweet
    function postTweet(Twitter memory _twitter) public {
        tweet.push(_twitter); 
        users[twitterId] = msg.sender;
        twitterId += 1; 
        emit TweetPosted(twitterId);
    }
    //Update Tweet
    function updateTweet(uint256 _index, Twitter memory _twitter) public {
        require(msg.sender == users[_index], "You are not the owner of this tweet");        
        tweet[_index] = _twitter;
        emit TweetUpdated(_index); 
    }

    //toggle
     function toggleTweet(uint _index) public {
        Twitter storage _twitter = tweet[_index]; 
        require(msg.sender == users[_index], "You are not the owner of this tweet");        
        _twitter.isActive = !(_twitter.isActive);     
        emit TweetToggle(_index);
    }

    //like
    function likeTweet(uint _index) public {
        //Make sure address exists
        require(msg.sender != address(0x0));
        like.push(Like(_index, msg.sender, true, block.timestamp));        
        emit TweetLikeDislike(_index);
    }
    //toggleLike
    function toggleLike(uint _index) public {
        Like storage _like = like[_index]; 
        require(msg.sender == _like.likedBy);
        _like.status = !(_like.status);     
        _like.datetime = block.timestamp;
        emit TweetLikeDislike(_index);
    }
    
    function getTweets() public view returns(Twitter[] memory){
        return tweet;
    }
     function getLikes() public view returns(Like[] memory){
        return like;
    }

    function getComment() public view returns(Comment[] memory){
        return comment;
    }
    function commentOnTweet(uint _index, string memory _comments) public {
        //Make sure address exists
        require(msg.sender != address(0x0));
        comment.push(Comment(_index, msg.sender, _comments , block.timestamp));        
        emit TweetComment(_index);
    }
}