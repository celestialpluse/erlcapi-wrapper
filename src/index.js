const config = require('./config');
const { getServerInfo } = require('./function/getServerInfo');
const { getServerPlayers } = require("./function/getServerPlayers");
const { getKillLogs } = require("./function/getKillLogs");
const { getServerQueue } = require("./function/getServerQueue");
const { getJoinLogs } = require('./function/getJoinLogs');
const { sendServerCommand } = require('./function/sendServerCommand');
const { getModCallsLogs } = require('./function/getModeratorsCall');
const { getCommandLogs } = require('./function/getCommandLogs');
const { getLeaveLogs } = require('./function/getLeaveLogs');
const { getServerBans } = require('./function/getServerBans');
const { getServerVehicles } = require('./function/getServerVehicles');
const chalk = require('chalk');
const process = require('process'); // Required to exit the process

class ERLCAPI {
    constructor(options) {
        try {
            config.setConfig(options);
            console.log(chalk.bold.green('ERLC API\n'));
            console.log(`getServerInfo(): ${chalk.green('Loaded')}`);
            console.log(`getServerPlayers(): ${chalk.green('Loaded')}`);
            console.log(`getKillLogs(): ${chalk.green('Loaded')}`);
            console.log(`getServerQueue(): ${chalk.green('Loaded')}`);
            console.log(`getJoinLogs(): ${chalk.green('Loaded')}`);
            console.log(`sendServerCommand(): ${chalk.green('Loaded')}`);
            console.log(`getModCallsLogs(): ${chalk.green('Loaded')}`);
            console.log(`getCommandLogs(): ${chalk.green('Loaded')}`);
            console.log(`getLeaveLogs(): ${chalk.green('Loaded')}`);
            console.log(`getServerBans(): ${chalk.green('Loaded')}`);
            console.log(`getServerVehicles(): ${chalk.green('Loaded')}`);
            console.log(`\nERLC API Created By: [Celestial](https://gogoal.xyz)`);
            console.log(chalk.green('ERLC API is now live and ready.'));
            console.log(`Version: ${require('../package.json').version}`);
            
            const cfg = config.getConfig();
            if (cfg.errorType === 'Message' && !cfg.errorWebhook) {
                console.error(chalk.red('[ERLC API Wrapper] Error: errorWebhook must be stated if the errorType is message'));
                process.exit(1); 
            }
        } catch (error) {
            console.error(chalk.red(`[ERLC API Wrapper] Configuration Error: ${error.message}`));
            process.exit(1); 
        }
    }

    getServerInfo = getServerInfo;
    getServerPlayers = getServerPlayers;
    getKillLogs = getKillLogs;
    getServerQueue = getServerQueue;
    getJoinLogs = getJoinLogs;
    sendServerCommand = sendServerCommand;
    getModCallsLogs = getModCallsLogs;
    getCommandLogs = getCommandLogs;
    getLeaveLogs = getLeaveLogs;
    getServerBans = getServerBans;
    getServerVehicles = getServerVehicles;
}

module.exports = ERLCAPI;
