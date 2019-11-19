<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MessagesResource;

class MessagesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['only' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = auth()->user()->messages()->latest()->get();
        return MessagesResource::collection($messages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  String  $username
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $username)
    {
        // VALIDATE
        $user = User::where('username', $username)->firstOrFail();
        $this->validate($request, [
            'message' => 'required_without:record|max:1500|string',
            'record'  => 'required_without:message|mimes:wav'
        ], [
            'message.required_without' => 'You have to write a message or record a message.',
            'record.required_without'  => 'You have to write a message or record a message.'
        ]);
        
        // STORE
        if ($request->message) {
            $message = [
                'user_id' => $user->id,
                'message' => $request->message
            ];
        } else {
            $file_name = Storage::put('public/', $request->file('record'));
            $message = [
                'user_id' => $user->id,
                'record' => $file_name
            ];
        }
        return Message::create($message);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();
    }
}
