package com.example.LoginPage.serviceImpl;

import com.example.LoginPage.entity.UserData;
import com.example.LoginPage.repository.UserDataRepository;
import com.example.LoginPage.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDataServiceImpl implements UserDataService {
    @Autowired
    UserDataRepository userDataRepository;

    @Override
    public UserData addUser(UserData userData) {
        return userDataRepository.save(userData);
    }

    @Override
    public List<UserData> getUsersData() {
        return userDataRepository.findAll();
    }
}
