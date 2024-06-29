// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Count {
    
    uint public count;

    event increased(uint count);
    event decreased(uint count);
    event reset(uint count);

    // Function to increase the count
    function increaseCount() public {
        count += 1;
        emit increased(count);
    }

    // Function to decrease the count
    function decreaseCount() public {
        require(count > 0, "Count cannot be less than 0");
        count -= 1;
        emit decreased(count);
    }

    // New function to reset the count to zero
    function resetCount() public {
        count = 0;
        emit reset(count);
    }

    // New function to get the contract's balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
