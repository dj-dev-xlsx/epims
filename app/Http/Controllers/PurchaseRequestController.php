<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseRequestResource;
use App\Models\PurchaseRequest;
use App\Http\Requests\StorePurchaseRequestRequest;
use App\Http\Requests\UpdatePurchaseRequestRequest;
use App\Models\Division;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PurchaseRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $query = PurchaseRequest::with(['details.unit', 'division'])
        ->where('division_id', $user->division); 

        $purchaseRequests = $query->paginate(10)->withQueryString();


        return Inertia::render('Requester/Index', [
            'purchaseRequests' => PurchaseRequestResource::collection($purchaseRequests),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = User::with('roles')->find(Auth::id());
        $division = Division::with('requestedBy')->find($user->division);

        $requestedBy = $division?->requestedBy?->name ?? null;
        $units = Unit::all(); // Fetch all available units
        return Inertia::render('Requester/Create', [
            'units' => $units,
            'requestedBy' => $requestedBy,
            'auth' => ['user' => $user],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePurchaseRequestRequest $request)
    {
        $data = $request->validated();

        $date_processed = now()->format('Y-m-d');

        // Create the new purchase request with division_id
        $purchaseRequest = PurchaseRequest::create([
            'focal_person' => $data['focal_person'],
            'pr_number' => $data['pr_number'],
            'purpose' => $data['purpose'],
            'division_id' => $data['division'],
            'requested_by' => $data['requested_by'],
            'date_processed' => $date_processed,
        ]);

        // Create the details related to the purchase request
        $purchaseRequest->details()->create([
            'pr_id' => $purchaseRequest->id,
            'item' => $data['item_name'],
            'quantity' => $data['quantity'],
            'unit_id' => $data['unit'],
            'unit_price' => $data['unit_price'],
        ]);
        return redirect()->route('requester.create')->with('success', 'Purchase Request created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(PurchaseRequest $purchaseRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PurchaseRequest $purchaseRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePurchaseRequestRequest $request, PurchaseRequest $purchaseRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PurchaseRequest $purchaseRequest)
    {
        //
    }
}
