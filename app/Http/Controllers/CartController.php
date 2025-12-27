<?php

namespace App\Http\Controllers;

use App\Models\CartItem; // <--- CRITICAL: Import your Model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // <--- CRITICAL: Import DB facade
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        // 1. Try to find an existing cart item
        $cartItem = CartItem::where('user_id', Auth::id())
                            ->where('product_id', $request->product_id)
                            ->first();

        if ($cartItem) {
            // 2. If it exists, increment the existing quantity
            $cartItem->increment('quantity', $request->quantity);
        } else {
            // 3. If it's new, create it with exactly the requested quantity
            CartItem::create([
                'user_id' => Auth::id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return back()->with('success', 'Product added to cart!');
    }

    public function update(Request $request, CartItem $cartItem) 
    {
        // Basic security check: user must own the cart item
        if ($cartItem->user_id !== Auth::id()) {
            abort(403);
        }
        
        $cartItem->update(['quantity' => $request->quantity]);
        return back();
    }

    public function destroy(CartItem $cartItem) 
    {
        if ($cartItem->user_id !== Auth::id()) {
            abort(403);
        }

        $cartItem->delete();
        return back();
    }
}