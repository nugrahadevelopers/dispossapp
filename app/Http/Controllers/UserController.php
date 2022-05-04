<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::isNotAdmin()->get();

        $data = $this->getUsers($users);

        return Inertia::render('Dashboard/Setting/User', [
            'users' => $data
        ]);
    }

    public function getUsers($users)
    {
        $data = array();

        foreach ($users as $key => $item) {
            $row = array();
            $row['no'] = $key + 1;
            $row['id'] = $item->id;
            $row['name'] = $item->name;
            $row['email'] = $item->email;

            $data[] = $row;
        }

        return $data;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'level' => 2,
                'password' => Hash::make($request->password),
            ]);

            return redirect()->route('user');
        } catch (\Throwable $th) {
            return redirect()->back()->withInput($request->all());
        }
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        try {
            $userUpdate = User::find($user->id);
            $userUpdate->name = $request->name;
            $userUpdate->email = $request->email;
            if ($request->has('password') && $request->password != "") {
                $userUpdate->password = Hash::make($request->password);
            }
            $userUpdate->update();

            return redirect()->route("user");
        } catch (\Throwable $th) {
            return redirect()->back()->withInput($request->all());
        }
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            return redirect()->route("user");
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
