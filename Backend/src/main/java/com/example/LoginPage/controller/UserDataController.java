package com.example.LoginPage.controller;

import com.example.LoginPage.entity.UserData;
import com.example.LoginPage.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserDataController {
    @Autowired
    UserDataService userDataService;

    @PostMapping("/addnewuser")
    public ResponseEntity<UserData> addUser(@RequestBody UserData user) {
        return ResponseEntity.ok().body(this.userDataService.addUser(user));
    }

    @GetMapping("/getusersdata")
    public ResponseEntity<List<UserData>> getBooks() {
        return ResponseEntity.ok().body(this.userDataService.getUsersData());
    }
}
