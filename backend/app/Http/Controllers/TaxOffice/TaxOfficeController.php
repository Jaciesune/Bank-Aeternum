<?php

namespace App\Http\Controllers\TaxOffice;

use App\Models\TaxOffice;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TaxOfficeController extends Controller
{
    public function index()
    {
        $taxOffices = TaxOffice::all();
        return response()->json($taxOffices);
    }
}
