import foodItems from './foodItems';

test('shuffle changes array order',async () => {
    let array:number[] = [1,2,3,4,5];
    expect(foodItems.shuffle(array)).not.toContainEqual(array);
})