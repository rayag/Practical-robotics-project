package com.petfeeder.server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.Set;
import java.util.HashSet;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties("feedingMachines")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    private String name = "";

    @NotNull
    @Column(unique = true)
    private String email = "";

    @NotNull
    private String password = "";

    private String FBToken = "";


    private String photo = "";

    public Set<FeedingMachine> getFeedingMachines() {
        return feedingMachines;
    }

    @OneToMany(
            mappedBy = "owner",
            cascade = CascadeType.PERSIST,
            fetch = FetchType.LAZY
    )
    private Set<FeedingMachine> feedingMachines = new HashSet<>();

    public void setFeedingMachines(Set<FeedingMachine> feedingMachines) {
        this.feedingMachines = feedingMachines;
        for (FeedingMachine fm : feedingMachines) {
            fm.setOwner(this);
        }
    }

    public void addFeedingMachine(FeedingMachine feedingMachine) {
        this.feedingMachines.add(feedingMachine);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFBToken() {
        return FBToken;
    }

    public void setFBToken(String FBToken) {
        this.FBToken = FBToken;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
