import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import {
  ProposalCanceled as ProposalCanceledEvent,
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  VoteCast as VoteCastEvent,
} from "../generated/PatGovernor/PatGovernor"
import {
	Proposal,
} from "../generated/schema"


export function handleProposalCreated(event: ProposalCreatedEvent): void {
	let entity: Proposal = new Proposal(event.params.proposalId.toString())
	entity.description = event.params.description
	entity.proposer = event.params.proposer
	entity.against = BigInt.fromString("0")
	entity.for = BigInt.fromString("0")
	entity.abstain = BigInt.fromString("0")
	entity.createdAt = event.block.timestamp.toI32()
	entity.voteStart = event.params.voteStart
	entity.voteEnd = event.params.voteEnd
	entity.executed = false
	entity.canceled = false
	entity.targets = event.params.targets.map<string>((value) => value.toHex())
	entity.values = event.params.values
	entity.calldatas = event.params.calldatas
	entity.save()
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
	let entity: Proposal | null = Proposal.load(event.params.proposalId.toString());
	if (entity == null) {
		return
	}
	entity.executed = true
	entity.save()
}

export function handleVoteCast(event: VoteCastEvent): void {
	let entity: Proposal | null = Proposal.load(event.params.proposalId.toString());
	if (entity == null) {
		return
	}
	if (event.params.support == 0) {
		entity.against = entity.against.plus(event.params.weight);
	} else if (event.params.support == 1) {
		entity.for = entity.for.plus(event.params.weight);
	} else {
		entity.abstain = entity.abstain.plus(event.params.weight);
	}
	entity.save()
}

export function handleProposalCanceled(event: ProposalCanceledEvent): void {
	let entity: Proposal | null = Proposal.load(event.params.proposalId.toString());
	if (entity == null) {
		return
	}
	entity.canceled = true
	entity.save()
}

