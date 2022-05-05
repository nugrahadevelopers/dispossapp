<?php

namespace App\Http\Controllers;

use App\Models\Pembelian;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\TransaksiPembelian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembelianController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pembelian = Pembelian::with('supplier')->get();
        $suppliers = Supplier::all();

        $pembelianSession = session('pembelian_id');
        $dataPembelian = $this->getDataPembelian($pembelian);
        $dataSupplier = $this->getDataSupplier($suppliers);

        return Inertia::render('Dashboard/Transaction/Pembelian', [
            'pembelian' => $dataPembelian,
            'suppliers' => $dataSupplier,
            'pembelianSession' => $pembelianSession
        ]);
    }

    public function getDataPembelian($pembelian)
    {
        $data = array();

        foreach ($pembelian as $key => $item) {
            $row = array();
            $row['no'] = $key + 1;
            $row['id'] = $item->id;
            $row['nomor_trx_pembelian'] = $item->nomor_trx_pembelian;
            $row['created_at'] = tanggal_indonesia($item->created_at, false);
            $row['supplier_id'] = $item->supplier->nama;
            $row['total_item'] = $item->total_item;
            $row['total_harga'] = $item->total_harga;
            $row['diskon'] = $item->diskon;
            $row['bayar'] = $item->bayar;
            $data[] = $row;
        }

        return $data;
    }

    public function getDataSupplier($suppliers)
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Supplier $supplier)
    {
        $pembelian = new Pembelian();
        $pembelian->nomor_trx_pembelian = 'DBTRX_' . date('Y.m.d') . '_' . rand(1000, 1999);
        $pembelian->supplier_id = $supplier->id;
        $pembelian->total_item = 0;
        $pembelian->total_harga = 0;
        $pembelian->diskon = 0;
        $pembelian->bayar = 0;
        $pembelian->save();

        session(['pembelian_id' => $pembelian->id]);
        session(['supplier_id' => $pembelian->supplier->id]);

        return redirect()->route('transaksi_pembelian');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pembelian = Pembelian::findOrFail($request->pembelian_id);
        $pembelian->total_item = $request->total_item;
        $pembelian->total_harga = $request->total;
        $pembelian->diskon = $request->diskon;
        $pembelian->bayar = $request->bayar;
        $pembelian->update();

        $detail = TransaksiPembelian::where('pembelian_id', $pembelian->id)->get();
        foreach ($detail as $item) {
            $produk = Product::find($item->product_id);
            $produk->stock += $item->jumlah;
            $produk->update();
        }

        return redirect()->route('pembelian');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pembelian  $pembelian
     * @return \Illuminate\Http\Response
     */
    public function show(Pembelian $pembelian)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pembelian  $pembelian
     * @return \Illuminate\Http\Response
     */
    public function edit(Pembelian $pembelian)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pembelian  $pembelian
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pembelian $pembelian)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pembelian  $pembelian
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pembelian $pembelian)
    {
        try {
            $pembelian->delete();
            return redirect()->route("pembelian");
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
