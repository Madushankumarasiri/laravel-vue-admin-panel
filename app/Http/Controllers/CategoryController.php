<?php

namespace App\Http\Controllers;


use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
        
    }


    public function store(Request $request)
    {

        $this->validate($request,[
            'Category_ID' => 'required',
            'Category_Name' => 'required',
            'Description' => 'required|string',
        ]);

        
        return Category::create([
            'Category_ID' => $request['Category_ID'],
            'Category_Name' => $request['Category_Name'],
            'Description' => $request['Description']
            //'photo' => $request['photo'],
            
        ]);
    }

    public function show($Category_ID)
    {
        //
    }


    public function update(Request $request, $Category_ID)
    {
        $category = Category::findOrFail($Category_ID);
        $this->validate($request,[
            'Category_ID' => 'required',
            'Category_Name' => 'required',
            'Description' => 'required|string',
        ]);
        $category->update($request->all());
    }

    public function destroy($Category_ID)
    {
        $category = Category::findOrFail($Category_ID);

        $category->delete();
        
    }

}
