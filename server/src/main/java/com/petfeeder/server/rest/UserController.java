package com.petfeeder.server.rest;

import com.petfeeder.server.dao.FeedingMachinesRepository;
import com.petfeeder.server.dao.UsersRepository;
import com.petfeeder.server.json.AuthenticationStatusJSON;
import com.petfeeder.server.model.FeedingMachine;
import com.petfeeder.server.model.User;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Set;

@Component
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {
    @Autowired
    private UsersRepository repository;

    @Autowired
    private FeedingMachinesRepository fmRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @GetMapping("/users")
    List<User> all() {
        System.out.println("users");
        return repository.findAll();
    }

    @GetMapping("user/feedingmachines/{id}")
    public Set<FeedingMachine> getMachines(@PathVariable long id) {
        User user = repository.findById(id);
        if (user != null) {
            return user.getFeedingMachines();
        }
        return null;
    }

    @PostMapping("/user/authenticate")
    public User findByEmail(@RequestBody User user) {
        User realUser = repository.findByEmail(user.getEmail());
        if (realUser != null && encoder.matches(user.getPassword(), realUser.getPassword())) {
            realUser.setFBToken(user.getFBToken());
            this.repository.save(realUser);
            return realUser;
        } else {
            return null;
        }
    }

    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        User createdUser = repository.save(user);
        return createdUser;
    }

    @PostMapping("/user/update")
    public User updateUser(@RequestBody User newUser) {
        User user = this.repository.findById(newUser.getId());
        user.setName(newUser.getName());
        this.repository.save(newUser);
        return newUser;
    }

    @PostMapping("/user/add_feeding_machine/{id}")
    public FeedingMachine addFeedingMachine(@PathVariable String id, @RequestBody FeedingMachine fm) {
        User user = this.repository.findById(Integer.parseInt(id));
        if (user != null) {
            fm.setOwner(user);
        }
        fmRepository.save(fm);
        return fm;
    }
}
