# Gratitude Gang Art Engine 🌻

Create generative art by using the canvas api and node js. Before you 
use the generation engine, make sure you have node.js (v16) installed.

Support us @[gratitudegang.io](https://www.gratitudegang.io/) and if 
you are using this library, hope you can 
[mint a sunflower](https://www.gratitudegang.io/mint) :)

## Installation 🛠️

If you are cloning the project then run this first, otherwise you can 
download the source code on the release page and skip this step.

```sh
git clone https://github.com/gratitude-nft/artengine.git
```

Go to the root of your folder and run this command if you have yarn installed.

```sh
yarn install
```

Alternatively you can run this command if you have node installed.

```sh
npm install
```

## Usage ℹ️

Create your different layers as folders in the 'layers' directory, and 
add all the layer assets in these directories. You can name the assets 
anything as long as it has a rarity weight attached in the file name 
like so: `1-Name/Value#70.png`. 

Once you have all your layers, run `$ npm run setup` to generate a new 
`config/layers.json` file. Remove the `config/layers` folder and 
remove `layers/green` and `layers/orange` configuration in `config/engine.js`.

Run `$ npm run build`. This will create a new `build` folder in your 
project. Other commands you may want to try are the following.

 - `$npm run rarity` - This will create a `rarity.html` file in your 
   `build` folder. You can open it with your browser to see various 
   rarity stats.
 - `$npm run pinata` - This will upload your `build` folder to 
   [Pinata](https://pinata.cloud/). You need to add your pinata API keys 
   to `.env` first **(Ccpy `.env.sample` to get started)**.
 - `$npm run nft.storage` - This will upload your `build` folder to 
   [nft.storage](https://nft.storage/). You need to add your pinata API 
   keys to `.env` first **(copy `.env.sample` to get started)**.

That's it, you're done. Hope you create some awesome artworks with this code 👄
