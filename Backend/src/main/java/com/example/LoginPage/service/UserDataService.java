package com.example.LoginPage.service;

import com.example.LoginPage.entity.UserData;

import java.util.List;

public interface UserDataService {
    UserData addUser(UserData userData);

    List<UserData> getUsersData();
}
