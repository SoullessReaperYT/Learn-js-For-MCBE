
// ==================== IMPORTS ====================
import { world } from "@minecraft/server";

world.afterEvents.playerJoin.subscribe((event) => {
    const player = event.player;
    world.sendMessage(`${player.name} has joined the game!`);
})


world.beforeEvents.playerBreakBlock.subscribe((event) => {
    const player = event.player;
    const block = event.block;
    player.sendMessage(`You broke a ${block.type.id} block!`);
});

world.afterEvents.playerLeave.subscribe((event) => {
    world.sendMessage(`§c${event.playerName} has left the game.`);
});

world.beforeEvents.chatSend.subscribe((event) => {
    if (event.message.startsWith("!")) {
        handleCommand(event);
        event.cancel = true;
    }
});


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




// using if statement to check if the player has just spawned in the world or has respawned after dying

world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    
    // Check if this is the initial spawn
    if (event.initialSpawn) {
        player.sendMessage("§6Welcome to the server!");
        player.runCommandAsync("give @s map");
    }
    else {
        player.sendMessage("§6you have respawned!");
    }
});