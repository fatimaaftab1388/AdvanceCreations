export interface Product {
    id: string;
    name: string;
    type: string; // Formerly category
    manufacturer: string;
    model: string;
    modelYear: string;
    condition: string;
    description: string;
    image?: string; // Optional for backward compatibility
    imageURL?: string; // Primary field from Firebase
    soldOut?: boolean;
    badge?: string;
    badgeColor?: string;
}

import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const PRODUCTS_COLLECTION = 'products';

// Get all products
export async function getAllProducts(): Promise<Product[]> {
    try {
        const productsRef = collection(db, PRODUCTS_COLLECTION);
        const snapshot = await getDocs(productsRef);

        const products: Product[] = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            products.push({
                id: doc.id,
                ...data,
                // Ensure image field is populated from either source
                image: data.imageURL || data.image || "",
                // Handle different naming conventions from Firebase
                modelYear: data.modelYear || data['model year'] || data.year || ""
            } as Product);
        });

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        // Return sample products as fallback
        return getSampleProducts();
    }
}

// Get single product by ID
export async function getProductById(id: string): Promise<Product | null> {
    try {
        const productRef = doc(db, PRODUCTS_COLLECTION, id);
        const snapshot = await getDoc(productRef);

        if (snapshot.exists()) {
            const data = snapshot.data();
            return {
                id: snapshot.id,
                ...data,
                image: data.imageURL || data.image || "",
                modelYear: data.modelYear || data['model year'] || data.year || ""
            } as Product;
        }

        return null;
    } catch (error) {
        console.error('Error fetching product:', error);
        // Return sample product as fallback
        const samples = getSampleProducts();
        return samples.find(p => p.id === id) || null;
    }
}

// Add a new product
export async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
    try {
        const productsRef = collection(db, PRODUCTS_COLLECTION);
        const docRef = await addDoc(productsRef, product);
        return docRef.id;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

// Update existing product
export async function updateProduct(id: string, product: Partial<Product>): Promise<void> {
    try {
        const productRef = doc(db, PRODUCTS_COLLECTION, id);
        await updateDoc(productRef, product);
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

// Delete product
export async function deleteProduct(id: string): Promise<void> {
    try {
        const productRef = doc(db, PRODUCTS_COLLECTION, id);
        await deleteDoc(productRef);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// Sample products for fallback/demo
function getSampleProducts(): Product[] {
    return [
        {
            id: "1",
            name: "Superclave Tabletop Sterilizer",
            type: "Inspection Equipment",
            manufacturer: "Hillson Deck Co., Ltd.",
            model: "HF220",
            modelYear: "2022",
            condition: "Excellent",
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400",
            badge: "[New model!!!]",
            badgeColor: "text-red-600",
            description: "High-quality tabletop sterilizer suitable for various medical procedures. Compact and efficient."
        },
        {
            id: "2",
            name: "Nihon Kohden ECG Monitor",
            type: "Patient Monitor",
            manufacturer: "Nihon Kohden Corporation",
            model: "ECG-2250",
            modelYear: "2023",
            condition: "Like New",
            image: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=400",
            badge: "[High-end model!!!]",
            badgeColor: "text-red-600",
            description: "Advanced ECG machine with built-in analysis functions for accurate heart monitoring."
        },
        {
            id: "3",
            name: "Hitachi Ultrasound System",
            type: "Ultrasound",
            manufacturer: "Hitachi, Ltd.",
            model: "ARIETTA 60",
            modelYear: "2022",
            condition: "Good",
            image: "https://images.unsplash.com/photo-1581093458791-9f3c3900ca4b?auto=format&fit=crop&q=80&w=400",
            badge: "[Sold out!!!]",
            badgeColor: "text-red-600",
            soldOut: true,
            description: "Top-tier ultrasound diagnostic equipment. Currently out of stock."
        },
    ];
}
