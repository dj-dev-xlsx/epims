<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tbl_units')->insert([
            ['unit' => 'pcs'],
            ['unit' => 'box'],
            ['unit' => 'liter'],
            ['unit' => 'kg'],
        ]);
    }
}
