<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\OrderItem; // Assuming your sales are stored here
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendDailySalesReport extends Command
{
    protected $signature = 'report:daily-sales';
    protected $description = 'Sends a summary of products sold today to the admin';

    public function handle()
    {
        $todaySales = OrderItem::with('product')
            ->whereDate('created_at', Carbon::today())
            ->get();

        $totalRevenue = $todaySales->sum(fn($item) => $item->price * $item->quantity);

        Mail::send([], [], function ($message) use ($todaySales, $totalRevenue) {
            $body = "<h1>Daily Sales Report - " . Carbon::today()->toFormattedDateString() . "</h1>";
            $body .= "<ul>";
            foreach ($todaySales as $sale) {
                $body .= "<li>{$sale->product->name}: {$sale->quantity} units</li>";
            }
            $body .= "</ul><p><strong>Total Revenue: \${$totalRevenue}</strong></p>";

            $message->to('gurpal.singh1919@gmail.com')
                ->subject('Daily Sales Report')
                ->html($body);
        });

        $this->info('Daily sales report sent successfully.');
    }
}