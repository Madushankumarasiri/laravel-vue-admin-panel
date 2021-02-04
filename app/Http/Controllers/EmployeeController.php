<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::all();
    }

    public function store(Request $request)
    {

        $this->validate($request,[
            'Category_ID' => 'required',
            'Category_Name' => 'required',
            'Description' => 'required|string',
        ]);

        
        return Employee::create([
            'Category_ID' => $request['Category_ID'],
            'Category_Name' => $request['Category_Name'],
            'Description' => $request['Description']
            //'photo' => $request['photo'],
            
        ]);
    }

}
