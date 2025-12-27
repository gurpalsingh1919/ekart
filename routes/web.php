<?php

use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Models\Product;
use App\Models\CartItem;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'products' => Product::all(), // This MUST match the prop name 'products' in React
        'cartItems' => auth()->user()?->cartItems()->with('product')->get() ?? [],
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');



    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::put('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');
});

Route::get('/test-mail', function () {
    Mail::raw('Test email from Herd', function ($message) {
        $message->to('test@example.com')
                ->subject('Test Mail');
    });
});
require __DIR__.'/settings.php';
