<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendLowStockEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public $product) {}

    public function handle(): void
    {
        Mail::send([], [], function ($message) {
            $message->to('gurpal.singh1919@gmail.com')
                ->subject('Low Stock Alert: ' . $this->product->name)
                ->html("Product <strong>{$this->product->name}</strong> has only {$this->product->stock} units left.");
        });
    }
}