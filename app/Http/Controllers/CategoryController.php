<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();

        $data = $this->getData($categories);

        return Inertia::render('Dashboard/Master/Category', [
            'categories' => $data,
        ]);
    }

    public function getData($categories)
    {
        $data = array();

        foreach ($categories as $key => $item) {
            $row = array();
            $row['no'] = $key + 1;
            $row['id'] = $item->id;
            $row['nama'] = $item->nama;

            $data[] = $row;
        }

        return $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        DB::beginTransaction();
        try {
            Category::create([
                'nama' => $request->nama,
            ]);

            return redirect()->route('category');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->withInput($request->all());
        } finally {
            DB::commit();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        DB::beginTransaction();
        try {
            $category->update([
                'nama' => $request->nama,
            ]);

            return redirect()->route("category");
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->withInput($request->all());
        } finally {
            DB::commit();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        try {
            $category->delete();
            return redirect()->route("category");
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
