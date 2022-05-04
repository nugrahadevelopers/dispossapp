<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $suppliers = Supplier::all();

        $data = $this->getData($suppliers);

        return Inertia::render('Dashboard/Master/Supplier', [
            'suppliers' => $data
        ]);
    }

    public function getData($suppliers)
    {
        $data = array();

        foreach ($suppliers as $key => $item) {
            $row = array();
            $row['no'] = $key + 1;
            $row['id'] = $item->id;
            $row['nama'] = $item->nama;
            $row['telepon'] = $item->telepon;
            $row['alamat'] = $item->alamat;

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
            'nama' => 'required|string',
            'telepon' => 'required|integer',
            'alamat' => 'string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        try {
            Supplier::create([
                'nama' => $request->nama,
                'telepon' => $request->telepon,
                'alamat' => $request->alamat,
            ]);

            return redirect()->route('supplier');
        } catch (\Throwable $th) {
            return redirect()->back()->withInput($request->all());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Supplier $supplier)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string',
            'telepon' => 'required|integer',
            'alamat' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        try {
            $supplier->update([
                'nama' => $request->nama,
                'telepon' => $request->telepon,
                'alamat' => $request->alamat,
            ]);

            return redirect()->route("supplier");
        } catch (\Throwable $th) {
            return redirect()->back()->withInput($request->all());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $supplier)
    {
        try {
            $supplier->delete();
            return redirect()->route("supplier");
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
