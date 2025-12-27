<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Category: Electronics
            ['name' => 'Premium Wireless Headphones', 'price' => 299.99, 'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
            ['name' => 'Ultra-Slim Laptop M3', 'price' => 1299.00, 'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'],
            ['name' => 'Smart Watch Pro', 'price' => 349.50, 'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
            ['name' => 'Mechanical Gaming Keyboard', 'price' => 120.00, 'image' => 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800'],
            ['name' => 'Portable Bluetooth Speaker', 'price' => 89.99, 'image' => 'https://images.unsplash.com/photo-1608156639585-340c493ad2c7?w=800'],
            ['name' => '4K Action Camera', 'price' => 199.00, 'image' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'],
            
            // Category: Apparel & Lifestyle
            ['name' => 'Minimalist Leather Wallet', 'price' => 45.00, 'image' => 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800'],
            ['name' => 'Classic White Sneakers', 'price' => 75.00, 'image' => 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800'],
            ['name' => 'Polarized Sunglasses', 'price' => 110.00, 'image' => 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800'],
            ['name' => 'Cotton Canvas Backpack', 'price' => 65.00, 'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
            
            // Category: Home & Office
            ['name' => 'Ergonomic Office Chair', 'price' => 450.00, 'image' => 'https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?w=800'],
            ['name' => 'Ceramic Coffee Dripper', 'price' => 35.00, 'image' => 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800'],
            ['name' => 'Scented Soy Candle', 'price' => 22.50, 'image' => 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800'],
            ['name' => 'Indoor Monstera Plant', 'price' => 48.00, 'image' => 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800'],
        ];

        // Loop to generate 50 items (it will repeat names but vary the prices slightly)
        for ($i = 1; $i <= 50; $i++) {
            $baseProduct = $products[array_rand($products)];
            Product::create([
                'name' => $baseProduct['name'] . ' (Edition ' . $i . ')',
                'price' => $baseProduct['price'] + rand(-10, 50),
                'description' => 'This is a high-quality product perfect for everyday use.',
                'image_url' => $baseProduct['image'], // Ensure your migration has this column!
                'stock_quantity' => rand(5, 100),
            ]);
        }
    }
}