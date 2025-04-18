import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Index({purchaseRequests, queryParams=null, success}) {
    const { auth } = usePage().props;
    const user = auth.user;
    return (
        <AuthenticatedLayout
                title="Create Purchase Request"
                header={
                <h2 className="text-xl font-semibold leading-tight text-gray-900">
                    Procurement Management System
                </h2>
                }>
                <Head title="View Requests" />
                <div className="max-w-full p-6 bg-white shadow-md rounded-lg mt-20 mx-5">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">View Requests</h1>
                    </div>
                    <div className="overflow-x-auto"> 
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3">
                                    <TextInput 
                                    className="w-full" placeholder="Search Project Name" 
                                    defaultValue={queryParams.name}
                                    onChange={e => searchFieldChange('name', e.target.value)}
                                    onKeyPress={e => onKeyPress('name', e)}
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <SelectInput className="w-full "
                                    defaultValue={queryParams.status}
                                    onChange={e => searchFieldChange('status', e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                </th>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead> */}
                        <thead className="text-xs text-center text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-500">
                            <tr>
                                
                                <th scope="col" className="py-3 ps-3">
                                    PR Number
                                </th>
                                <th>
                                    Item Name
                                </th>
                                <th>
                                    Division
                                </th>
                                <th>
                                    Requested By
                                </th>
                                <th>
                                    Purpose
                                </th>
                                <th>
                                    Unit
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                    Unit Price
                                </th>
                                <th>
                                    Total Price
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {purchaseRequests?.data?.map((pr) => (
                                pr.details?.map((detail, i) => (
                                    <tr key={`${pr.id}-${i}`} className="bg-white border-b text-gray-600 dark:bg-gray-800 dark:border-gray-700 text-center">
                                        <td className="px-4 py-2">{pr.pr_number}</td>
                                        <td className="px-4 py-2">{detail.item}</td>
                                        <td className="px-4 py-2">{pr.division}</td>
                                        <td className="px-4 py-2">{pr.requested_by}</td>
                                        <td className="px-4 py-2">{pr.purpose}</td>
                                        <td className="px-4 py-2">{detail.unit}</td>
                                        <td className="px-4 py-2">{detail.quantity}</td>
                                        <td className="px-4 py-2">₱{parseFloat(detail.unit_price || 0).toFixed(2)}</td>
                                        <td className="px-4 py-2">₱{(parseFloat(detail.unit_price || 0) * detail.quantity).toFixed(2)}</td>
                                        <td className="px-4 py-2">{pr.status ?? 'Pending'}</td>
                                        <td className="px-4 py-2">
                                            <Link
                                                href={`/request/view/${pr.id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                    </div>
                    
                </div>
            </AuthenticatedLayout>
    );
}