/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {

  // ADDRESS TO MINT TO:
  const toAddress = "0xAFe991897df0cBDE6D907833D52D43Ef1A0A2EBc" //"0x744222844bFeCC77156297a6427B5876A6769e19"

  console.log("\n\n 🎫 Minting to "+toAddress+"...\n");

  const yourCollectible = await ethers.getContractAt('YourCollectible', "0xF22f215708F3768011Cb5BC65232cf0Beb085C54") // "0xF22f215708F3768011Cb5BC65232cf0Beb085C54") //fs.readFileSync("./artifacts/YourCollectible.address").toString())


  const buffalo = {
    "description": "Levis Stadium 8PM 5/10/21 Section B #3a1h93",
    "external_url": "https://res.cloudinary.com/dhl3gjazr/image/upload/v1625450032/concertcoin_qrcode.png",// <-- this can link to a page for the specific file too
    "image": "https://res.cloudinary.com/dhl3gjazr/image/upload/v1625450032/concertcoin.png",
    "name": "Beyonce Concert Ticket",
    "attributes": [
       {
         "trait_type": "Event",
         "value": "Beyonce Concert"
       },
       {
         "trait_type": "Confirmation Number",
         "value": "a2w8a"
       },	   
       {
         "trait_type": "Location",
		   "value": "Levis Stadium"
       },	   
       {
         "trait_type": "Date",
		   "value": "2021-05-10"
       },	   
       {
         "trait_type": "Time",
		   "value": "20:00"
       },	   
       {
         "trait_type": "Number",
		   "value": "3a1h93"
       },	   
       {
         "trait_type": "QRCODE",
		   "value": "https://res.cloudinary.com/dhl3gjazr/image/upload/v1625450032/concertcoin_qrcode.png"
       }
    ]
  }
  console.log("Uploading Ticket...")
  const uploaded = await ipfs.add(JSON.stringify(buffalo))

  console.log("Minting Ticket with IPFS hash ("+uploaded.path+")")
  await yourCollectible.mintItem(toAddress,uploaded.path,{gasLimit:400000})


  await sleep(delayMS)

  console.log("Purchased the Ticket...")
  
  /*


  console.log("Minting zebra...")
  await yourCollectible.mintItem("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1","zebra.jpg")

  */


  //const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])



  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */


  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */


  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

