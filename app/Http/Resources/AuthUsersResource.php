<?php

namespace App\Http\Resources;

use App\Http\Resources\UsersResource;

class AuthUsersResource extends UsersResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return array_merge(parent::toArray($request), [
            'email' => $this->email
        ]);
    }
}
