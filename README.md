# aas-crdt-demo

This is a demonstration of a collaborative editor for Asset Administration Shells (AAS) implemented with Conflict-free Replicated Data Types (CRDTs).

## Demo

Go to https://mristin.github.io/aas-crdt-demo

## Development

Check out the repository and go to the repository root folder.

Install the dependencies:

```
npm install
```

Run the local server:

```
npm run dev
```

You still need Internet connection since the clients exchange logs through wss://sync.automerge.org.

The entry point in the code base is [src/main.tsx](src/main.tsx).
