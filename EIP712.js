//EIP712是一种安全的签名方法，现已被广泛使用于Metamask，uniswap等场景；
//分为链下签名+链上验证（使用合约）；
//本文件为链下签名
const hre=require('hardhat')
const ethers=hre.ethers
const {providerID,privateKey}=require('./constants')
const myprovider=new ethers.providers.JsonRpcProvider(providerID)
const mywallet=new ethers.Wallet(privateKey,myprovider)
const main=async ()=>{
// 创建 EIP712 Domain
let contractName = "EIP712Storage"
let version = "1"
let chainId = "1"
let contractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8"

const domain = {
    name: contractName,
    version: version,
    chainId: chainId,
    verifyingContract: contractAddress,
};

// 创建类型化数据，Storage
let spender = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
let number = "100"

const types = {
    Storage: [
        { name: "spender", type: "address" },
        { name: "number", type: "uint256" },
    ],
};

const message = {
    spender: spender,
    number: number,
};

const signature=await mywallet._signTypedData(domain,types,message)
console.log('signature:',signature)

}
main()
