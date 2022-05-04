<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PembelianController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\PenjualanController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransaksiPembelianController;
use App\Http\Controllers\TransaksiPenjualanController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route("login");
});

Route::group(['prefix' => 'dashboard', 'middleware' => ['auth']], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::group(['middleware' => 'level:1'], function () {
        // Category Route
        Route::get('/categories', [CategoryController::class, 'index'])->name('category');
        Route::post('/categories', [CategoryController::class, 'store'])->name('category.store');
        Route::put('/category/{category}', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('/category/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');

        // Product Route
        Route::get('/products', [ProductController::class, 'index'])->name('product');
        Route::post('/products', [ProductController::class, 'store'])->name('product.store');
        Route::put('/product/{product}', [ProductController::class, 'update'])->name('product.update');
        Route::delete('/product/{product}', [ProductController::class, 'destroy'])->name('product.destroy');

        // Supplier Route
        Route::get('/suppliers', [SupplierController::class, 'index'])->name('supplier');
        Route::post('/suppliers', [SupplierController::class, 'store'])->name('supplier.store');
        Route::put('/supplier/{supplier}', [SupplierController::class, 'update'])->name('supplier.update');
        Route::delete('/supplier/{supplier}', [SupplierController::class, 'destroy'])->name('supplier.destroy');

        // Pembelian Route
        Route::get('/pembelian', [PembelianController::class, 'index'])->name('pembelian');
        Route::get('/pembelian/{supplier}/create', [PembelianController::class, 'create'])->name('pembelian.create');
        Route::post('/pembelian', [PembelianController::class, 'store'])->name('pembelian.store');
        Route::put('/pembelian/{pembelian}', [PembelianController::class, 'update'])->name('pembelian.update');
        Route::delete('/pembelian/{pembelian}', [PembelianController::class, 'destroy'])->name('pembelian.destroy');

        // Transaksi Pembelian Route
        Route::get('/transaksi_pembelian', [TransaksiPembelianController::class, 'index'])->name('transaksi_pembelian');
        Route::post('/transaksi_pembelian', [TransaksiPembelianController::class, 'store'])->name('transaksi_pembelian.store');
        Route::put('/transaksi_pembelian', [TransaksiPembelianController::class, 'update'])->name('transaksi_pembelian.update');
        Route::delete('/transaksi_pembelian/{transaksi_pembelian}', [TransaksiPembelianController::class, 'destroy'])->name('transaksi_pembelian.destroy');

        // Pengeluaran Route
        Route::get('/pengeluaran', [PengeluaranController::class, 'index'])->name('pengeluaran');
        Route::post('/pengeluaran', [PengeluaranController::class, 'store'])->name('pengeluaran.store');
        Route::put('/pengeluaran/{pengeluaran}', [PengeluaranController::class, 'update'])->name('pengeluaran.update');
        Route::delete('/pengeluaran/{pengeluaran}', [PengeluaranController::class, 'destroy'])->name('pengeluaran.destroy');

        // Report Route
        Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan');
        Route::get('/laporan/data/{awal}/{akhir}', [LaporanController::class, 'getData'])->name('laporan.getdata');

        // User Route
        Route::get('/user', [UserController::class, 'index'])->name('user');
        Route::post('/user', [UserController::class, 'store'])->name('user.store');
        Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
        Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.destroy');

        // Setting Route
        Route::get('/setting', [SettingController::class, 'index'])->name('setting');
        Route::post('/setting', [SettingController::class, 'update'])->name('setting.update');
    });

    Route::group(['middleware' => 'level:1,2'], function () {
        // Penjualan Route
        Route::get('/penjualan', [PenjualanController::class, 'index'])->name('penjualan');
        Route::get('/penjualan/create', [PenjualanController::class, 'create'])->name('penjualan.create');
        Route::post('/penjualan', [PenjualanController::class, 'store'])->name('penjualan.store');
        Route::get('/penjualan/selesai', [PenjualanController::class, 'selesai'])->name('penjualan.selesai');
        Route::get('/penjualan/nota_kecil', [PenjualanController::class, 'notaKecil'])->name('penjualan.notakecil');
        Route::put('/penjualan/{penjualan}', [PenjualanController::class, 'update'])->name('penjualan.update');
        Route::delete('/penjualan/{penjualan}', [PenjualanController::class, 'destroy'])->name('penjualan.destroy');

        // Transaksi Penjualan Baru Route
        Route::get('/transaksi_penjualan', [TransaksiPenjualanController::class, 'index'])->name('transaksi_penjualan');
        Route::post('/transaksi_penjualan', [TransaksiPenjualanController::class, 'store'])->name('transaksi_penjualan.store');
        Route::put('/transaksi_penjualan', [TransaksiPenjualanController::class, 'update'])->name('transaksi_penjualan.update');
        Route::delete('/transaksi_penjualan/{transaksi_penjualan}', [TransaksiPenjualanController::class, 'destroy'])->name('transaksi_penjualan.destroy');
    });
});



require __DIR__ . '/auth.php';
