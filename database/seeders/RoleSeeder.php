<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define roles
        $roles = [
            'admin' => [
                'manage all', // Full access
            ],
            'requester' => [
                'request',
            ],
            'bac_approver' => [
                'approve requests',
                
            ],
            'suply_officer' => [
                'create purchase orders',
            ],
        ];

        foreach ($roles as $roleName => $permissions) {
            // Create or get role
            $role = Role::firstOrCreate(['name' => $roleName]);

            foreach ($permissions as $permissionName) {
                // Create or get permission
                $permission = Permission::firstOrCreate(['name' => $permissionName]);

                // Assign permission to role
                if (!$role->hasPermissionTo($permission)) {
                    $role->givePermissionTo($permission);
                }
            }
        }
    }
}
