## Welcome

Presentation Video
https://www.loom.com/share/219e303d3c6c43e99d664d24ccbb0591

## Backend/Smart Contract deployment:

```bash
cd backend
yarn install
npx hardhat run scripts/deploy.js
```

## Frontend:

In the parent folder:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Easier approach

For this project I took the longer route simply to showcase my skills, however this can be achieved much simpler using the ERC20 OpenZeppelin contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {}
}
```

## Contact

Feel free to contact me at hello@wpharvest.com
