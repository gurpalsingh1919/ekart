<?php

namespace App\Observers;

use App\Models\Product;
use App\Jobs\SendLowStockEmail;

class ProductObserver
{
    public function updated(Product $product): void
    {
        // Only trigger if stock is 5 or less AND it actually changed in this request
        if ($product->stock <= 5 && $product->isDirty('stock')) {
            SendLowStockEmail::dispatch($product);
        }
    }
}