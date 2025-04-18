<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseRequestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'dashboard');
Route::middleware(['auth', 'role:requester'])->prefix('requester')->group(function () {
    Route::get('/create', [PurchaseRequestController::class, 'create'])->name('requester.create');
    Route::post('/store', [PurchaseRequestController::class, 'store'])->name('requester.store');
    Route::get('/index', [PurchaseRequestController::class, 'index'])->name('requester.index');
});

Route::middleware(['auth', 'role:bac_approver'])->prefix('bac_approver')->group(function () {
    Route::get('/show_requests', [PurchaseRequestController::class, 'show_requests'])->name('bac_approver.show_requests');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
