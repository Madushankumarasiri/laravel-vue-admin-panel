<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;
    
    protected $table = 'Employee';
    protected $primaryKey = 'Emp_ID';
    public $incrementing = false;

    protected $fillable = [
        
    ];

}
