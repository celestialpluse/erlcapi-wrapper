# ERLC API Wrapper Documentation

## Overview

The ERLC API Wrapper is a Node.js package designed to simplify interactions with the ERLC API. This package includes functions for managing server information, player data, commands, and more, all while respecting configuration settings such as cooldown periods and error handling.

---

## Table of Contents

1. [Configuration](#configuration)
2. [Functions](#functions)
    - [getServerInfo](#getServerInfo)
    - [getServerPlayers](#getServerPlayers)
    - [getKillLogs](#getKillLogs)
    - [getServerQueue](#getServerQueue)
    - [getJoinLogs](#getJoinLogs)
    - [getLeaveLogs](#getLeaveLogs)
    - [getServerVehicles](#getServerVehicles)
    - [getCommandLogs](#getCommandLogs)
    - [getServerBans](#getServerBans)
    - [getModCallsLogs](#getModCallsLogs)
    - [sendServerCommand](#sendServerCommand)

---

## Configuration

### Overview

The configuration for the ERLC API Wrapper is managed through a `config.js` file. You can set up and adjust the configuration parameters as needed.

### Configuration Options

- **globalKey**: (Optional) A global authorization key for API requests.
- **cooldown**: (Optional) The cooldown period in seconds between requests.
- **errorType**: (Optional) Determines how errors are handled (`Console` or `Message`).
- **errorWebhook**: (Optional) The URL of the webhook where error messages are sent if `errorType` is `Message`.

### Example Configuration

```javascript
const erlc = require('erlcapi');

erlc.config({
    globalKey: 'YOUR_GLOBAL_KEY',
    cooldown: 30,
    errorType: 'Message',
    errorWebhook: 'https://your-webhook-url.com'
});
```

### Configuration File (`config.js`)

```javascript
const Joi = require('joi');
const interpreter = require('./interpreter');

let isConfigured = false;

const configSchema = Joi.object({
    globalKey: Joi.string().allow(null),
    cooldown: Joi.number().integer().min(0).default(0),
    errorType: Joi.string().valid('Console', 'Message').default('Console'),
    errorWebhook: Joi.string().uri().allow(null)
});

let configuration = {
    globalKey: interpreter.getEnv('ERLC_GLOBAL_KEY', null),
    cooldown: interpreter.getEnv('ERLC_COOLDOWN', 0),
    errorType: interpreter.getEnv('ERLC_ERROR_TYPE', 'Console'),
    errorWebhook: interpreter.getEnv('ERLC_ERROR_WEBHOOK', null),
};

module.exports = {
    setConfig: (options) => {
        if (isConfigured) {
            throw new Error('ERLC API Wrapper is already configured. `erlc.config` can only be called once.');
        }

        const { error, value } = configSchema.validate(options);
        if (error) throw new Error(`Invalid configuration: ${error.message}`);

        configuration = { ...configuration, ...value };
        isConfigured = true;
    },
    getConfig: () => configuration
};
```

---

## Functions

### `getServerInfo(serverKey, options = {})`

#### Description

Retrieves information about a server.

#### Parameters

- **serverKey**: `string` - The key of the server.
- **options**: `object` - Optional parameters.
  - **filter**: `array` - List of filters to apply.

#### Returns

- `object` - The server information.

#### Example

```javascript
const info = await erlc.getServerInfo('your-server-key', { filter: ['players', 'status'] });
console.log(info);
```

---

### `getServerPlayers(serverKey, options = {})`

#### Description

Fetches the list of players on the server.

#### Parameters

- **serverKey**: `string` - The key of the server.
- **options**: `object` - Optional parameters.
  - **filter**: `array` - List of filters to apply.

#### Returns

- `array` - List of players.

#### Example

```javascript
const players = await erlc.getServerPlayers('your-server-key', { filter: ['active'] });
console.log(players);
```

---

### `getKillLogs(serverKey, options = {})`

#### Description

Retrieves the kill logs from the server.

#### Parameters

- **serverKey**: `string` - The key of the server.
- **options**: `object` - Optional parameters.
  - **filter**: `array` - List of filters to apply.

#### Returns

- `array` - List of kill logs.

#### Example

```javascript
const kills = await erlc.getKillLogs('your-server-key');
console.log(kills);
```

---

### `getServerQueue(serverKey)`

#### Description

Gets the current server queue.

#### Parameters

- **serverKey**: `string` - The key of the server.

#### Returns

- `array` - List of integers representing the queue, or `null` if empty.

#### Example

```javascript
const queue = await erlc.getServerQueue('your-server-key');
console.log(queue);
```

---

### `getJoinLogs(serverKey, options = {})`

#### Description

Retrieves join logs, showing only successful joins.

#### Parameters

- **serverKey**: `string` - The key of the server.
- **options**: `object` - Optional parameters.
  - **filter**: `array` - List of filters to apply.

#### Returns

- `array` - List of join logs where `Join` is `true`.

#### Example

```javascript
const joins = await erlc.getJoinLogs('your-server-key', { filter: ['recent'] });
console.log(joins);
```

---

### `getLeaveLogs(serverKey, options = {})`

#### Description

Retrieves leave logs, showing only successful leaves.

#### Parameters

- **serverKey**: `string` - The key of the server.
- **options**: `object` - Optional parameters.
  - **filter**: `array` - List of filters to apply.

#### Returns

- `array` - List of leave logs where `Join` is `false`.

#### Example

```javascript
const leaves = await erlc.getLeaveLogs('your-server-key', { filter: ['recent'] });
console.log(leaves);
```

---

### `getServerVehicles(serverKey)`

#### Description

Gets the list of vehicles on the server.

#### Parameters

- **serverKey**: `string` - The key of the server.

#### Returns

- `array` - List of vehicles, or `null` if empty.

#### Example

```javascript
const vehicles = await erlc.getServerVehicles('your-server-key');
console.log(vehicles);
```

---

### `getCommandLogs(serverKey, options = {})`

#### Description

Retrieves command logs from the server.

#### Parameters

- **serverKey**: `string` - The key of the server.
- **options**: `object` - Optional parameters.
  - **filter**: `array` - List of filters to apply.

#### Returns

- `array` - List of command logs.

#### Example

```javascript
const commands = await erlc.getCommandLogs('your-server-key', { filter: ['recent'] });
console.log(commands);
```

---

### `getServerBans(serverKey)`

#### Description

Retrieves the list of banned players from the server.

#### Parameters

- **serverKey**: `string` - The key of the server.

#### Returns

- `array` - List of banned players, or `null` if empty.

#### Example

```javascript
const bans = await erlc.getServerBans('your-server-key');
console.log(bans);
```

---

### `getModCallsLogs(serverKey, options = {})`

#### Description

Fetches logs of moderation calls.

#### Parameters

- **serverKey**: `string` - The key of the server.
- **options**: `object` - Optional parameters.
  - **filter**: `array` - List of filters to apply.

#### Returns

- `array` - List of mod call logs.

#### Example

```javascript
const modCalls = await erlc.getModCallsLogs('your-server-key', { filter: ['recent'] });
console.log(modCalls);
```

---

### `sendServerCommand(serverKey, options = {})`

#### Description

Sends a command to the server.

#### Parameters

- **serverKey**: `string` - The key of the server.
- **options**: `object` - Command options.
  - **command**: `string` - The command to send.

#### Returns

- `string` - Result message based on the response status.

#### Example

```javascript
const result = await erlc.sendServerCommand('your-server-key', { command: ':kick all' });
console.log(result);
```

---

## Error Handling

The ERLC API Wrapper handles errors based on the configuration settings:

- **Console**: Logs errors to the console.
- **Message**: Sends errors to a specified webhook.

Ensure the `errorType` and `errorWebhook` in the configuration are set correctly for the desired error handling method.

---

## License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For support or questions, please contact [Your Email](mailto:celestialpluse@gmail.com).

---
