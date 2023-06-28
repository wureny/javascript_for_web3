//当涉及低级别的调用，需要用编码后的参数，这时我们便需要使用到interface来进行编码；
const {privateKey,providerID}=require('./constants');
const hre=require('hardhat');
const ethers=hre.ethers;
async function main(){
const myprovider=new ethers.providers.JsonRpcProvider(providerID)
const mywallet=new ethers.Wallet(privateKey)
//引入weth合约的abi和其在goerli测试网的地址；
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
];
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
//
const mycontract=new ethers.Contract(addressWETH,abiWETH,mywallet);
//一下函数可以从钱包对象获得钱包的地址；
const myaddress=await mywallet.getAddress();
const par1=mycontract.interface.encodeFunctionData(
    "balanceOf",
    [myaddress]
);
const tx={
    to:addressWETH,
    data:par1
}
//一下代码可以获得函数返回值；
//注意：当交易只涉及pure或者是view函数时，可以用provider.call
const balanceofweth=await myprovider.call(tx);
console.log(`交易已经发起：\n`);
//将余额从wgei转换为eth为单位，然后打印；
console.log(`余额：${ethers.utils.formatEther(balanceofweth)}\n`)
}
main()
