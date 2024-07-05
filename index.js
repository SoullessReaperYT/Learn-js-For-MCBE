// ==================== IMPORTS ====================
import { world } from "@minecraft/server";

// This script uses the Minecraft Bedrock Edition Script API
// The 'world' object is imported from the @minecraft/server module, which provides access to the game world

// ==================== EVENT LISTENERS ====================

// Player Join Event
world.afterEvents.playerJoin.subscribe((event) => {
    const player = event.player;
    world.sendMessage(`${player.name} has joined the game!`);
});
// This event fires after a player joins the game
// It sends a message to all players announcing the new player's arrival

// Block Break Event
world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const player = event.player;
    const block = event.block;
    player.sendMessage(`You broke a ${block.type.id} block!`);
});
// This event fires before a player breaks a block
// It sends a message to the player informing them of the type of block they broke

// Player Leave Event
world.afterEvents.playerLeave.subscribe((event) => {
    world.sendMessage(`§c${event.playerName} has left the game.`);
});
// This event fires after a player leaves the game
// It sends a message to all players announcing the player's departure
// §c is a color code for red text in Minecraft

// Chat Event
world.beforeEvents.chatSend.subscribe((event) => {
    if (event.message.startsWith("!")) {
        handleCommand(event);
        event.cancel = true;
    }
});
// This event fires before a chat message is sent
// If the message starts with '!', it's treated as a command
// The event is cancelled to prevent the command from appearing in chat

// ==================== COMMANDS ====================
function handleCommand(event) {
    const player = event.sender;
    const command = event.message.toLowerCase().slice(1); // Remove the '!'

    switch (command) {
        case "help":
            player.sendMessage("§6Available commands: !help, !time");
            break;
        case "time":
            const time = world.getTimeOfDay();
            player.sendMessage(`§6Current time: ${time} ticks`);
            break;
        default:
            player.sendMessage("§cUnknown command. Type !help for a list of commands.");
    }
}
// This function handles custom commands
// It checks the command (without the '!') and responds accordingly
// The time is returned in ticks (20 ticks = 1 second in Minecraft)

// ==================== NOTES ====================
// This script demonstrates basic usage of the Minecraft Bedrock Edition Script API
// It includes examples of event handling and custom command processing
// The script can be expanded to include more complex functionality and additional commands
