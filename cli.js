#!/usr/bin/env node
'use strict';
const updateNotifier = require('update-notifier');
const meow = require('meow');
const moment = require('moment-timezone');
const devTime = require('dev-time');

const cli = meow(`
	Usage
	  $ dev-time <user>

	Options
	  --format  The moment format of the output. [Default: DD MMM. YYYY - HH:mm:ss]
	  --token   The GitHub authentication token.

	Examples
	  $ dev-time SamVerschueren
	  07 Dec. 2015 - 09:14:49
	  $ dev-time SamVerschueren --format DD-MM-YYYY
	  07-12-2015
`, {
	default: {
		format: 'DD MMM. YYYY - HH:mm:ss'
	}
});

updateNotifier({pkg: cli.pkg}).notify();

if (cli.input.length === 0) {
	console.error('Provide a GitHub user');
	process.exit(1);
}

devTime(cli.input[0], cli.flags).then(time => {
	console.log(moment.utc(time).utcOffset(time).format(cli.flags.format));
});