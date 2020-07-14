package com.petfeeder.server.dao;

import com.petfeeder.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findById(long id);
}
