<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'date', 'time', 'location', 'type',
    ];

    public function getTimeAttribute($value)
    {
        return Carbon::parse($value)->format('H:i'); // Change the format as needed
    }
}
