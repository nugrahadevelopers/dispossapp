<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PengeluaranController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pengeluaran = Pengeluaran::all();

        $data = $this->getData($pengeluaran);

        return Inertia::render('Dashboard/Transaction/Pengeluaran', [
            'pengeluaran' => $data
        ]);
    }

    public function getData($pengeluaran)
    {
        $data = array();

        foreach ($pengeluaran as $key => $item) {
            $row = array();
            $row['no'] = $key + 1;
            $row['id'] = $item->id;
            $row['created_at'] = tanggal_indonesia($item->created_at, false);
            $row['updated_at'] = tanggal_indonesia($item->updated_at, false);
            $row['nomor_trx_pengeluaran'] = $item->nomor_trx_pengeluaran;
            $row['deskripsi'] = $item->deskripsi;
            $row['nominal'] = $item->nominal;

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
            'deskripsi' => 'required|string',
            'nominal' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        try {
            Pengeluaran::create([
                'nomor_trx_pengeluaran' => 'DPTRX_' . date('Y.m.d') . '_' . rand(1000, 1999),
                'deskripsi' => $request->deskripsi,
                'nominal' => $request->nominal,
            ]);

            return redirect()->route('pengeluaran');
        } catch (\Throwable $th) {
            return redirect()->back()->withInput($request->all());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pengeluaran  $pengeluaran
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pengeluaran $pengeluaran)
    {
        $validator = Validator::make($request->all(), [
            'deskripsi' => 'required|string',
            'nominal' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        try {
            $pengeluaran->update([
                'deskripsi' => $request->deskripsi,
                'nominal' => $request->nominal,
            ]);

            return redirect()->route("pengeluaran");
        } catch (\Throwable $th) {
            return redirect()->back()->withInput($request->all());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pengeluaran  $pengeluaran
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pengeluaran $pengeluaran)
    {
        try {
            $pengeluaran->delete();
            return redirect()->route("pengeluaran");
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
