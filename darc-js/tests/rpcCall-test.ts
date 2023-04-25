import {ethers} from 'ethers';
import { expect } from 'chai';

import 'mocha';
//import { setTimeout } from "timers/promises";
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/'); 

import { runtime_RunProgram, runtime_getTokenOwners } from '../src/runtime/runtime';

const darc_contract_address = '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE';
import * as darcjson from "../../darc-protocol/artifacts/contracts/Darc.sol/Darc.json";


describe.skip('RPC call test', 
  () => { 
    it('should return true', async () => { 

      /**
       * create a signer with a private key
       * Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
       * Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
       * 
       * (This is a test account, do not use it for anything other than testing)
       */

      const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
      const signer = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);


      const wallet_address = ethers.getAddress('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266');


      //const result = await darc.getTokenOwnerBalance(0, wallet_address);
      //const result2 = await darc.getMemberList();
      //console.log("Here is the result: ");
      //console.log(JSON.stringify(result.toString()));
      //console.log(JSON.stringify(result2.toString()));

      const programOperatorAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
      const target1 = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';

      const target2 = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
  
      // create a token class first
      //const my_addr = await darc.getMyInfo();
      //console.log("my_addr: " + my_addr);
      //console.log(JSON.stringify(wallet_address));

      const mint_and_transfer_program = {
        programOperatorAddress: programOperatorAddress,
        operations: [
        {
          operatorAddress: programOperatorAddress,
          opcode: 1, // mint token
          param: {
            UINT256_ARRAY: [],
            ADDRESS_ARRAY: [],
            STRING_ARRAY: [],
            BOOL_ARRAY: [],
            VOTING_RULE_ARRAY: [],
            PARAMETER_ARRAY: [],
            PLUGIN_ARRAY: [],
            UINT256_2DARRAY: [
              [BigInt(0), BigInt(1)],  // token class = 0
              [BigInt(100), BigInt(200)], // amount = 100
            ],
            ADDRESS_2DARRAY: [
              [programOperatorAddress,programOperatorAddress], // to = programOperatorAddress
            ]
          }
        },
        {
          operatorAddress: programOperatorAddress,
          opcode: 3, // transfer tokens
          param:{
            UINT256_ARRAY: [],
            ADDRESS_ARRAY: [],
            STRING_ARRAY: [],
            BOOL_ARRAY: [],
            VOTING_RULE_ARRAY: [],
            PARAMETER_ARRAY: [],
            PLUGIN_ARRAY: [],
            UINT256_2DARRAY: [
              [BigInt(0),BigInt(0), BigInt(1), BigInt(1)],  // token class = 0
              [BigInt(10), BigInt(20), BigInt(30), BigInt(40)], // amount = 100
            ],
            ADDRESS_2DARRAY: [
              [target1, target2, target1, target2], 
            ]
          }
        }
      ], 
      };

      const create_mint_and_transter_program = {
        programOperatorAddress: programOperatorAddress,
        operations: [{
          operatorAddress: programOperatorAddress,
          opcode: 2, // create token class
          param: {
            UINT256_ARRAY: [],
            ADDRESS_ARRAY: [],
            STRING_ARRAY: ["Class1", "Class2"],
            BOOL_ARRAY: [],
            VOTING_RULE_ARRAY: [],
            PARAMETER_ARRAY: [],
            PLUGIN_ARRAY: [],
            UINT256_2DARRAY: [
              // [BigInt(0), BigInt(1)],
              // [BigInt(10), BigInt(1)],
              // [BigInt(10), BigInt(1)],
              [BigInt(0), BigInt(1)],
              [BigInt(10), BigInt(1)],
              [BigInt(10), BigInt(1)],
            ],
            ADDRESS_2DARRAY: []
          }
        },
        {
          operatorAddress: programOperatorAddress,
          opcode: 1, // mint token
          param: {
            UINT256_ARRAY: [],
            ADDRESS_ARRAY: [],
            STRING_ARRAY: [],
            BOOL_ARRAY: [],
            VOTING_RULE_ARRAY: [],
            PARAMETER_ARRAY: [],
            PLUGIN_ARRAY: [],
            UINT256_2DARRAY: [
              [BigInt(0), BigInt(1)],  // token class = 0
              [BigInt(100), BigInt(200)], // amount = 100
            ],
            ADDRESS_2DARRAY: [
              [programOperatorAddress,programOperatorAddress], // to = programOperatorAddress
            ]
          }
        },
        {
          operatorAddress: programOperatorAddress,
          opcode: 3, // transfer tokens
          param:{
            UINT256_ARRAY: [],
            ADDRESS_ARRAY: [],
            STRING_ARRAY: [],
            BOOL_ARRAY: [],
            VOTING_RULE_ARRAY: [],
            PARAMETER_ARRAY: [],
            PLUGIN_ARRAY: [],
            UINT256_2DARRAY: [
              [BigInt(0),BigInt(0), BigInt(1), BigInt(1)],  // token class = 0
              [BigInt(10), BigInt(20), BigInt(30), BigInt(40)], // amount = 100
            ],
            ADDRESS_2DARRAY: [
              [target1, target2, target1, target2], 
            ]
          }
        }
      ], 
      };
      const param = {
        address: darc_contract_address,
        wallet: signer,
        provider: provider
      };
  
        //const darc = runtime_RunProgram(program,param);

        //const tokenOwners = runtime_getTokenOwners(0, param);
  
        //console.log("tokenOwners: " + JSON.stringify(tokenOwners));
  
        //const DARC = new ethers.Contract(darc_contract_address, darcjson.abi, signer);
  
        //const result = DARC.getTokenOwners(BigInt(0));

        //console.log("result: " + JSON.stringify(result));

        const local_darc = new ethers.Contract(darc_contract_address, darcjson.abi, signer);

        // check the number of token classes. If it is 0, then create a token class first
        const token_class_count = await local_darc.getNumberOfTokenClasses();
        if (token_class_count == 0) {
          await local_darc.entrance(create_mint_and_transter_program);
        }
        else {
          await local_darc.entrance(mint_and_transfer_program);
        }
        //await new Promise(resolve1 => setTimeout(resolve1, 2000)); // Delay of 1000ms (1 second)
        console.log("Here is the token owner balance: ");
        console.log("target1: " + target1);
        console.log((await new ethers.Contract(darc_contract_address, darcjson.abi, signer).getTokenOwnerBalance(BigInt(0), target1)).toString());

      //expect(true).to.equal(true);
  }); 
});