<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert([
            'nama_perusahaan' => 'Toko Barokah',
            'alamat' => 'Jl. Dimana Saya Tidak Tahu No.77',
            'telepon' => '081234779987',
        ]);
    }
}
