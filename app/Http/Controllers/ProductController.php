<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        $products = Product::with('category')->get();

        $data = $this->getData($products);

        return Inertia::render('Dashboard/Master/Product', [
            'categories' => $categories,
            'products' => $data
        ]);
    }

    public function getData($products)
    {
        $data = array();

        foreach ($products as $key => $item) {
            $row = array();
            $row['no'] = $key + 1;
            $row['id'] = $item->id;
            $row['barcode'] = $item->barcode;
            $row['nama'] = $item->nama;
            $row['merk'] = $item->merk;
            $row['harga_beli'] = $item->harga_beli;
            $row['harga_jual'] = $item->harga_jual;
            $row['diskon'] = $item->diskon;
            $row['stock'] = $item->stock;
            $row['satuan'] = $item->satuan;
            $row['category_id'] = $item->category_id;
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
            'barcode' => 'integer',
            'nama' => 'required|string',
            'category_id' => 'integer',
            'merk' => 'string',
            'harga_beli' => 'required|integer',
            'harga_jual' => 'required|integer',
            'diskon' => 'integer',
            'stock' => 'integer',
            'satuan' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        try {
            Product::create([
                'barcode' => $request->barcode,
                'nama' => $request->nama,
                'category_id' => $request->category_id,
                'merk' => $request->merk,
                'harga_beli' => $request->harga_beli,
                'harga_jual' => $request->harga_jual,
                'diskon' => $request->diskon,
                'stock' => $request->stock,
                'satuan' => $request->satuan,
            ]);

            return redirect()->route('product');
        } catch (\Throwable $th) {
            return redirect()->back()->withInput($request->all());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'barcode' => 'integer',
            'nama' => 'required|string',
            'category_id' => 'integer',
            'merk' => 'string',
            'harga_beli' => 'required|integer',
            'harga_jual' => 'required|integer',
            'diskon' => 'integer',
            'stock' => 'integer',
            'satuan' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        try {
            $product->update([
                'barcode' => $request->barcode,
                'nama' => $request->nama,
                'category_id' => $request->category_id,
                'merk' => $request->merk,
                'harga_beli' => $request->harga_beli,
                'harga_jual' => $request->harga_jual,
                'diskon' => $request->diskon,
                'stock' => $request->stock,
                'satuan' => $request->satuan,
            ]);

            return redirect()->route("product");
        } catch (\Throwable $th) {
            return redirect()->back()->withInput($request->all());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        try {
            $product->delete();
            return redirect()->route("product");
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
