onEvent("loaded", e => {
    const Transaction = java('net.fabricmc.fabric.api.transfer.v1.transaction.Transaction')
    const ItemVariant = java('net.fabricmc.fabric.api.transfer.v1.item.ItemVariant')

    global.recipes = {
        create: {
            manual_depot_application: function (event, output, inputOnDepot, inputInHand) {
                if (event.block == 'create:depot' && event.block.entityData.HeldItem != undefined) {
                    let depotItem = Item.of(event.block.entityData.HeldItem.Item.id, event.block.entityData.HeldItem.Item.Count, event.block.entityData.HeldItem.Item.tag)
                    let handItem = event.player.mainHandItem
                    if (inputOnDepot.equals(depotItem) && inputInHand.equals(handItem)) {
                        event.cancel()
                        tx = Transaction.openOuter()
                        if (depotItem.count > (handItem.count / inputInHand.count)) {
                            // If the remainder of ingredients is on the depot
                            event.player.give(Item.of(output, (handItem.count / inputInHand.count), output.nbt))
                            event.block.entity.getItemStorage(Direction.UP).extract(ItemVariant.of(Item.of(inputOnDepot).itemStack), (handItem.count / inputInHand.count), tx)
                        } else {
                            // If the remainder of the ingredients is in the hand, or equal
                            event.block.entity.getItemStorage(Direction.UP).extract(ItemVariant.of(Item.of(inputOnDepot).itemStack),  depotItem.count, tx)
                            event.block.entity.getItemStorage(Direction.UP).insert(ItemVariant.of(Item.of(output).itemStack), depotItem.count, tx)
                        }
                        handItem.count -= depotItem.count * inputInHand.count
                        tx.commit()
                    }
                }
            }
        }
    }
    global.recipes.createManualDepotApplication = global.recipes.create.manual_depot_application
})