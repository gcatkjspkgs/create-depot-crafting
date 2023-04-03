function depot_application (event, output, inputInHand, inputOnDepot, isAssisted, inputInOffhand, offHandHasDurability) {
    if (event.block == 'create:depot' && event.block.entityData.HeldItem != undefined && event.player.mainHandItem.id == inputInHand) {
        let depotItem = event.block.inventory.get(0)
        let handItem = event.player.mainHandItem
        let offhandItem = event.player.offHandItem
        event.cancel()
        if (inputOnDepot == depotItem && inputInHand == handItem && isAssisted == false) {
            if (event.block.entityData.HeldItem.Item.id == inputOnDepot && event.player.mainHandItem == inputInHand) {
                handItem.count--
                event.block.inventory.extract(0, Item.of(inputOnDepot).count, false)
                event.player.give(output)
            }
        } else if (inputOnDepot == depotItem && inputInHand == handItem && offhandItem == inputInOffhand && isAssisted == true) {
            let depotItem = event.block.inventory.get(0)
            let handItem = event.player.mainHandItem
            let offhandItem = event.player.offHandItem
            event.cancel()
            if (inputOnDepot == depotItem && inputInHand == handItem && inputInOffhand == offhandItem) {
                if (event.block.entityData.HeldItem.Item.id == inputOnDepot && event.player.mainHandItem == inputInHand && event.player.offHandItem == inputInOffhand) {
                    handItem.count--
                    event.block.inventory.extract(0, Item.of(inputOnDepot).count, false)
                    event.player.give(output)
                    if (offHandHasDurability == true) {
                        event.player.damageHeldItem("OFF_HAND", 1)
                    }
                }
            }
        }
    }
}

onEvent("loaded", e => {
    global.recipes = {
        create: {
            manual_depot_application: depot_application
        }
    }
    global.recipes.createManualDepotApplication = global.recipes.create.manual_depot_application
})