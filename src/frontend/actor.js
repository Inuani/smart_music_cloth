import { HttpAgent, Actor } from "@dfinity/agent";

const idlFactory = ({ IDL }) => IDL.Service({
  whoAmI: IDL.Func([], [IDL.Principal], ["query"]),
  get_cycle_balance: IDL.Func([], [IDL.Nat], ["query"]),
  remove_self_controller: IDL.Func([], [], []),
  is_controller: IDL.Func([IDL.Principal], [IDL.Bool], ["query"]),
  
  claim_ownership: IDL.Func([], [IDL.Bool], []),
  drop_ownership: IDL.Func([], [], []),
  get_owner: IDL.Func([], [IDL.Principal], ["query"]),
  is_owner: IDL.Func([IDL.Principal], [IDL.Bool], ["query"])
});

const createActor = (options = {}) => {
  const agent = new HttpAgent({
    host: process.env.DFX_NETWORK === "ic" ? "https://ic0.app" : "http://localhost:4943",
    ...options
  });
  
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch(console.error);
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.CANISTER_ID_SMART_RAP_CLOTH
  });
};

const subscribers = new Set();
let currentActor = createActor();

export const actor = currentActor;

export const updateActorIdentity = (identity) => {
  currentActor = createActor({ identity });
  subscribers.forEach(cb => cb(currentActor));
  return currentActor;
};

export const subscribeToActor = (callback) => {
  subscribers.add(callback);
  callback(currentActor);
  return () => subscribers.delete(callback);
};