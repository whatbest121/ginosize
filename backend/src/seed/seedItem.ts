import { ItemModel } from "../mongo/model/item";

export async function seedItem() {
    try {
        console.log("Starting seed items process...");

        const count = await ItemModel.countDocuments();
        if (count > 0) {
            console.log(`Database already has ${count} items. Skipping seed process.`);
            return;
        }

        const totalItems = 100;

        const userIds = [
            "67f175553eb65a24233fc1f0",
            "67f175653eb65a24233fc1f2"
        ];

        const items = [];
        for (let i = 0; i < totalItems; i++) {
            items.push({
                user_id: i < totalItems / 2 ? userIds[0] : userIds[1],
                name: `test-name-${i}`,
                price: i,
                quantity: i,
                image: "https://media.istockphoto.com/id/1324356458/vector/picture-icon-photo-frame-symbol-landscape-sign-photograph-gallery-logo-web-interface-and.jpg?s=612x612&w=0&k=20&c=ZmXO4mSgNDPzDRX-F8OKCfmMqqHpqMV6jiNi00Ye7rE=",
            });

            if (items.length === 50 || i === totalItems - 1) {
                await ItemModel.insertMany(items);
                console.log(`Inserted items ${i - items.length + 1} to ${i + 1}`);
                items.length = 0; 
            }
        }

        console.log(`Seed completed: Added ${totalItems} items to database`);
    } catch (error) {
        console.error("Error during seed process:", error);
    }
}