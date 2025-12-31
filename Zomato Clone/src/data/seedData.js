import { db } from "../firebase";
import { collection, doc, writeBatch, getDocs, deleteDoc } from "firebase/firestore";
import { restaurants } from "./restaurants";

export const seedDatabase = async (force = false) => {
    try {
        const querySnapshot = await getDocs(collection(db, "restaurants"));

        // If not empty and not forcing, skip
        if (!querySnapshot.empty && !force) {
            console.log("Database already seeded");
            return;
        }

        console.log("Seeding database...");
        const batch = writeBatch(db);

        // If forcing, delete old entries first
        if (force) {
            for (const docSnap of querySnapshot.docs) {
                batch.delete(docSnap.ref);
            }
        }

        restaurants.forEach((restaurant) => {
            const restaurantRef = doc(collection(db, "restaurants"));
            batch.set(restaurantRef, {
                name: restaurant.name,
                cuisine: restaurant.cuisine,
                rating: restaurant.rating,
                deliveryTime: restaurant.deliveryTime,
                priceRange: restaurant.priceRange,
                image: restaurant.image,
                offer: restaurant.offer || null,
                menu: restaurant.menu
            });
        });

        await batch.commit();
        console.log("Database seeded successfully with premium images!");
    } catch (error) {
        console.error("Error seeding database: ", error);
    }
};
