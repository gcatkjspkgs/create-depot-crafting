# Create depot crafting for KubeJS

A library that allows you to add custom recipes that use the create depot.

## Example

```js
onEvent('block.right_click', event => {
    global.recipes.create.manual_depot_application(event,
        // Output
        Item.of('expandeddelight:cheese_sandwich'),
        // Inputs
        Ingredient.of('minecraft:bread'), // On depot
        Ingredient.of('expandeddelight:cheese_slice') // In hand
    )
});
```

## Showcase

![showcase](https://i.ibb.co/d2qYbp2/example.gif)
