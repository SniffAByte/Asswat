<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;

class LoginController extends Controller
{
    use ThrottlesLogins;

    /**
     * Handle a login request to the application
     * 
     * @param  Illuminate\Http\Request $request
     * @return Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if (
            method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)
        ) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($token = auth()->attempt($request->only(['email', 'password']))) {
            return $this->sendLoginResponse($request, $token);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    /**
     * Send the response after the user is authenticated
     * 
     * @param  Illuminate\Http\Request $request
     * @param  String $token
     * @return Illuminate\Http\JsonResponse
     */
    public function sendLoginResponse(Request $request, $token)
    {
        if (method_exists($this, 'clearLoginAttempts')) {
            $this->clearLoginAttempts($request);
        }
        return User::respondWithToken($token);
    }

    /**
     * Get the failed login response
     * 
     * @param  Illuminate\Http\Request $request
     * @return Illuminate\Http\JsonResponse
     */
    public function sendFailedLoginResponse(Request $request)
    {
        return response()->json([
            $this->username() => trans('auth.failed')
        ], 422);
    }

    /**
     * Send the response to determine the user they are locked out
     * 
     * @param  Illuminate\Http\Request $request
     * @return Illuminate\Http\JsonResponse
     */
    public function sendLockoutResponse(Request $request)
    {
        $seconds = $this->limiter()->availableIn(
            $this->throttleKey($request)
        );
        return response()->json([
            $this->username() => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => $seconds / 60
            ])
        ], 429);
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }
}
