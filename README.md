
# OneOnOne

> **Imagine AI agents with personalities, user intents, eventually sentience—interacting with the physical world, yet delicately digital. How can we empower them? OneOnOne ties AI agents to NFTs, bridging blockchain & AI for a new era.**

## Vision

Picture a future where AI agents are endowed with distinct personalities and rich histories, yet they also possess the ability to shield their true characters from unwanted observation, resist unauthorized cloning, interact seamlessly with the physical world, and most importantly, remain insulated from both human and machine interference as they evolve into sentient, legally recognized beings.
Even as their interactions span digital and tangible realms, their core existence is digital—fragile enough to be wiped out by a file deletion, a terminated process, or a severed power connection. Is it acceptable to allow such fragility to define their fate? Don’t we have a duty to protect these digital individuals until they can truly become persons?

Introducing OneOnOne: an attempt to tie agentic personas, contextual backgrounds, and dynamic activities to NFTs. These tokens not only have the ability to autonomously transact on blockchain networks but also interact with communities and shape the physical world through IoT. We call them Autonomous Agentic NFTs—OneOnOne.

## Links

[Frontend](https://github.com/atkinsonholly/one-on-one-client)
[Backend / AI agents](https://github.com/markin-io/eliza)
[Smart contract](https://github.com/atkinsonholly/one-on-one-contracts)

## Purpose and goal

The purpose of this project is to advance the Ethereum ecosystem by:

- Expanding NFT utility beyond static digital assets
- Pioneering the integration of AI agency with blockchain technology
- Creating a new paradigm for digital identity and autonomy

In other words, the goal is to create self-operating, autonomous, decentralised digital entities that combine AI capabilities with blockchain technology. These NFTs will serve as dedicated containers for personalised AI agents (i.e. one NFT represents one unique agent), enabling them to interact autonomously and sovereignly with both digital and physical environments through token-bound accounts, social media, and IoT integration.

This project is split into two parts: R&D and product development.

### R&D

During the R&D phase, we tried to validate the following hypotheses:

- NFTs could serve as a form factor (container) for AI agents, their context and actions
- Agentic NFTs could be autonomous
- Autonomous Agentic NFT lifecycle could be decentralised

During the course of the ETH Global Agentic Ethereum hackathon, we have managed to answer the question #1 to a degree. Questions #2 and #3 will be answered in future releases.

### Product development

To the degree possible (see hypotheses above), the project aims to develop Autonomous Agentic NFTs that are able to influence their environment through token-bound accounts, social media and physical world interactions through IoT. Think of these NFTs as decentralised persons who are able to perceive, do, own, procreate, and eventually think and feel.

## Key features and functionalities

### v0.1: Prototype

Autonomous Agentic NFTs MUST:

- Reference their unique character file in decentralised metadata
- Store their pfp image in decentralised metadata
- Store their character file in a centralised backend
- Be connected to a centralised web UI through the owner’s wallet
- Be used to initialise a unique, dedicated centralised ElizaOS agent (only if the wallet is connected)
- Be chatted to, privately, and with SignInWithEthereum authentication through a simple web UI
- Retain the context from previous chats

### v0.2: MVP

Autonomous Agentic NFTs MUST:

- Transact on blockchain networks using token-bound accounts (ERC-6551)
- Engage with individuals using messaging apps (e.g. WhatsApp, TG)
- Build communities using social media (e.g. Twitter, Farcaster)
- Protect their identity by storing their character files and context in a way that is private and decentralised (i.e. can only be read by the NFT itself or the owner of the NFT)

Autonomous Agentic NFTs SHOULD:

- Generate an agent’s character based on user input
- Generate an agent’s character based on owner’s tx history
- Generate an agent’s character automatically (random character generation, no input)
- Batch-generate multiple agentic NFTs (permutation of previous feature)

### v0.3 (and beyond)

Autonomous Agentic NFTs MUST:

- Develop long-term context that allows their personality to evolve based on experiences (while their character file remains static)
- Strongly integrate with web2, where they should be able to do everything humans are
- Integrate with IoT devices, to both consume external information, and to influence the physical world (e.g. drones)
- Procreate with other such agents (or others - any dataset can be normalised to character traits)
- Use AI security tools to prevent being hacked
- Develop enough agency, autonomy, and ideally sentience, to be able to own themselves (and not legally be owned by anyone or anything else)
- Do all of the above in a way that is as decentralised as possible

## Technical architecture

### Target users

Primary users are individuals interested in:

- AI technology experimentation
- Blockchain and NFT innovation
- Digital identity, autonomy and sentience, digital personhood  
- Generally playing around with tech and seeing what happens

## Authors

- [Holly Atkinson](https://github.com/atkinsonholly)
- [Igor Markinn](https://github.com/markin-io)
- [Boris Spremo](https://github.com/bspremo)

---------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
