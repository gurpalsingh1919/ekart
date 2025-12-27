<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;


// Run every evening at 11:59 PM
Schedule::command('report:daily-sales')->dailyAt('23:59');