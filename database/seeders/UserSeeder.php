<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $requester_role = Role::firstOrCreate(['name' => 'requester']);
        $user = User::create([
            'firstname' => 'Dj',
            'lastname' => 'Dela Cruz',
            'middlename' => 'D.',
            'email' => 'dj.pogi@example.com',
            'email_verified_at' => now(),
            'division' => 3,
            'password' => Hash::make('password789'),
        ]);
        $user->assignRole($requester_role);
    }
}
