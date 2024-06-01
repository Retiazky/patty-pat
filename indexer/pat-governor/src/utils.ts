//import smart contract class from generated files
import { ERC20 } from "../generated/Token/ERC20";
import { PAT_TOKEN, DAO_ADDRESS } from "./constansts";
//import entities
import { Token } from "../generated/schema";
//import datatypes
import { BigDecimal, ethereum, Address } from "@graphprotocol/graph-ts";
//fetch token details
export function fetchTokenDetails(event: ethereum.Event): Token | null {
  let token = Token.load(event.address.toHex());
  if (!token) {
    token = new Token(event.address.toHex());
    token.name = "N/A";
    token.symbol = "N/A";
    token.decimals = BigDecimal.fromString("0");
    let erc20 = ERC20.bind(event.address);

		const owner = erc20.try_owner();

		if (!owner.reverted) {
			return null;
		}

		if (owner.value != Address.fromString(DAO_ADDRESS) || event.address != Address.fromString(PAT_TOKEN)) {
			return null;
		}

	    let tokenName = erc20.try_name();
	    if (!tokenName.reverted) {
	      token.name = tokenName.value;
	    }

    //fetch symbol
    let tokenSymbol = erc20.try_symbol();
    if (!tokenSymbol.reverted) {
      token.symbol = tokenSymbol.value;
    }

    //fetch decimals
    let tokenDecimal = erc20.try_decimals();
    if (!tokenDecimal.reverted) {
      token.decimals = BigDecimal.fromString(tokenDecimal.value.toString());
    }

	let totalSupply = erc20.try_totalSupply();
	if (!totalSupply.reverted) {
		token.totalSupply = totalSupply.value.toBigDecimal();
	}
    token.save();
  }
  return token;
}

//fetch the current balance of a particular token
//in the given account
export function fetchBalance(
  tokenAddress: Address,
  accountAddress: Address
): BigDecimal {
  let erc20 = ERC20.bind(tokenAddress); //bind token
  let amount = BigDecimal.fromString("0");
  let tokenBalance = erc20.try_balanceOf(accountAddress);
  if (!tokenBalance.reverted) {
    amount = tokenBalance.value.toBigDecimal();
  }
  return amount;
}
