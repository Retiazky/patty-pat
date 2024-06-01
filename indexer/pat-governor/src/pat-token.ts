//import event class from generated files
import {Transfer} from "../generated/Token/ERC20"
//import entities
import {TokenBalance, TokenTransfer} from "../generated/schema"
//import the functions defined in utils.ts
import {
  fetchTokenDetails,
  fetchBalance
} from "./utils"
//import datatype
import { BigDecimal} from "@graphprotocol/graph-ts";

export function handleTokenTransfer(event: Transfer): void {
    let token = fetchTokenDetails(event);
    if (!token || token.name == 'N/A') {
    	return
    }
    let fromAddress = event.params.from;
    let toAddress = event.params.to;

    let fromTokenBalance = TokenBalance.load(token.id + "-" + fromAddress.toHex());
    if (!fromTokenBalance) {
          fromTokenBalance = new TokenBalance(token.id + "-" + fromAddress.toHex());
          fromTokenBalance.token = token.id;
          fromTokenBalance.account= fromAddress;
    }
    fromTokenBalance.amount = fetchBalance(event.address,event.params.from)
    if(fromTokenBalance.amount != BigDecimal.fromString("0")){
      fromTokenBalance.save();
    }

    let toTokenBalance = TokenBalance.load(token.id + "-" + toAddress.toHex());
    if (!toTokenBalance) {
        toTokenBalance = new TokenBalance(token.id + "-" + toAddress.toHex());
        toTokenBalance.token = token.id;
        toTokenBalance.account = toAddress;
      }
    toTokenBalance.amount = fetchBalance(event.address,event.params.to)
    if(toTokenBalance.amount != BigDecimal.fromString("0")){
      toTokenBalance.save();
    }

	let transfer = new TokenTransfer(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
	transfer.token = token.id;
	transfer.from = fromAddress;
	transfer.to = toAddress;
	transfer.amount = event.params.value.toBigDecimal();
	transfer.blockNumber = event.block.number;
	transfer.timestamp = event.block.timestamp;
	transfer.transactionHash = event.transaction.hash;
	transfer.save();
}
