/*
 * minestat.js - A Minecraft server status checker
 * Copyright (C) 2016 Lloyd Dilley
 * http://www.dilley.me/
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

// For use with Node.js

const NUM_FIELDS = 6;      // number of values expected from server
const DEFAULT_TIMEOUT = 5; // default TCP timeout in seconds
module.exports =
{
  init: function(address, port, timeout, callback)
  {
    // if 3rd argument is a function, it's the callback (timeout is optional)
    if(typeof(timeout) === typeof(Function()))
    {
      callback = timeout;
      timeout = DEFAULT_TIMEOUT;
    }

    const net = require('net');
    const client = net.connect(port, address, () =>
    {
      var buff = Buffer.from([ 0xFE, 0x01 ]);
      client.write(buff);
    });

    client.setTimeout(timeout * 1000);

    client.on('data', (data) =>
    {
      if(data != null && data != '')
      {
        let server_info = data.toString().split("\x00\x00\x00");
        let results = {
          online: false
        };
        if(server_info != null && server_info.length >= NUM_FIELDS)
        {
          results.online = true;
          results.version = server_info[2].replace(/\u0000/g,'');
          results.motd = server_info[3].replace(/\u0000/g,'');
          results.current_players = server_info[4].replace(/\u0000/g,'');
          results.max_players = server_info[5].replace(/\u0000/g,'');
        }
        callback(undefined, results);
        client.end();
      }else {
        callback("error connecting", undefined)
      }
    });

    client.on('timeout', () =>
    {
      callback({code:"timeout"},undefined);
      client.end();
      process.exit();
    });

    client.on('end', () =>
    {
      // nothing needed here
    });

    client.on('error', (err) =>
    {
     callback(err, undefined);
    });
  }
};
