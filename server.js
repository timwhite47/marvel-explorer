import chokidar from 'chokidar';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { clean } from 'require-clean';
import { exec } from 'child_process';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

let graphQLServer;
let appServer;

function startAppServer(callback) {
  // Serve the Relay app
  const compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'app.js'),
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          test: /\.js$/,
        }
      ]
    },
    output: { filename: '/app.js', path: '/', publicPath: '/js/' }
  });
  appServer = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    proxy: { '/graphql': `http://localhost:${GRAPHQL_PORT}` },
    publicPath: '/js/',
    stats: { colors: true }
  });
  // Serve static resources
  const publicUI = express.static(path.resolve(__dirname, 'public'));
  appServer.use('/', publicUI);
  appServer.use('/characters*', publicUI);
  appServer.use('/comics*', publicUI);
  appServer.use('/series*', publicUI);
  appServer.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
    if (callback) {
      callback();
    }
  });
}

function startServers(callback) {
  // Shut down the servers
  if (appServer) {
    appServer.listeningApp.close();
  }
  if (graphQLServer) {
    graphQLServer.close();
  }

  // Compile the schema
  let doneTasks = 0;
  function handleTaskDone() {
    doneTasks++;
    if (doneTasks === 1 && callback) {
      callback();
    }
  }

  startAppServer(handleTaskDone);
}
const watcher = chokidar.watch('./data/{database,schema}.js');
watcher.on('change', path => {
  console.log(`\`${path}\` changed. Restarting.`);
  startServers(() =>
    console.log('Restart your browser to use the updated schema.')
  );
});
startServers();
