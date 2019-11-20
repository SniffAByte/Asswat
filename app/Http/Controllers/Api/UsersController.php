<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UsersResource;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['only' => ['update', 'destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $username
     * @return \Illuminate\Http\Response
     */
    public function show($username)
    {
        $user = User::where('username', $username)->firstOrFail();
        return new UsersResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = auth()->user();

        // VALIDATE PASSWORD
        $this->validate($request, [
            'password' => 'required'
        ]);

        // CHECK PASSWORD
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => [
                    'password' => ['This password is incorrect']
                ]
            ], 422);
        }

        // VALIDATE NAME
        if (!empty($request->name) && $request->name !== $user->name) {
            $this->validate($request, [
                'name' => 'required|string|max:255',
            ]);
            // UPDATE NAME
            $user->name = $request->name;
        }

        // VALIDATE USERNAME
        if (!empty($request->username) && $request->username !== $user->username) {
            $this->validate($request, [
                'username' => 'required|alpha_dash|unique:users',
            ]);
            // UPDATE USERNAME
            $user->username = $request->username;
        }

        // VALIDATE EMAIL
        if (!empty($request->email) && $request->email !== $user->email) {
            $this->validate($request, [
                'email' => 'required|email|unique:users',
            ]);
            // UPDATE EMAIL
            $user->email = $request->email;
        }

        // VALIDATE PICTURE
        if ($request->hasFile('picture')) {
            $this->validate($request, [
                'picture' => 'mimes:jpeg,jpg,png|required|max:10000'
            ]);
            $file_name = Storage::put('public/pp/', $request->file('picture'));
            // UPDATE PICTURE
            $user->pic = $file_name;
        }

        if ($user->save()) {
            return response()->json(['done'=>'success']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $user = auth()->user();
        $user->delete();
    }
}
