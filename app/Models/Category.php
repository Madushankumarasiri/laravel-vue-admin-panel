<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Category';
    protected $primaryKey = 'Category_ID';
    public $incrementing = false;

    protected $fillable = [
        'Category_ID',
        'Category_Name',
        'Description'
    ];

    // public function products()
    // {
    //     return $this->hasMany(Product::class);
    // }
    
}
